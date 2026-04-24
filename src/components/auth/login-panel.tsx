import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LoginPanelProps = {
  roleLabel: string;
  title: string;
  description: string;
  demoHref: string;
  switchHref: string;
  switchLabel: string;
  highlights: string[];
  icon: ReactNode;
};

export function LoginPanel({
  roleLabel,
  title,
  description,
  demoHref,
  switchHref,
  switchLabel,
  highlights,
  icon,
}: LoginPanelProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_15%,rgba(245,176,65,0.28),transparent_28%),linear-gradient(135deg,#fbf7ea_0%,#eef7ef_54%,#dbeee4_100%)] px-6 py-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {icon}
            </span>
            Worklog Mate
          </Link>

          <div className="space-y-5">
            <div className="inline-flex rounded-full border bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground">
              {roleLabel} 로그인
            </div>
            <h1 className="max-w-xl text-5xl font-black leading-tight tracking-[-0.045em] text-[#18352f] sm:text-6xl">
              {title}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">{description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div key={highlight} className="rounded-3xl border bg-card/70 p-4 shadow-sm backdrop-blur">
                <CheckCircle2 className="mb-4 size-5 text-primary" />
                <p className="text-sm font-semibold leading-6">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border bg-card/85 p-6 shadow-2xl shadow-emerald-950/10 backdrop-blur">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{roleLabel}</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">계정으로 로그인</h2>
            </div>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <LockKeyhole className="size-6" />
            </span>
          </div>

          <form className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-semibold">이메일</span>
              <input
                type="email"
                placeholder="name@worklogmate.co.kr"
                className="h-12 w-full rounded-2xl border bg-background/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold">비밀번호</span>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="h-12 w-full rounded-2xl border bg-background/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>

            <Button type="button" size="lg" className="h-12 w-full rounded-2xl">
              로그인
              <ArrowRight className="size-4" />
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs font-medium text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            또는
            <span className="h-px flex-1 bg-border" />
          </div>

          <Link
            href={demoHref}
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "h-12 w-full rounded-2xl")}
          >
            바로 입장하기
            <ArrowRight className="size-4" />
          </Link>

          <Link
            href={switchHref}
            className="mt-5 block text-center text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            {switchLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
