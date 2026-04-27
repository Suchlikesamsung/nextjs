"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarCheck,
  CalendarDays,
  Clock3,
  Coins,
  Mail,
  MapPin,
  NotebookText,
  Phone,
  ReceiptText,
  Umbrella,
  UserRound,
  WalletCards,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const worker = {
  name: "이도윤",
  age: 24,
  joinedAt: "2026.01.08",
  hourlyWage: "12,000원",
  workedDays: "18일",
  employmentType: "파트타임",
  paidLeaveDays: "3일",
  branch: "성수 1호점",
  phone: "010-2345-6789",
  email: "doyun@worklogmate.co.kr",
  status: "오늘 10:00 출근 예정",
  nextShift: "4월 24일 10:00 - 16:00",
};

const profileItems = [
  ["나이", `${worker.age}세`, UserRound],
  ["입사일", worker.joinedAt, CalendarDays],
  ["할당 시급", worker.hourlyWage, Coins],
  ["근무일수", worker.workedDays, NotebookText],
  ["근무형태", worker.employmentType, Clock3],
  ["유급 휴가일", worker.paidLeaveDays, Umbrella],
];

const contactItems = [
  [worker.branch, MapPin],
  [worker.phone, Phone],
  [worker.email, Mail],
];

const cards = [
  ["다음 근무", worker.nextShift, CalendarCheck],
  ["이번 달 근무", worker.workedDays, NotebookText],
  ["총 근무시간", "13.2시간", Clock3],
  ["예상 급여", "158,400원", Coins],
];

const attendanceRows = [
  {
    date: "4월 23일",
    type: "오픈",
    clockIn: "08:58",
    clockOut: "15:05",
    breakTime: "30분",
    total: "5.6시간",
    status: "완료",
    memo: "오픈 준비 및 재고 정리",
  },
  {
    date: "4월 22일",
    type: "오픈",
    clockIn: "09:01",
    clockOut: "15:00",
    breakTime: "30분",
    total: "5.5시간",
    status: "완료",
    memo: "매장 정리",
  },
  {
    date: "4월 20일",
    type: "주말",
    clockIn: "10:00",
    clockOut: "16:08",
    breakTime: "30분",
    total: "5.6시간",
    status: "완료",
    memo: "피크 타임 지원",
  },
  {
    date: "4월 24일",
    type: "오픈",
    clockIn: "-",
    clockOut: "-",
    breakTime: "30분",
    total: "6.0시간",
    status: "예정",
    memo: "10:00 출근 예정",
  },
];

const salaryItems = [
  ["기본 근무수당", "158,400원", "13.2시간 x 12,000원"],
  ["주휴수당", "24,000원", "이번 주 예상 충족분"],
  ["유급 휴가수당", "36,000원", "3일 잔여"],
  ["공제 예정", "-8,400원", "세금 및 보험 예상"],
];

const salarySummary = [
  ["총 지급 예정", "218,400원"],
  ["공제 후 예상", "210,000원"],
  ["다음 지급일", "5월 10일"],
];

