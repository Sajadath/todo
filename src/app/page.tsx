"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { TodoStats } from "@/components/TodoStats";

export default function Page() {
  return (
    <div className="w-full px-4 flex flex-col  items-center gap-6 ">
      <TodoStats />
      <TaskForm />
      <TaskList />
    </div>
  );
}
