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
    <div className="py-1 absolute bottom-full -z-1 shadow bg-card rounded-t-2xl   px-4 text-center w-fit">
      <h2 className="  font-semibold text-gray-700 text-xl">
        {firstTitle}
        <span className="px-1 animate-pulse font-bold text-indigo-600">
          {" "}
          {midTitle}
        </span>
        {lastTitle}
      </h2>

      <div className="absolute left-0 right-0 bg-gradient-to-b from-white to-transparent h-2 top-full "></div>
    </div>
  );
}

export default CustomHeadLine;
