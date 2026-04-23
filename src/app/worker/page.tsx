import Link from "next/link";
import { CalendarCheck, Clock3, Coins, NotebookText } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cards = [
  ["다음 근무", "4월 24일 10:00", CalendarCheck],
  ["이번 달 근무", "2일", NotebookText],
  ["총 근무시간", "13.2시간", Clock3],
  ["예상 급여", "158,400원", Coins],
];

export default function WorkerPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col justify-between gap-4 rounded-[2rem] border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Worker Dashboard</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">근무자 웹서비스</h1>
            <p className="mt-3 text-muted-foreground">
              데모판 체험으로 진입한 근무자 화면입니다. 이후 내 일정과 근무 일지 데이터를 연결합니다.
            </p>
          </div>
          <Link href="/worker/login" className={cn(buttonVariants({ variant: "secondary" }), "rounded-full")}>
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
