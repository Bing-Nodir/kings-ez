// src/app/layout.js
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title:       { default: "Kings Education Zone", template: "%s | Kings EZ" },
  description: "O'zbekistonning birinchi AI-powered IT ta'lim platformasi. Data Analytics, Python, React, ML va yana ko'p kurslar — o'zbek tilida.",
  keywords:    ["IT kurslar uzbekistan", "python o'zbek tilida", "data analytics toshkent", "AI ta'lim"],
  openGraph: {
    title:       "Kings Education Zone",
    description: "O'zbek tilida professional IT ta'lim — AI Mentor bilan",
    url:         "https://kingseducation.uz",
    siteName:    "Kings Education Zone",
    locale:      "uz_UZ",
    type:        "website",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-navy min-h-screen noise">
        <SessionProvider session={session}>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: "#0F1F3D", color: "#fff", border: "1px solid rgba(0,188,212,0.2)" },
              success: { iconTheme: { primary: "#00BCD4", secondary: "#0A1628" } },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
