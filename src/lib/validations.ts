import { z } from "zod";

export const createWorkerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  hourlyWage: z.coerce.number().int().min(0),
  position: z.string().min(1),
  phone: z.string().optional(),
});

export const createScheduleSchema = z
  .object({
    userId: z.string().min(1),
    workDate: z.coerce.date(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    note: z.string().optional(),
  })
  .refine((data) => data.endTime.getTime() > data.startTime.getTime(), {
    message: "endTime must be after startTime",
    path: ["endTime"],
  });

export const createAttendanceSchema = z
  .object({
    userId: z.string().min(1),
    workDate: z.coerce.date(),
    clockIn: z.coerce.date(),
    clockOut: z.coerce.date().optional(),
    memo: z.string().optional(),
  })
  .refine(
    (data) => data.clockOut === undefined || data.clockOut.getTime() > data.clockIn.getTime(),
    { message: "clockOut must be after clockIn", path: ["clockOut"] },
  );
