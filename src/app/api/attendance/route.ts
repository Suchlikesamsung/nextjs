import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { toErrorResponse } from "@/lib/api-errors";
import { createAttendanceSchema } from "@/lib/validations";

export async function GET() {
  try {
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
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = createAttendanceSchema.parse(await request.json());

    const attendance = await prisma.attendance.create({
      data: body,
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
