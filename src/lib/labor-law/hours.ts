import { NIGHT_WORK_END_HOUR, NIGHT_WORK_START_HOUR } from "./constants";
import type { AttendanceShift } from "./types";

const MS_PER_HOUR = 1000 * 60 * 60;

export function getShiftWorkedHours(shift: AttendanceShift): number {
  const elapsedMs = shift.clockOut.getTime() - shift.clockIn.getTime();
  if (elapsedMs <= 0) {
    return 0;
  }

  const elapsedHours = elapsedMs / MS_PER_HOUR;
  const breakHours = shift.breakMinutes / 60;
  return Math.max(elapsedHours - breakHours, 0);
}

export function getShiftNightHours(shift: AttendanceShift): number {
  const shiftStart = shift.clockIn.getTime();
  const shiftEnd = shift.clockOut.getTime();
  if (shiftEnd <= shiftStart) {
    return 0;
  }

  const startOfDay = (date: Date) => {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
  };

  const cursor = startOfDay(shift.clockIn);
  cursor.setDate(cursor.getDate() - 1);
  const lastDay = startOfDay(shift.clockOut);

  let totalNightMs = 0;
  while (cursor.getTime() <= lastDay.getTime()) {
    const windowStart = new Date(cursor);
    windowStart.setHours(NIGHT_WORK_START_HOUR, 0, 0, 0);

    const windowEnd = new Date(cursor);
    windowEnd.setDate(windowEnd.getDate() + 1);
    windowEnd.setHours(NIGHT_WORK_END_HOUR, 0, 0, 0);

    const overlapStart = Math.max(shiftStart, windowStart.getTime());
    const overlapEnd = Math.min(shiftEnd, windowEnd.getTime());
    if (overlapEnd > overlapStart) {
      totalNightMs += overlapEnd - overlapStart;
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return totalNightMs / MS_PER_HOUR;
}
