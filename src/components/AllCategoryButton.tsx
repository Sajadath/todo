import { ActiveCategory } from "@/lib/store/activeCategoryStore";
import { type Category } from "@/lib/store/taskStore";
import { motion } from "motion/react";

export default function AllCategoryButton({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: Category;
  setActiveCategory: (category: ActiveCategory) => void;
}) {
  return (
    <nav className="mt-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 flex-wrap">
        <button
          key={"AllCategoryButton"}
          onClick={() => setActiveCategory({ categoryId: "All", name: "All" })}
          className={`px-3 py-1.5 relative  rounded-full transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300   ${
            activeCategory.categoryId === "All"
              ? "text-white"
              : " text-card-foreground"
          }`}
          aria-pressed={activeCategory.categoryId === "All"}
        >
          All
          {activeCategory.categoryId === "All" && (
            <motion.div
              layoutId={`category-indicator`}
              className={`absolute inset-0 rounded-full -z-1 bg-indigo-600
                `}
            />
          )}
        </button>
      </div>
    </nav>
  );
}
