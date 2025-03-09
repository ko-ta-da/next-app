"use client";

import "./globals.css";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang = "ja">
      <body>
        <SessionProvider>
          <Header />
          { children }
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}