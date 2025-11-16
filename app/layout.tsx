import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online QRCode Generator",
  description: "Online QRCode Generator that does not suck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-black`}
      >
        <Header className="fixed z-20 top-0 left-0 right-0 h-(--nav-height) shadow-sm" />
        <main className="mt-(--nav-height) min-h-screen">{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
