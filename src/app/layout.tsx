import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Worklog Mate",
  description: "근무자와 관리자를 위한 근태 관리 포트폴리오 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
