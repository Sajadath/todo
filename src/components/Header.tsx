import FadingLine from "./FadingLine";
import localFont from "next/font/local";
// Update the path to your font file as needed
const asimovianFont = localFont({
  src: "../../public/asimovian.ttf",
});

export default function Header() {
  return (
    <header
      className={`px-6 pt-10 pb-6 w-full flex flex-col  items-center gap-2    ${asimovianFont.className}`}
    >
      <div>
        <div className="w-fit ">
          <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent ">
            To-Do
          </h1>
          <FadingLine via="via-gray-200" />
        </div>
        <p className="text-sm text-[#9ca3af] ">Manage your tasks </p>
      </div>
    </header>
  );
}
