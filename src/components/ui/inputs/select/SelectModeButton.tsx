"use client";
import { motion } from "motion/react";

function SelectModeButton({
  setToMode,
  currentMode,
  layoutId,
  setMode,
}: {
  setToMode: "select" | "add";
  currentMode: "select" | "add";
  layoutId: string;
  setMode: React.Dispatch<React.SetStateAction<"select" | "add">>;
}) {
  return (
    <button
      className="py-3 transition-all  font-semibold relative duration-300  px-4 rounded-t-lg hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
      onClick={() => setMode(setToMode)}
      type="button"
    >
      {setToMode === "select" ? "Select  category" : "Add a new category"}
      {currentMode === setToMode && (
        <motion.span
          layoutId={layoutId}
          className="bottom-0 left-0 right-0 h-1 bg-indigo-500 dark:bg-indigo-400 absolute"
        ></motion.span>
      )}
    </button>
  );
}

export default SelectModeButton;
