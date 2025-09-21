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

export function TodoStats() {
  const tasks = useTaskStore((state) => state.tasks);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((todo) => todo.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-semibold">
      <div className="  bg-card/60 rounded-3xl shadow-sm hover:shadow-2xl duration-300 transition-all p-8 text-center">
        <div className="text-2xl font-bold ">
          <AnimatedCounter value={totalTasks} />
        </div>
        <div className="text-sm text-muted-foreground">Total Tasks</div>
      </div>

      <div className="  bg-card/60 rounded-3xl shadow-sm hover:shadow-2xl duration-300 transition-all p-8 text-center">
        <div className="text-2xl font-bold text-green-600">
          <AnimatedCounter value={completedTasks} />
        </div>
        <div className="text-sm text-muted-foreground">Completed</div>
      </div>

      <div className="  bg-card/60 rounded-3xl shadow-sm hover:shadow-2xl duration-300 transition-all p-8 text-center">
        <div className="text-2xl font-bold text-orange-600">
          <AnimatedCounter value={pendingTasks} />
        </div>
        <div className="text-sm text-muted-foreground">Pending</div>
      </div>

      <div className="  bg-card/60 rounded-3xl shadow-sm hover:shadow-2xl duration-300 transition-all p-8 text-center">
        <div className="text-2xl font-bold text-indigo-600 ">
          <AnimatedCounter value={completionRate} />%
        </div>
        <div className="text-sm text-muted-foreground">Complete</div>
      </div>
    </div>
  );
}
