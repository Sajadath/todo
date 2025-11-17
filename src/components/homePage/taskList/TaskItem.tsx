"use client";

import { useActiveCategoryStore } from "@/lib/store/activeCategoryStore";
import { useModalStore } from "@/lib/store/modalStore";
import { Task, useTaskStore } from "@/lib/store/taskStore";
import { AnimatePresence, motion } from "motion/react";
import { Patrick_Hand } from "next/font/google";
import { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { RiSave3Fill } from "react-icons/ri";
import { VscDiscard } from "react-icons/vsc";
import { toast } from "react-toastify";
import SelectCategory from "@/components/ui/inputs/select/SelectCategory";
import StyledCheckBox from "@/components/ui/inputs/checkbox/StyledCheckBox";
import StyledTextInput from "@/components/ui/inputs/text/StyledInput";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400", // Patrick Hand only comes in one weight
  variable: "--font-patrick-hand",
});

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

export default function TaskItem({
  task,
  keyId,
}: {
  task: Task;
  keyId: string;
}) {
  const {
    toggleTask,
    deleteTask,
    addCategory,
    editTask,
    categories,
    tasks,
    deleteCategory,
  } = useTaskStore((state) => state);

  const { openModal, setDeleteFn } = useModalStore((state) => state);

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const [categoryMode, setCategoryMode] = useState<"select" | "add">("select");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    task.category.categoryId
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [errors, setErrors] = useState<Errors>({
    title: { hasError: false, message: null },
    category: { hasError: false, message: null },
  });

  const setActiveCategory = useActiveCategoryStore(
    (state) => state.setActiveCategory
  );

  function handleDelete() {
    setDeleteFn(() => deleteTask(task.id));
    openModal(task);
  }

  const handleSubmit = () => {
    setErrors({
      title: { hasError: false, message: null },
      category: { hasError: false, message: null },
    });

    // check for empty title
    if (!editedTitle.trim()) {
      setErrors((prev) => ({
        ...prev,
        title: {
          hasError: true,
          message: "Edited Title is required, please add a title",
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

    editTask(task.id, {
      title: editedTitle.trim(),

      category: {
        categoryId: categoryId,
        name:
          categoryMode === "select"
            ? categories.find((cat) => cat.categoryId === selectedCategoryId!)
                ?.name || "unknown category"
            : newCategory?.name || "unknown category",
      },
    });

    toast.success("Task updated!", {
      position: "top-center",
      theme: "colored",
    });

    setIsBeingEdited(false);

    const isOnlyChildInCategory =
      tasks.filter(
        (filteredTask) =>
          filteredTask.category.categoryId === task?.category.categoryId
      ).length < 2;

    if (isOnlyChildInCategory && task?.category.categoryId) {
      setActiveCategory({ categoryId: "All", name: "All" });
      if (
        task?.category.categoryId === "1" ||
        task?.category.categoryId === "2"
      )
        return;
      deleteCategory(task?.category.categoryId);
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, translateX: 0, translateY: -30 }}
      animate={{ opacity: 1, translateY: 0, translateX: 0 }}
      exit={{ opacity: 0, translateX: 40, translateY: 0 }}
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`transition-shadow hover:shadow-2xl dark:hover:shadow-black/75 duration-500 border-gray-500 dark:border-gray-400 max-w-2xl my-1 mx-auto w-full  relative border-dashed overflow-hidden   bg-card/70 dark:bg-card/80 p-3 pl-5 rounded-2xl   ${
        isBeingEdited ? "border-2   " : "border-0"
      }`}
    >
      <AnimatePresence>
        {task.isCompleted && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: task.isCompleted ? "100%" : 0 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0  w-2  rounded-t-2xl  inset-0  bg-doneGreen "
          />
        )}
      </AnimatePresence>
      <motion.div className="flex items-start gap-3 " layout="position">
        <div className="flex-1  ">
          <div className="flex justify-between gap-5 ">
            <div className="flex items-center gap-3 grow">
              <StyledCheckBox
                checked={task.isCompleted}
                onChange={() => toggleTask(task.id)}
              />
              {isBeingEdited ? (
                <StyledTextInput
                  placeholder="Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <p
                  className={`font-medium text-wrap transition-all duration-300 text-2xl max-w-full ${
                    patrickHand.className
                  }  ${
                    task.isCompleted
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : ""
                  }`}
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {task.title}
                </p>
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-2 flex gap-2 flex-wrap items-center text-xs ">
            {isBeingEdited ? (
              <SelectCategory
                layoutId={`editTask-selectCategory-${keyId}`}
                hasError={errors.category.hasError}
                errorMessage={errors.category.message}
                mode={categoryMode}
                newCategoryName={newCategoryName}
                selectedCategoryId={selectedCategoryId}
                setMode={setCategoryMode}
                setSelectedCategoryId={setSelectedCategoryId}
                setNewCategoryName={setNewCategoryName}
              />
            ) : (
              <div
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
                className="px-2 py-1 border border-indigo-500 dark:border-indigo-400 text-indigo-500 dark:text-indigo-400 my-auto rounded-2xl"
              >
                {task.category.name}
              </div>
            )}
            <div className="ml-auto flex gap-3 mt-auto ">
              {isBeingEdited ? (
                <>
                  <button
                    key={`cancel-editing-${task.id}`}
                    className=" text-card-foreground my-2 font-semibold p-1 hover:text-card-foreground/70 dark:hover:text-card-foreground/80 duration-300 rounded-md flex items-center justify-center gap-1 "
                    onClick={() => {
                      setIsBeingEdited(false);
                      setEditedTitle(task.title);
                      setCategoryMode("select");
                      setSelectedCategoryId(task.category.categoryId);
                      setNewCategoryName("");
                      setErrors({
                        title: { hasError: false, message: "" },
                        category: { hasError: false, message: "" },
                      });
                    }}
                  >
                    <VscDiscard className="size-5 " />
                    Cancel
                  </button>
                  <button
                    key={`save-editing-${task.id}`}
                    onClick={handleSubmit}
                    className=" text-card-foreground my-2 font-semibold p-1 hover:text-card-foreground/70 dark:hover:text-card-foreground/80 duration-300 rounded-md flex items-center justify-center gap-1 "
                  >
                    <RiSave3Fill className="size-5 " />
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    key={`edit-task-${task.id}`}
                    className=" text-card-foreground flex items-center justify-center transition-all duration-300 my-2 font-semibold px-1 py-1 rounded-md hover:text-card-foreground/30 dark:hover:text-card-foreground/30 "
                    onClick={() => setIsBeingEdited(true)}
                  >
                    <LiaEdit className="size-5 " />
                  </button>
                  <button
                    key={`delete-task-${task.id}`}
                    onClick={handleDelete}
                    className="text-card-foreground flex items-center justify-center transition-all duration-300 my-2 font-semibold px-1 py-1 rounded-md hover:text-card-foreground/30 dark:hover:text-card-foreground/30 "
                  >
                    <MdDelete className="size-5 " />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
}
