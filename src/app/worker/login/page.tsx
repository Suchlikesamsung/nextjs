import { UserRoundCheck } from "lucide-react";

import { LoginPanel } from "@/components/auth/login-panel";

export default function WorkerLoginPage() {
  return (
    <LoginPanel
      roleLabel="근무자"
      title="내 근무 일정과 예상 급여를 확인합니다."
      description="배정된 근무일, 출퇴근 기록, 시급, 이번 달 예상 월 급여를 확인하는 근무자용 로그인 화면입니다."
      demoHref="/worker"
      switchHref="/admin/login"
      switchLabel="관리자 로그인으로 이동"
      icon={<UserRoundCheck className="size-5" />}
      highlights={["내 근무 일정 확인", "출퇴근 기록 확인", "예상 월 급여 확인"]}
    />
  );
}
