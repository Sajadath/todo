"use client";
import { DecodeText } from "@/components/ui/specials/decodeError/DecodeText";
import { useTaskStore } from "@/lib/store/taskStore";
import React from "react";
import SelectModeButton from "@/components/ui/inputs/select/SelectModeButton";
import CreateNewCategoryInput from "@/components/ui/inputs/text/CreateNewCategoryInput";
import CategorySelection from "@/components/ui/inputs/select/CategorySelection";

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
      <div className="mt-5 flex items-center  justify-center w-full">
        {mode === "select" &&
          (categories.length > 0 ? (
            <CategorySelection
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
            />
          ) : (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
              There is no category
            </p>
          ))}

        {mode === "add" && (
          <CreateNewCategoryInput
            setNewCategoryName={setNewCategoryName}
            newCategoryName={newCategoryName}
          />
        )}
      </div>
    </div>
  );
}

export default SelectCategory;
