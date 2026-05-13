import { NIGHT_WORK_END_HOUR, NIGHT_WORK_START_HOUR } from "./constants";
import type { AttendanceShift, WeekDay } from "./types";

const MS_PER_HOUR = 1000 * 60 * 60;

const WEEKDAY_INDEX: Record<WeekDay, number> = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
};

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function isHolidayDate(
  date: Date,
  publicHolidays: Date[],
  weeklyOffDays: WeekDay[],
): boolean {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const matchesPublic = publicHolidays.some(
    (h) => h.getFullYear() === y && h.getMonth() === m && h.getDate() === d,
  );
  if (matchesPublic) return true;

  const offDayIndices = new Set(weeklyOffDays.map((w) => WEEKDAY_INDEX[w]));
  return offDayIndices.has(date.getDay());
}

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

export interface HolidayOptions {
  publicHolidays: Date[];
  weeklyOffDays: WeekDay[];
}

export function getShiftHolidayHours(
  shift: AttendanceShift,
  opts: HolidayOptions,
): number {
  const shiftStart = shift.clockIn.getTime();
  const shiftEnd = shift.clockOut.getTime();
  if (shiftEnd <= shiftStart) {
    return 0;
  }

  const cursor = startOfDay(shift.clockIn);
  const lastDay = startOfDay(shift.clockOut);

  let totalHolidayMs = 0;
  while (cursor.getTime() <= lastDay.getTime()) {
    if (isHolidayDate(cursor, opts.publicHolidays, opts.weeklyOffDays)) {
      const dayStart = cursor.getTime();
      const nextDay = new Date(cursor);
      nextDay.setDate(nextDay.getDate() + 1);
      const dayEnd = nextDay.getTime();

      const overlapStart = Math.max(shiftStart, dayStart);
      const overlapEnd = Math.min(shiftEnd, dayEnd);
      if (overlapEnd > overlapStart) {
        totalHolidayMs += overlapEnd - overlapStart;
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return totalHolidayMs / MS_PER_HOUR;
}
