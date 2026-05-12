import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { toErrorResponse } from "@/lib/api-errors";
import { createScheduleSchema } from "@/lib/validations";

export async function GET() {
  try {
    const schedules = await prisma.workSchedule.findMany({
      include: {
        worker: {
          select: {
            id: true,
            name: true,
            position: true,
          },
        },
      },
      orderBy: [{ workDate: "asc" }, { startTime: "asc" }],
    });

    return NextResponse.json(schedules);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = createScheduleSchema.parse(await request.json());

    const schedule = await prisma.workSchedule.create({
      data: body,
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
