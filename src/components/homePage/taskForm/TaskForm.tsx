"use client";

import { useTaskStore } from "@/lib/store/taskStore";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import CustomHeadLine from "./CustomHeadLine";
import SelectCategory from "@/components/ui/inputs/select/SelectCategory";
import StyledTextInput from "@/components/ui/inputs/text/StyledInput";

import { useActiveCategoryStore } from "@/lib/store/activeCategoryStore";
import { RiResetLeftFill } from "react-icons/ri";
import { DecodeText } from "@/components/ui/specials/decodeError/DecodeText";

type Errors = {
  category: {
    hasError: boolean;
    message: string | null;
  };
  title: {
    hasError: boolean;
    message: string | null;
  };
};

export default function TaskForm() {
  const { addTask, addCategory, categories } = useTaskStore((state) => state);
  const [title, setTitle] = useState("");
  const setActiveCategory = useActiveCategoryStore(
    (state) => state.setActiveCategory
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [errors, setErrors] = useState<Errors>({
    title: { hasError: false, message: null },
    category: { hasError: false, message: null },
  });
  const [categoryMode, setCategoryMode] = useState<"select" | "add">("select");
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      title: { hasError: false, message: null },
      category: { hasError: false, message: null },
    });

    if (!title.trim()) {
      setErrors((prev) => ({
        ...prev,
        title: {
          hasError: true,
          message: "Title is required, please add a title",
        },
      }));
      return;
    }

    if (categoryMode === "select" && !selectedCategoryId) {
      setErrors((prev) => ({
        ...prev,
        category: {
          hasError: true,
          message: "Category is required ",
        },
      }));
      return;
    } else if (categoryMode === "add" && !newCategoryName.trim()) {
      setErrors((prev) => ({
        ...prev,
        category: {
          hasError: true,
          message: "Category is required",
        },
      }));
      return;
    }

    let categoryId: string;
    let newCategory: { categoryId: string; name: string } | null = null;
    if (categoryMode === "add") {
      newCategory = addCategory(newCategoryName);
      categoryId = newCategory.categoryId;
    } else {
      categoryId = selectedCategoryId!;
    }

    addTask({
      title: title.trim(),
      category: {
        categoryId: categoryId,
        name:
          categoryMode === "select"
            ? categories.find((cat) => cat.categoryId === selectedCategoryId!)
                ?.name || "unknown category"
            : newCategory?.name || "unknown category",
      },
    });

    setActiveCategory({
      categoryId: categoryId,
      name:
        categoryMode === "select"
          ? categories.find((cat) => cat.categoryId === selectedCategoryId!)
              ?.name || "unknown category"
          : newCategory?.name || "unknown category",
    });

    toast.success("New task created!", {
      position: "top-center",
      theme: "colored",
    });

    setTitle("");

    setSelectedCategoryId(null);
    setNewCategoryName("");
  };

  function checkTitleError() {
    if (!title.trim()) {
      setErrors((prev) => ({
        ...prev,
        title: {
          hasError: true,
          message: "Title is required, please add a title",
        },
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        title: {
          hasError: false,
          message: null,
        },
      }));
    }
  }

  return (
    <div className="h-fit relative  mt-13 w-full grow flex items-center flex-col justify-center ">
      <CustomHeadLine
        firstTitle="Add a new"
        midTitle="To-Do"
        lastTitle="Task"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-card/60 dark:bg-card/80 shadow-sm w-full hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-300 rounded-3xl  mx-auto p-4 md:p-6  max-w-lg flex flex-col gap-2  "
      >
        <ul>
          {errors.title.hasError && errors.title.message && (
            <li className="text-xs  border-l-2 rounded-tl-xl border-red-600 dark:border-red-500 pl-2">
              <DecodeText text={errors.title.message} />
            </li>
          )}
        </ul>
        <div className="flex-1 min-w-0">
          <StyledTextInput
            id="task-title"
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            handleOnBlur={checkTitleError}
            customClassName={
              errors.title.hasError
                ? "ring-2 ring-red-600 dark:ring-red-500 placeholder:text-red-300 dark:placeholder:text-red-500 "
                : ""
            }
          />
        </div>

        <SelectCategory
          layoutId="createTask-selectCategory"
          hasError={errors.category.hasError}
          errorMessage={errors.category.message}
          mode={categoryMode}
          setMode={setCategoryMode}
          setSelectedCategoryId={setSelectedCategoryId}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          selectedCategoryId={selectedCategoryId}
        />

        <div className="w-full sm:w-auto flex flex-col gap-2">
          <div className="flex items-center  justify-end">
            <div className="grow flex gap-5 justify-around sm:grow-0 sm:justify-end mt-3">
              <button
                onClick={() => {
                  setTitle("");
                  setSelectedCategoryId(null);
                  setNewCategoryName("");
                  setErrors({
                    title: { hasError: false, message: null },
                    category: { hasError: false, message: null },
                  });
                }}
                type="button"
                className="flex items-center justify-center gap-2 transition-all duration-300 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                <RiResetLeftFill className="size-4" />
                Reset
              </button>
              <button
                type="submit"
                className="px-3 py-2 transition-all duration-300 rounded-md flex items-center justify-center gap-1 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-400"
              >
                <FaPlus className="size-4" />
                Create Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
