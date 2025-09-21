import type { Metadata } from "next";
import "./globals.css";
import LayoutDesign from "@/components/LayoutDesign";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "To-Do Manager",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` text-gray-900 min-h-screen w-screen overflow-x-hidden  ${inter.className} bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200  selection:bg-indigo-500 selection:text-white`}
      >
        <LayoutDesign>{children}</LayoutDesign>
      </body>
    </html>
  );
}
