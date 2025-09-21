"use client";
import { useTaskStore } from "@/lib/store/taskStore";

import { motion } from "motion/react";
import React from "react";
import { DecodeText } from "./DecodeText";

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
    <div className="my-2 ">
      <div className="flex gap-2">
        <h2 className="text-sm mb-2 font-semibold"> Category </h2>
        <ul>
          {hasError && errorMessage && (
            <li className="text-xs text-red-600 border-l-2 rounded-tl-xl border-red-600 pl-2">
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
            <div className="mt-5 flex flex-wrap items-center gap-2 max-w-full justify-center w-fit mx-auto">
              <p className="font-semibold text-xs">Category :</p>
              <select
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
                className="hover:cursor-pointer bg-gray-50 text-wrap p-2 max-w-full text-xs"
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
            <p className="text-xs text-center text-gray-500 mt-3">
              There is no category
            </p>
          ))}

        {mode === "add" && (
          <div className="mt-5 flex items-center gap-2 justify-center w-fit mx-auto">
            <p className="font-semibold text-xs whitespace-nowrap">
              Category :
            </p>
            <input
              maxLength={30}
              value={newCategoryName}
              onChange={(e) => {
                setNewCategoryName(e.target.value);
              }}
              placeholder="New Category Name"
              className="w-full border border-gray-200 text-xs rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:placeholder:text-indigo-300 focus:outline-none"
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
      className="py-3 transition-all  font-semibold relative duration-300  px-4 rounded-t-lg hover:text-indigo-600"
      onClick={() => setMode(setToMode)}
      type="button"
    >
      {setToMode === "select" ? "Select  category" : "Add a new category"}
      {currentMode === setToMode && (
        <motion.span
          layoutId={layoutId}
          className="bottom-0 left-0 right-0 h-1 bg-indigo-500 absolute"
        ></motion.span>
      )}
    </button>
  );
}
