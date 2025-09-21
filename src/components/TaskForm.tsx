"use client";

import { useTaskStore } from "@/lib/store/taskStore";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import CustomHeadLine from "./CustomHeadLine";
import SelectCategory from "./SelectCategory";
import StyledTextInput from "./StyledInput";

import { useActiveCategoryStore } from "@/lib/store/activeCategoryStore";
import { RiResetLeftFill } from "react-icons/ri";
import { DecodeText } from "./DecodeText";

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

    // check for empty title
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
    // check for empty category
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
    <div className="h-fit relative  mt-13 w-[80%] grow flex items-center flex-col justify-center ">
      <CustomHeadLine
        firstTitle="Add a new"
        midTitle="To-Do"
        lastTitle="Task"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-card/60  shadow-sm w-full hover:shadow-2xl transition-all duration-300 rounded-lg  mx-auto p-4  max-w-lg flex flex-col gap-2  "
      >
        <ul>
          {errors.title.hasError && errors.title.message && (
            <li className="text-xs text-red-600 border-l-2 rounded-tl-xl border-red-600 pl-2">
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
                ? "ring-2 ring-red-500 placeholder:text-red-300 "
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
            <div className="flex gap-3">
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
                className="flex hover:text-indigo-500 transition-all duration-300 items-center justify-center gap-2"
              >
                <RiResetLeftFill className="size-4" />
                Reset
              </button>
              <button
                type="submit"
                className="px-3 py-2 transition-all duration-300 rounded-md flex items-center justify-center gap-1 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
