export const MINIMUM_HOURLY_WAGE = 10_030;

export const NIGHT_WORK_START_HOUR = 22;
export const NIGHT_WORK_END_HOUR = 6;

export const DAILY_REGULAR_HOURS_LIMIT = 8;
export const WEEKLY_REGULAR_HOURS_LIMIT = 40;
export const WEEKLY_TOTAL_HOURS_LIMIT = 52;

export const OVERTIME_PREMIUM_RATE = 0.5;
export const NIGHT_PREMIUM_RATE = 0.5;
export const HOLIDAY_PREMIUM_RATE_WITHIN_8H = 0.5;
export const HOLIDAY_PREMIUM_RATE_OVER_8H = 1.0;

export const WEEKLY_HOLIDAY_MIN_HOURS = 15;

export const INSURANCE_RATE = {
  nationalPension: 0.045,
  healthInsurance: 0.03545,
  longTermCareOfHealth: 0.1295,
  employmentInsurance: 0.009,
} as const;

export const LOCAL_INCOME_TAX_RATE = 0.1;
