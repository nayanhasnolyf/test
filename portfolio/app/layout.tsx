import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const geistSans = Geist({
  display: "swap",
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  display: "swap",
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nayan Pokhriyal | Software Engineer",
  description:
    "Portfolio of Nayan Pokhriyal, a software engineer building backend systems, AI applications and useful products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        id="top"
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