export default function WorkerPage() {
  const [activeTab, setActiveTab] = useState<"attendance" | "salary">("attendance");

  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col justify-between gap-4 rounded-lg border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Worker Dashboard</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">근무자 웹서비스</h1>
            <p className="mt-3 text-muted-foreground">
              내 프로필, 배정 정보, 근무 현황을 한 화면에서 확인합니다.
            </p>
          </div>
          <Link href="/worker/login" className={cn(buttonVariants({ variant: "secondary" }), "rounded-full")}>
            로그인 화면으로
          </Link>
        </header>

        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div
                  aria-label={`${worker.name} 프로필 사진`}
                  className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#173b34_0%,#2f6f5f_55%,#f0be5c_100%)] text-3xl font-black text-white shadow-sm"
                >
                  이
                </div>
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                    <BadgeCheck className="size-3.5" />
                    근무 가능
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">{worker.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{worker.status}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                {contactItems.map(([label, Icon]) => (
                  <div key={label as string} className="flex items-center gap-2">
                    <Icon className="size-4 text-primary" />
                    <span>{label as string}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {profileItems.map(([label, value, Icon]) => (
                <div key={label as string} className="rounded-lg border bg-background/70 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-muted-foreground">{label as string}</p>
                    <Icon className="size-4 text-primary" />
                  </div>
                  <p className="text-xl font-black tracking-tight">{value as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-4">
          {cards.map(([label, value, Icon]) => (
            <article key={label as string} className="rounded-lg border bg-card p-5 shadow-sm">
              <Icon className="mb-5 size-6 text-primary" />
              <p className="text-sm text-muted-foreground">{label as string}</p>
              <p className="mt-2 text-2xl font-black">{value as string}</p>
            </article>
          ))}
        </div>

        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Monthly Details</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">상세 내역</h2>
            </div>

            <div className="grid grid-cols-2 gap-1 rounded-lg border bg-card p-1 shadow-sm">
              <button
                type="button"
                aria-pressed={activeTab === "attendance"}
                onClick={() => setActiveTab("attendance")}
                className={cn(
                  "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition",
                  activeTab === "attendance"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <CalendarCheck className="size-4" />
                근무 내역
              </button>
              <button
                type="button"
                aria-pressed={activeTab === "salary"}
                onClick={() => setActiveTab("salary")}
                className={cn(
                  "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition",
                  activeTab === "salary"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <ReceiptText className="size-4" />
                급여 내역
              </button>
            </div>
          </div>

          {activeTab === "attendance" ? <AttendanceDetails /> : <SalaryDetails />}
        </section>
      </section>
    </main>
  );
}

function AttendanceDetails() {
  return (
    <div className="space-y-3">
      <div className="hidden overflow-hidden rounded-lg border bg-card shadow-sm md:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-muted/70 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">날짜</th>
              <th className="px-4 py-3 font-semibold">근무</th>
              <th className="px-4 py-3 font-semibold">출근</th>
              <th className="px-4 py-3 font-semibold">퇴근</th>
              <th className="px-4 py-3 font-semibold">휴게</th>
              <th className="px-4 py-3 font-semibold">총 시간</th>
              <th className="px-4 py-3 font-semibold">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {attendanceRows.map((row) => (
              <tr key={`${row.date}-${row.type}`} className="bg-card">
                <td className="px-4 py-4 font-semibold">{row.date}</td>
                <td className="px-4 py-4">{row.type}</td>
                <td className="px-4 py-4">{row.clockIn}</td>
                <td className="px-4 py-4">{row.clockOut}</td>
                <td className="px-4 py-4">{row.breakTime}</td>
                <td className="px-4 py-4 font-semibold">{row.total}</td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-bold",
                      row.status === "완료"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent text-accent-foreground",
                    )}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {attendanceRows.map((row) => (
          <article key={`${row.date}-${row.type}`} className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold">{row.date}</p>
                <p className="mt-1 text-sm text-muted-foreground">{row.type} 근무</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                {row.status}
              </span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {[
                ["출근", row.clockIn],
                ["퇴근", row.clockOut],
                ["휴게", row.breakTime],
                ["총 시간", row.total],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-muted/60 p-3">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-bold">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-muted-foreground">{row.memo}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SalaryDetails() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-3 sm:grid-cols-2">
        {salaryItems.map(([label, value, note]) => (
          <article key={label} className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="font-bold">{label}</p>
              <WalletCards className="size-5 text-primary" />
            </div>
            <p className="text-2xl font-black tracking-tight">{value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{note}</p>
          </article>
        ))}
      </div>

      <aside className="rounded-lg border bg-primary p-5 text-primary-foreground shadow-sm">
        <p className="text-sm font-semibold text-primary-foreground/75">이번 달 급여</p>
        <div className="mt-5 space-y-4">
          {salarySummary.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-white/15 pb-4 last:border-0 last:pb-0">
              <span className="text-sm text-primary-foreground/75">{label}</span>
              <strong className="text-right text-lg">{value}</strong>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
