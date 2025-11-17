import type { Metadata } from "next";
import "./globals.css";
import LayoutDesign from "@/components/ui/layout/LayoutDesign";
import ThemeProvider from "@/components/providers/theme/ThemeProvider";
import { Inter } from "next/font/google";
import { themesOptions } from "@/components/header/ThemeToggle";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={` text-gray-900 dark:text-gray-100 min-h-screen w-screen overflow-x-hidden  ${inter.className}  bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800  selection:bg-indigo-500 dark:selection:bg-indigo-400 selection:text-white transition-colors duration-800`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          themes={themesOptions}
        >
          <LayoutDesign>{children}</LayoutDesign>
        </ThemeProvider>
      </body>
    </html>
  );
}
