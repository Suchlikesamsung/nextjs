import Link from "next/link";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  Clock3,
  Coins,
  Mail,
  MapPin,
  NotebookText,
  Phone,
  UserRound,
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
  position: "아르바이트",
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
  ["직위", worker.position, BriefcaseBusiness],
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

export default function WorkerPage() {
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
      </section>
    </main>
  );
}
