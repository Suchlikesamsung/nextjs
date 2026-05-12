import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { toErrorResponse } from "@/lib/api-errors";
import { getEstimatedPay, getWorkedHours } from "@/lib/payroll";
import { createWorkerSchema } from "@/lib/validations";

export async function GET() {
  try {
    const workers = await prisma.user.findMany({
      where: { role: "WORKER" },
      include: {
        attendances: {
          select: { clockIn: true, clockOut: true },
        },
      },
      orderBy: { joinedAt: "desc" },
    });

    return NextResponse.json(
      workers.map(({ attendances, ...worker }) => ({
        ...worker,
        totalWorkHours: getWorkedHours(attendances),
        estimatedPay: getEstimatedPay(attendances, worker.hourlyWage),
      })),
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = createWorkerSchema.parse(await request.json());

    const worker = await prisma.user.create({
      data: {
        ...body,
        role: "WORKER",
      },
    });

    return NextResponse.json(worker, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
