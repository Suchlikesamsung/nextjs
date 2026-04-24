import Link from "next/link";
import { CalendarDays, Clock3, Coins, UsersRound } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cards = [
  ["전체 근무자", "12명", UsersRound],
  ["오늘 근무 예정", "7명", CalendarDays],
  ["이번 달 예상 지급", "1,284,000원", Coins],
  ["기록된 출퇴근", "38건", Clock3],
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col justify-between gap-4 rounded-[2rem] border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Admin Dashboard</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">관리자 백오피스</h1>
            <p className="mt-3 text-muted-foreground">
              근무자, 일정, 출퇴근 기록을 관리하고 월별 지급 현황을 확인합니다.
            </p>
          </div>
          <Link href="/admin/login" className={cn(buttonVariants({ variant: "secondary" }), "rounded-full")}>
            로그인 화면으로
          </Link>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          {cards.map(([label, value, Icon]) => (
            <article key={label as string} className="rounded-3xl border bg-card p-5 shadow-sm">
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
