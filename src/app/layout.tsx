import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Call Dashboard",
  description: "Dashboard for viewing call transcripts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gray-900 text-slate-200`}
      >
        {/* Navbar can go here if needed outside the main growing content */}
        {/* <Navbar /> */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
