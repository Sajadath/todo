"use client";
import { useActiveCategoryStore } from "@/lib/store/activeCategoryStore";
import { useModalStore } from "@/lib/store/modalStore";
import { useTaskStore } from "@/lib/store/taskStore";
import { motion } from "motion/react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { VscDiscard } from "react-icons/vsc";

export default function DeleteModal() {
  const { deleteFn, closeModal, taskInfo } = useModalStore((state) => state);
  const { tasks, deleteCategory } = useTaskStore((state) => state);

  const setActiveCategory = useActiveCategoryStore(
    (state) => state.setActiveCategory
  );

  useEffect(() => {
    const escapePressed = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", escapePressed);

    return () => window.removeEventListener("keydown", escapePressed);
  }, [closeModal]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-20 flex   items-center justify-center top-0 right-0 left-0 bottom-0  backdrop-blur-md "
      onClick={closeModal}
    >
      <motion.div
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: 250,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="  bg-white dark:bg-gray-800 border-t-3 overflow-y-auto max-h-[calc(90dvh-20px)] border-red-500 dark:border-red-400 text-wrap max-w-[clamp(300px,400px,calc(90vw-2rem))] shadow-sm dark:shadow-indigo-900/20 rounded-2xl overflow-visible p-3 flex flex-col gap-2"
      >
        <p className="font-semibold text-md text-wrap pt-3 px-2 dark:text-gray-100 ">
          Are you sure you want to
          <span className="text-red-600 dark:text-red-400 px-1">delete</span>
          this task?
        </p>

        <div className="px-2">
          <div className="px-1 flex flex-col gap-2 border-l-2 border-indigo-500 ">
            <div>
              <p
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
                className="text-sm text-wrap text-gray-700 dark:text-gray-300 px-2 "
              >
                Task Title:{" "}
                <span className="font-semibold px-2">{taskInfo?.title}</span>
              </p>

              <p
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
                className="text-sm text-gray-700 dark:text-gray-300 px-2 "
              >
                Task Category:{" "}
                <span className="font-semibold px-2">
                  {taskInfo?.category?.name}
                </span>
              </p>

              <p className="text-sm text-gray-700 dark:text-gray-300 px-2 ">
                Task Created At:{" "}
                <span className="font-semibold px-2">
                  {taskInfo?.createdAt
                    ? new Date(taskInfo.createdAt).toLocaleDateString()
                    : "Unknown"}{" "}
                  in{" "}
                  {taskInfo?.createdAt
                    ? new Date(taskInfo.createdAt).toLocaleTimeString()
                    : "Unknown"}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-center text-xs">
              {taskInfo?.isCompleted ? (
                <p className="bg-green-200 dark:bg-green-900/30 rounded-lg px-3 py-2 my-2 text-green-700 dark:text-green-400">
                  This Task Is Done
                </p>
              ) : (
                <p className="bg-red-200 dark:bg-red-900/30 rounded-lg px-3 py-2 my-2 text-red-700 dark:text-red-500">
                  This Task Is Not Done Yet !
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-700 dark:text-gray-300 px-2 ">
          This action can not be undone,
          <br />
          Please confirm if you want to delete this task
        </p>

        <div className="flex justify-end gap-3 mt-4 text-sm">
          <button
            className="px-3 py-2 flex items-center justify-center gap-1 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-all duration-300"
            onClick={closeModal}
          >
            Nevermind
            <VscDiscard />
          </button>
          <button
            onClick={() => {
              if (deleteFn === undefined || deleteFn === null) {
                throw new Error("Delete function is not defined in the modal ");
              }
              deleteFn();

              closeModal();

              const isOnlyChildInCategory =
                tasks.filter(
                  (task) =>
                    task.category.categoryId === taskInfo?.category.categoryId
                ).length < 2;

              if (isOnlyChildInCategory && taskInfo?.category.categoryId) {
                setActiveCategory({ categoryId: "All", name: "All" });
                if (
                  taskInfo?.category.categoryId === "1" ||
                  taskInfo?.category.categoryId === "2"
                )
                  return;
                deleteCategory(taskInfo?.category.categoryId);
              }
            }}
            className="text-red-500 dark:text-red-400 flex items-center justify-center transition-all gap-1 duration-300 my-2 font-semibold px-1 py-1 rounded-md hover:text-red-400/60 dark:hover:text-red-300 "
          >
            Yes Delete it
            <MdDelete className="size-5 " />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
