function CustomHeadLine({
  firstTitle,
  midTitle,
  lastTitle,
}: {
  firstTitle?: string;
  midTitle?: string;
  lastTitle?: string;
}) {
  return (
    <div className="py-1 absolute bottom-full -z-1 shadow bg-card dark:bg-card rounded-t-3xl   px-4 text-center w-fit">
      <h2 className="  font-semibold text-gray-700 dark:text-gray-300 text-xl">
        {firstTitle}
        <span className="px-1 animate-pulse font-bold text-indigo-600 dark:text-indigo-400">
          {" "}
          {midTitle}
        </span>
        {lastTitle}
      </h2>

      <div className="absolute left-0 right-0 bg-gradient-to-b from-white dark:from-slate-800 to-transparent h-2 top-full "></div>
    </div>
  );
}

export default CustomHeadLine;
