type AttendanceRecord = {
  clockIn: Date;
  clockOut: Date | null;
};

export function getWorkedHours(attendances: AttendanceRecord[]) {
  return attendances.reduce((total, attendance) => {
    if (!attendance.clockOut) {
      return total;
    }

    const milliseconds = attendance.clockOut.getTime() - attendance.clockIn.getTime();
    return total + Math.max(milliseconds / 1000 / 60 / 60, 0);
  }, 0);
}

export function getEstimatedPay(attendances: AttendanceRecord[], hourlyWage: number) {
  return Math.round(getWorkedHours(attendances) * hourlyWage);
}

export function formatWon(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value);
}
