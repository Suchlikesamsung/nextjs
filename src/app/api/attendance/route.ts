import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createAttendanceSchema } from "@/lib/validations";

export async function GET() {
  const attendances = await prisma.attendance.findMany({
    include: {
      worker: {
        select: {
          id: true,
          name: true,
          hourlyWage: true,
          position: true,
        },
      },
    },
    orderBy: [{ workDate: "desc" }, { clockIn: "desc" }],
  });

  return NextResponse.json(attendances);
}

export async function POST(request: Request) {
  const body = createAttendanceSchema.parse(await request.json());

  const attendance = await prisma.attendance.create({
    data: body,
  });

  return NextResponse.json(attendance, { status: 201 });
}
