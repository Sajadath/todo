"use client";
import { useTaskStore } from "@/lib/store/taskStore";

import { motion } from "motion/react";
import React from "react";
import { DecodeText } from "@/components/ui/specials/decodeError/DecodeText";

function SelectCategory({
  hasError,
  errorMessage,
  mode,
  newCategoryName,
  selectedCategoryId,
  layoutId,
  setMode,
  setSelectedCategoryId,
  setNewCategoryName,
}: {
  hasError: boolean;
  errorMessage: string | null;
  mode: "select" | "add";
  newCategoryName: string;
  selectedCategoryId: string | null;
  layoutId: string;
  setMode: React.Dispatch<React.SetStateAction<"select" | "add">>;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
  setNewCategoryName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const categories = useTaskStore((state) => state.categories);

  return (
    <div className="my-2 grow sm:grow-0">
      <div className="flex gap-2 items-center">
        <h2 className="text-sm mb-2 font-semibold dark:text-gray-100">
          Category
        </h2>
        <ul>
          {hasError && errorMessage && (
            <li className="text-xs pb-1 border-l-2 rounded-tl-xl border-red-600 dark:border-red-500 pl-2">
              <DecodeText text={errorMessage} />
            </li>
          )}
        </ul>
      </div>
      <div className=" flex items-stretch text-[10px] sm:text-xs  justify-center gap-3">
        <SelectModeButton
          layoutId={layoutId}
          currentMode={mode}
          setToMode="select"
          setMode={setMode}
        />
        <SelectModeButton
          layoutId={layoutId}
          currentMode={mode}
          setToMode="add"
          setMode={setMode}
        />
      </div>
      {/* fixed */}
      <div className="flex">
        {mode === "select" &&
          (categories.length > 0 ? (
            <div className="mt-5 mx-auto flex flex-wrap items-center gap-2 max-w-full justify-center w-fit ">
              <select
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
                className="hover:cursor-pointer bg-gray-50 text-wrap p-2 w-[15rem] text-xs dark:bg-gray-800 dark:text-gray-200"
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                value={selectedCategoryId ? selectedCategoryId : ""}
              >
                <option value="" hidden>
                  Select a category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
              There is no category
            </p>
          ))}

        {mode === "add" && (
          <div className="mt-5 flex items-center gap-2 justify-center w-fit mx-auto">
            <input
              maxLength={30}
              value={newCategoryName}
              onChange={(e) => {
                setNewCategoryName(e.target.value);
              }}
              placeholder="New Category Name"
              className="w-[15rem] border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 text-xs rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:placeholder:text-indigo-300 dark:focus:placeholder:text-indigo-500 focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectCategory;

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
