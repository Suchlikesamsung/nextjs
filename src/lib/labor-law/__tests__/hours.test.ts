import { describe, expect, it } from "vitest";

import { getShiftNightHours, getShiftWorkedHours } from "../hours";
import type { AttendanceShift } from "../types";

function shift(clockIn: string, clockOut: string, breakMinutes = 0): AttendanceShift {
  return {
    clockIn: new Date(clockIn),
    clockOut: new Date(clockOut),
    breakMinutes,
  };
}

describe("getShiftWorkedHours", () => {
  it("휴게시간이 없으면 출퇴근 차이를 그대로 반환", () => {
    expect(
      getShiftWorkedHours(shift("2026-04-23T09:00:00+09:00", "2026-04-23T18:00:00+09:00")),
    ).toBe(9);
  });

  it("휴게시간만큼 차감한다", () => {
    expect(
      getShiftWorkedHours(shift("2026-04-23T09:00:00+09:00", "2026-04-23T18:00:00+09:00", 60)),
    ).toBe(8);
  });

  it("clockOut이 clockIn보다 빠르면 0 (방어적)", () => {
    expect(
      getShiftWorkedHours(shift("2026-04-23T18:00:00+09:00", "2026-04-23T09:00:00+09:00")),
    ).toBe(0);
  });

  it("자정을 넘기는 근무도 정확히 계산한다", () => {
    expect(
      getShiftWorkedHours(shift("2026-04-23T22:00:00+09:00", "2026-04-24T06:00:00+09:00")),
    ).toBe(8);
  });

  it("휴게시간이 근무시간보다 길면 0 (음수 방지)", () => {
    expect(
      getShiftWorkedHours(shift("2026-04-23T09:00:00+09:00", "2026-04-23T10:00:00+09:00", 120)),
    ).toBe(0);
  });
});

describe("getShiftNightHours", () => {
  it("야간대(22~06) 밖이면 0", () => {
    expect(
      getShiftNightHours(shift("2026-04-23T09:00:00+09:00", "2026-04-23T18:00:00+09:00")),
    ).toBe(0);
  });

  it("야간 시작 경계: 21시~23시 → 1시간", () => {
    expect(
      getShiftNightHours(shift("2026-04-23T21:00:00+09:00", "2026-04-23T23:00:00+09:00")),
    ).toBe(1);
  });

  it("야간 종료 경계: 05시~07시 → 1시간", () => {
    expect(
      getShiftNightHours(shift("2026-04-23T05:00:00+09:00", "2026-04-23T07:00:00+09:00")),
    ).toBe(1);
  });

  it("자정 넘는 야간: 23시~02시 → 3시간", () => {
    expect(
      getShiftNightHours(shift("2026-04-23T23:00:00+09:00", "2026-04-24T02:00:00+09:00")),
    ).toBe(3);
  });

  it("야간대를 완전히 포함: 22시~06시 → 8시간", () => {
    expect(
      getShiftNightHours(shift("2026-04-23T22:00:00+09:00", "2026-04-24T06:00:00+09:00")),
    ).toBe(8);
  });

  it("야간대 일부만: 20시~익일 08시 → 8시간 (22~06)", () => {
    expect(
      getShiftNightHours(shift("2026-04-23T20:00:00+09:00", "2026-04-24T08:00:00+09:00")),
    ).toBe(8);
  });

  it("두 번의 야간대를 걸치는 36시간 근무: 16시간", () => {
    expect(
      getShiftNightHours(shift("2026-04-23T18:00:00+09:00", "2026-04-25T06:00:00+09:00")),
    ).toBe(16);
  });
});
