"use client";

import { useTaskStore } from "@/lib/store/taskStore";
import { AnimatePresence } from "motion/react";
import TaskItem from "./TaskItem";

import { useActiveCategoryStore } from "@/lib/store/activeCategoryStore";
import CategoriesSelection from "./CategoriesSelection";
import EmptyTaskList from "./EmptyTaskList";
import AllCategoryButton from "./AllCategoryButton";

export default function TaskList() {
  const { tasks, categories } = useTaskStore((state) => state);
  const { activeCategory, setActiveCategory } = useActiveCategoryStore(
    (state) => state
  );

  const filteredTasks =
    activeCategory.categoryId === "All"
      ? tasks
      : tasks.filter(
          (task) => task.category.categoryId === activeCategory.categoryId
        );

  console.log("Categories", categories);
  console.log("Tasks", tasks);

  return (
    <ul className="gap-3 pb-5 flex w-full   flex-col   ">
      <h2 className="w-fit mx-auto font-semibold text-2xl">Tasks</h2>
      <div className="flex items-center justify-center">
        <AllCategoryButton
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <CategoriesSelection
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      {filteredTasks.length === 0 && <EmptyTaskList />}

      <AnimatePresence>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} keyId={task.id} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
