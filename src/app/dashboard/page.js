// src/app/dashboard/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login?callbackUrl=/dashboard");

  const [enrollments, chatHistory] = await Promise.all([
    db.enrollment.findMany({
      where:   { userId: session.user.id },
      include: { course: { include: { category: true } } },
      orderBy: { enrolledAt: "desc" },
      take:    10,
    }),
    db.chatMessage.findMany({
      where:   { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take:    50,
    }),
  ]);

  return (
    <>
      <Navbar />
      <DashboardClient
        user={session.user}
        enrollments={JSON.parse(JSON.stringify(enrollments))}
        chatHistory={JSON.parse(JSON.stringify(chatHistory.reverse()))}
      />
    </>
  );
}
