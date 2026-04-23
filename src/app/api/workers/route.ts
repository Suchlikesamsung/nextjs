import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getEstimatedPay, getWorkedHours } from "@/lib/payroll";
import { createWorkerSchema } from "@/lib/validations";

export async function GET() {
  const workers = await prisma.user.findMany({
    where: { role: "WORKER" },
    include: {
      attendances: true,
      schedules: true,
    },
    orderBy: { joinedAt: "desc" },
  });

  return NextResponse.json(
    workers.map((worker) => ({
      ...worker,
      totalWorkHours: getWorkedHours(worker.attendances),
      estimatedPay: getEstimatedPay(worker.attendances, worker.hourlyWage),
    })),
  );
}

export async function POST(request: Request) {
  const body = createWorkerSchema.parse(await request.json());

  const worker = await prisma.user.create({
    data: {
      ...body,
      role: "WORKER",
    },
  });

  return NextResponse.json(worker, { status: 201 });
}
