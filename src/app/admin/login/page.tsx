import { ShieldCheck } from "lucide-react";

import { LoginPanel } from "@/components/auth/login-panel";

export default function AdminLoginPage() {
  return (
    <LoginPanel
      roleLabel="관리자"
      title="근무 현황과 급여 흐름을 관리합니다."
      description="근무자 프로필, 근무 일정, 출퇴근 기록, 예상 지급 급여를 한 곳에서 관리하는 백오피스 로그인 화면입니다."
      demoHref="/admin"
      switchHref="/worker/login"
      switchLabel="근무자 로그인으로 이동"
      icon={<ShieldCheck className="size-5" />}
      highlights={["근무자 프로필 관리", "근무 일정 배정", "예상 급여 집계"]}
    />
  );
}
