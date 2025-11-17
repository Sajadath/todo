"use client";

import { useTaskStore } from "@/lib/store/taskStore";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.8, // speed of animation
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function TodoStats() {
  const tasks = useTaskStore((state) => state.tasks);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((todo) => todo.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-semibold">
      <div className="  bg-card/60 dark:bg-card/80 rounded-3xl shadow-sm hover:shadow-2xl dark:hover:shadow-black/75 duration-300 transition-all p-8 text-center">
        <div className="text-2xl font-bold dark:text-gray-100">
          <AnimatedCounter value={totalTasks} />
        </div>
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          Total Tasks
        </div>
      </div>

      <div className="  bg-card/60 dark:bg-card/80 rounded-3xl shadow-sm hover:shadow-2xl dark:hover:shadow-black/75 duration-300 transition-all p-8 text-center">
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
          <AnimatedCounter value={completedTasks} />
        </div>
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          Completed
        </div>
      </div>

      <div className="  bg-card/60 dark:bg-card/80 rounded-3xl shadow-sm hover:shadow-2xl dark:hover:shadow-black/75 duration-300 transition-all p-8 text-center">
        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
          <AnimatedCounter value={pendingTasks} />
        </div>
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          Pending
        </div>
      </div>

      <div className="  bg-card/60 dark:bg-card/80 rounded-3xl shadow-sm hover:shadow-2xl dark:hover:shadow-black/75 duration-300 transition-all p-8 text-center">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 ">
          <AnimatedCounter value={completionRate} />%
        </div>
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          Complete
        </div>
      </div>
    </div>
  );
}
