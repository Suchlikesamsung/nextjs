import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createScheduleSchema } from "@/lib/validations";

export async function GET() {
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
}

export async function POST(request: Request) {
  const body = createScheduleSchema.parse(await request.json());

  const schedule = await prisma.workSchedule.create({
    data: body,
  });

  return NextResponse.json(schedule, { status: 201 });
}
