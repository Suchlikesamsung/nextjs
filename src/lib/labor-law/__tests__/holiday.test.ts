import { describe, expect, it } from "vitest";

import { getShiftHolidayHours, type HolidayOptions } from "../hours";
import type { AttendanceShift, WeekDay } from "../types";

function shift(clockIn: string, clockOut: string, breakMinutes = 0): AttendanceShift {
  return {
    clockIn: new Date(clockIn),
    clockOut: new Date(clockOut),
    breakMinutes,
  };
}

function opts(
  publicHolidays: string[],
  weeklyOffDays: WeekDay[] = ["SUN"],
): HolidayOptions {
  return {
    publicHolidays: publicHolidays.map((d) => new Date(d)),
    weeklyOffDays,
  };
}

describe("getShiftHolidayHours", () => {
  it("평일이고 공휴일 아님 → 0", () => {
    // 2026-04-23 목요일
    expect(
      getShiftHolidayHours(
        shift("2026-04-23T09:00:00+09:00", "2026-04-23T18:00:00+09:00"),
        opts([]),
      ),
    ).toBe(0);
  });

  it("공휴일 종일 근무 → 출퇴근 차이만큼", () => {
    // 2026-05-05 어린이날 (화요일)
    expect(
      getShiftHolidayHours(
        shift("2026-05-05T09:00:00+09:00", "2026-05-05T18:00:00+09:00"),
        opts(["2026-05-05T00:00:00+09:00"]),
      ),
    ).toBe(9);
  });

  it("주휴일(SUN) 근무, weeklyOffDays=['SUN'] → 휴일 근로", () => {
    // 2026-04-26 일요일
    expect(
      getShiftHolidayHours(
        shift("2026-04-26T10:00:00+09:00", "2026-04-26T16:00:00+09:00"),
        opts([], ["SUN"]),
      ),
    ).toBe(6);
  });

  it("일요일이지만 weeklyOffDays=['SAT']로 설정 → 휴일 아님", () => {
    expect(
      getShiftHolidayHours(
        shift("2026-04-26T10:00:00+09:00", "2026-04-26T16:00:00+09:00"),
        opts([], ["SAT"]),
      ),
    ).toBe(0);
  });

  it("일요일 22시 → 월요일 06시: 일요일 부분만 (2시간)", () => {
    expect(
      getShiftHolidayHours(
        shift("2026-04-26T22:00:00+09:00", "2026-04-27T06:00:00+09:00"),
        opts([], ["SUN"]),
      ),
    ).toBe(2);
  });

  it("토요일 22시 → 일요일 06시, weeklyOffDays=['SUN']: 일요일 부분만 (6시간)", () => {
    expect(
      getShiftHolidayHours(
        shift("2026-04-25T22:00:00+09:00", "2026-04-26T06:00:00+09:00"),
        opts([], ["SUN"]),
      ),
    ).toBe(6);
  });

  it("공휴일과 주휴일이 같은 날 → 중복 카운트 없음", () => {
    // 2026-04-26 일요일을 공휴일로도 등록
    expect(
      getShiftHolidayHours(
        shift("2026-04-26T09:00:00+09:00", "2026-04-26T18:00:00+09:00"),
        opts(["2026-04-26T00:00:00+09:00"], ["SUN"]),
      ),
    ).toBe(9);
  });

  it("휴게시간은 휴일시간 합산에 영향 없음 (gross overlap)", () => {
    expect(
      getShiftHolidayHours(
        shift("2026-04-26T09:00:00+09:00", "2026-04-26T18:00:00+09:00", 60),
        opts([], ["SUN"]),
      ),
    ).toBe(9);
  });

  it("주말 연속 (토~일) 36시간, weeklyOffDays=['SAT','SUN']: 둘 다 휴일 → 36h", () => {
    expect(
      getShiftHolidayHours(
        shift("2026-04-25T00:00:00+09:00", "2026-04-26T12:00:00+09:00"),
        opts([], ["SAT", "SUN"]),
      ),
    ).toBe(36);
  });

  it("clockOut <= clockIn 방어적 0", () => {
    expect(
      getShiftHolidayHours(
        shift("2026-04-26T18:00:00+09:00", "2026-04-26T09:00:00+09:00"),
        opts([], ["SUN"]),
      ),
    ).toBe(0);
  });
});
