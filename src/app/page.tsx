import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  Coins,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const workerFeatures = [
  "내 근무 일정과 근무 일지 조회",
  "배정 시급과 이번 달 예상 급여 확인",
  "최근 출퇴근 기록과 메모 확인",
];

const adminFeatures = [
  "근무자 프로필과 시급 관리",
  "근무 일정 및 출퇴근 기록 CRUD",
  "근무일수, 총 근무시간, 예상 지급 급여 집계",
];

const apiRoutes = [
  "GET/POST /api/workers",
  "GET/POST /api/schedules",
  "GET/POST /api/attendance",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(245,176,65,0.28),transparent_32%),linear-gradient(135deg,#fbf7ea_0%,#eef7ef_48%,#dbeee4_100%)] px-6 py-8 text-foreground">
      <section className="mx-auto flex max-w-6xl flex-col gap-10">
        <nav className="flex items-center justify-between rounded-full border bg-card/70 px-5 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CalendarClock className="size-5" />
            </span>
            Worklog Mate
          </div>
          <span className="hidden text-sm text-muted-foreground sm:block">
            Next.js + Prisma + SQLite CRUD starter
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex rounded-full border bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
              근무자 웹서비스 + 관리자 백오피스
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-[-0.045em] text-[#18352f] sm:text-7xl">
                근태 기록을 한눈에 보는 포트폴리오 CRUD.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                근무자는 내 일정과 예상 월급을 확인하고, 관리자는 근무자별 근무일수,
                출퇴근 시간, 시급, 예상 지급 급여를 관리하는 작은 근태 관리 시스템입니다.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="rounded-full px-6">
                관리자 대시보드 설계하기
                <ArrowRight className="size-4" />
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full px-6">
                근무자 화면 설계하기
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border bg-card/80 p-5 shadow-2xl shadow-emerald-950/10 backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#173b34] p-5 text-primary-foreground">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/65">이번 달 예상 지급</p>
                  <p className="text-4xl font-black tracking-tight">1,284,000원</p>
                </div>
                <Coins className="size-9 text-amber-200" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["근무자", "12명"],
                  ["오늘 근무", "7명"],
                  ["기록", "38건"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm text-white/60">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FeatureCard
                icon={<UsersRound className="size-5" />}
                title="근무자 기능"
                items={workerFeatures}
              />
              <FeatureCard
                icon={<ShieldCheck className="size-5" />}
                title="관리자 기능"
                items={adminFeatures}
              />
            </div>
          </div>
        </div>

        <section className="grid gap-4 rounded-[2rem] border bg-card/70 p-5 shadow-sm backdrop-blur md:grid-cols-3">
          {apiRoutes.map((route) => (
            <div key={route} className="rounded-2xl border bg-background/70 p-4">
              <ClipboardList className="mb-4 size-5 text-primary" />
              <p className="font-mono text-sm font-semibold">{route}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Prisma + Zod 기반 Route Handler scaffold
              </p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <article className="rounded-3xl border bg-background/75 p-5">
      <div className="mb-4 flex items-center gap-2 font-bold">
        <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
          {icon}
        </span>
        {title}
      </div>
      <ul className="space-y-3 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 size-1.5 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
