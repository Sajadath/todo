import FadingLine from "@/components/ui/specials/fadingLine/FadingLine";
import ThemeToggle from "./ThemeToggle";
import localFont from "next/font/local";
const asimovianFont = localFont({
  src: "../../../public/asimovian.ttf",
});

export default function Header() {
  return (
    <header
      className={`px-6 pt-10 pb-6 w-full flex flex-col  items-center gap-2 relative    ${asimovianFont.className}`}
    >
      <div className="absolute top-4 right-6">
        <ThemeToggle />
      </div>
      <div>
        <div className="w-fit ">
          <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent ">
            To-Do
          </h1>
          <FadingLine via="via-gray-200 dark:via-gray-700" />
        </div>
        <p className="text-sm text-[#9ca3af] dark:text-gray-400 ">
          Manage your tasks{" "}
        </p>
      </div>
    </header>
  );
}
