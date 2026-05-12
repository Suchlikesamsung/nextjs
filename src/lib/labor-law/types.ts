export type WeekDay = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export interface AttendanceShift {
  clockIn: Date;
  clockOut: Date;
  breakMinutes: number;
}

export interface EmploymentContract {
  hourlyWage: number;
  contractedWeeklyHours: number;
  weeklyOffDays: WeekDay[];
}

export interface PayPeriod {
  start: Date;
  endExclusive: Date;
  publicHolidays: Date[];
}

export interface HoursBreakdown {
  worked: number;
  regular: number;
  overtime: number;
  night: number;
  holiday: number;
}

export interface PayBreakdown {
  base: number;
  overtimePremium: number;
  nightPremium: number;
  holidayPremium: number;
  weeklyHolidayAllowance: number;
  grossPay: number;
}

export interface DeductionBreakdown {
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  total: number;
}

export type PayrollWarning =
  | { code: "BELOW_MINIMUM_WAGE"; expected: number; actual: number }
  | { code: "WEEKLY_HOURS_EXCEED_52"; weekStart: Date; hours: number };

export interface PayrollResult {
  period: PayPeriod;
  hours: HoursBreakdown;
  pay: PayBreakdown;
  deductions: DeductionBreakdown;
  netPay: number;
  warnings: PayrollWarning[];
}
