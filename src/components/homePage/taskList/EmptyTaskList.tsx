"use client";

import { Caveat } from "next/font/google";
import Tilt from "react-parallax-tilt";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRef, useEffect } from "react";
import { useTaskStore } from "@/lib/store/taskStore";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export default function EmptyTaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const taskCount = tasks.length;

  const cardRef = useRef<HTMLDivElement | null>(null);

  const tlX = useMotionValue(0);
  const tlY = useMotionValue(0);
  const trX = useMotionValue(0);
  const trY = useMotionValue(0);
  const blX = useMotionValue(0);
  const blY = useMotionValue(0);
  const brX = useMotionValue(0);
  const brY = useMotionValue(0);

  const tlXSpring = useSpring(tlX, { stiffness: 180, damping: 22 });
  const tlYSpring = useSpring(tlY, { stiffness: 180, damping: 22 });
  const trXSpring = useSpring(trX, { stiffness: 180, damping: 22 });
  const trYSpring = useSpring(trY, { stiffness: 180, damping: 22 });
  const blXSpring = useSpring(blX, { stiffness: 180, damping: 22 });
  const blYSpring = useSpring(blY, { stiffness: 180, damping: 22 });
  const brXSpring = useSpring(brX, { stiffness: 180, damping: 22 });
  const brYSpring = useSpring(brY, { stiffness: 180, damping: 22 });

  const rafRef = useRef<number | null>(null);
  const lastMouse = useRef({ px: 0.5, py: 0.5 });

  function computeCornerRotation(
    px: number,
    py: number,
    cx: number,
    cy: number
  ) {
    const dx = px - cx;
    const dy = py - cy;
    const d = Math.sqrt(dx * dx + dy * dy);

    const influence = Math.max(0, 1 - d * 1.8);

    const mag = 22 * influence;

    const rotateX = -((cy === 0 ? 1 : -1) * (0.5 - py) * mag);
    const rotateY = -((cx === 0 ? -1 : 1) * (px - 0.5) * mag);

    return { rotateX, rotateY };
  }

  function updateOrbs() {
    const { px, py } = lastMouse.current;

    const tl = computeCornerRotation(px, py, 0, 0);
    const tr = computeCornerRotation(px, py, 1, 0);
    const bl = computeCornerRotation(px, py, 0, 1);
    const br = computeCornerRotation(px, py, 1, 1);

    tlX.set(tl.rotateX);
    tlY.set(tl.rotateY);
    trX.set(tr.rotateX);
    trY.set(tr.rotateY);
    blX.set(bl.rotateX);
    blY.set(bl.rotateY);
    brX.set(br.rotateX);
    brY.set(br.rotateY);

    rafRef.current = null;
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    lastMouse.current = {
      px: Math.min(1, Math.max(0, px)),
      py: Math.min(1, Math.max(0, py)),
    };

    if (rafRef.current === null)
      rafRef.current = requestAnimationFrame(updateOrbs);
  };

  const handleMouseLeave = () => {
    tlX.set(0);
    tlY.set(0);
    trX.set(0);
    trY.set(0);
    blX.set(0);
    blY.set(0);
    brX.set(0);
    brY.set(0);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center  p-8">
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={900}
        scale={1.02}
        transitionSpeed={420}
        glareEnable={true}
        glareMaxOpacity={0.12}
        glareColor="#ffffff"
        glarePosition="all"
        className="w-full max-w-xl"
      >
        {/* main card — we still track mouse inside this element for corners */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative rounded-3xl p-10 overflow-hidden
                     bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-800
                     shadow-2xl text-white"
        >
          {/* decorative corner orbs (pointer-events-none so they don't block hover) */}
          <motion.div
            style={{ rotateX: tlXSpring, rotateY: tlYSpring }}
            className="pointer-events-none absolute -left-3 -top-3 w-12 h-12 rounded-full
                       bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg
                       transform-gpu"
          >
            <div className="w-7 h-7 rounded-md bg-white/8 border border-white/20" />
          </motion.div>

          <motion.div
            style={{ rotateX: trXSpring, rotateY: trYSpring }}
            className="pointer-events-none absolute -right-3 -top-3 w-12 h-12 rounded-full
                       bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg
                       transform-gpu"
          >
            <div className="w-7 h-7 rounded-md bg-white/8 border border-white/20" />
          </motion.div>

          <motion.div
            style={{ rotateX: blXSpring, rotateY: blYSpring }}
            className="pointer-events-none absolute -left-3 -bottom-3 w-12 h-12 rounded-full
                       bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg
                       transform-gpu"
          >
            <div className="w-7 h-7 rounded-md bg-white/8 border border-white/20" />
          </motion.div>

          <motion.div
            style={{ rotateX: brXSpring, rotateY: brYSpring }}
            className="pointer-events-none absolute -right-3 -bottom-3 w-12 h-12 rounded-full
                       bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg
                       transform-gpu"
          >
            <div className="w-7 h-7 rounded-md bg-white/8 border border-white/20" />
          </motion.div>

          {/* subtle inner dotted border */}
          <div className="absolute inset-0 rounded-3xl border border-white/20 border-dashed pointer-events-none" />

          {/* content */}
          <div className={`${caveat.className} relative z-10 text-center`}>
            <h2 className="text-4xl font-bold mb-3 drop-shadow-md bg-gradient-to-r shadow-xl rounded-2xl from-black/20 via-black/50 to-black/90 w-fit mx-auto py-1   px-3">
              There are no tasks {taskCount > 0 ? "in this category" : "at all"}
              .
            </h2>
            <p className="text-2xl opacity-90 mb-8">
              Start by adding one from the upper box
              <br /> it &apos; ll show up here.
            </p>

            <motion.button
              onClick={() => {
                const input = document.getElementById("task-title");
                if (input) {
                  input.scrollIntoView({ behavior: "smooth", block: "center" });
                  (input as HTMLElement).focus();
                }
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-300 px-5 py-3 rounded-full font-semibold shadow-md dark:shadow-indigo-900/20 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <AiOutlinePlusCircle className="w-5 h-5" />
              Add Task
            </motion.button>
          </div>
        </motion.div>
      </Tilt>
    </div>
  );
}
