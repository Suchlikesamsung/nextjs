import { PrismaClient, Role, ScheduleStatus } from "@prisma/client";

const prisma = new PrismaClient();

function dateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00+09:00`);
}

async function main() {
  await prisma.attendance.deleteMany();
  await prisma.workSchedule.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "김하나",
      email: "admin@worklog.local",
      role: Role.ADMIN,
      hourlyWage: 0,
      position: "매장 관리자",
      phone: "010-1000-2000",
    },
  });

  const workers = await Promise.all([
    prisma.user.create({
      data: {
        name: "이도윤",
        email: "doyun@worklog.local",
        role: Role.WORKER,
        hourlyWage: 12000,
        position: "오픈 근무",
        phone: "010-2345-6789",
      },
    }),
    prisma.user.create({
      data: {
        name: "박서연",
        email: "seoyeon@worklog.local",
        role: Role.WORKER,
        hourlyWage: 11500,
        position: "마감 근무",
        phone: "010-3456-7890",
      },
    }),
  ]);

  await prisma.workSchedule.createMany({
    data: [
      {
        userId: workers[0].id,
        workDate: dateTime("2026-04-23", "00:00"),
        startTime: dateTime("2026-04-23", "09:00"),
        endTime: dateTime("2026-04-23", "15:00"),
        status: ScheduleStatus.COMPLETED,
      },
      {
        userId: workers[0].id,
        workDate: dateTime("2026-04-24", "00:00"),
        startTime: dateTime("2026-04-24", "10:00"),
        endTime: dateTime("2026-04-24", "16:00"),
      },
      {
        userId: workers[1].id,
        workDate: dateTime("2026-04-23", "00:00"),
        startTime: dateTime("2026-04-23", "15:00"),
        endTime: dateTime("2026-04-23", "22:00"),
      },
    ],
  });

  await prisma.attendance.createMany({
    data: [
      {
        userId: workers[0].id,
        workDate: dateTime("2026-04-23", "00:00"),
        clockIn: dateTime("2026-04-23", "08:58"),
        clockOut: dateTime("2026-04-23", "15:05"),
        memo: "오픈 준비 및 재고 정리",
      },
      {
        userId: workers[1].id,
        workDate: dateTime("2026-04-22", "00:00"),
        clockIn: dateTime("2026-04-22", "15:01"),
        clockOut: dateTime("2026-04-22", "22:03"),
        memo: "마감 정산 보조",
      },
    ],
  });

  console.log(`Seeded admin ${admin.email} and ${workers.length} workers.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
