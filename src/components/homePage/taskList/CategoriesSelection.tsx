import { ActiveCategory } from "@/lib/store/activeCategoryStore";
import { type Category } from "@/lib/store/taskStore";
import { motion } from "motion/react";

export default function CategoriesSelection({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: Category[];
  activeCategory: Category;
  setActiveCategory: (category: ActiveCategory) => void;
}) {
  return (
    <nav className="mt-4">
      <div className="max-w-4xl  px-2 sm:px-6 lg:px-8 flex gap-2 flex-wrap">
        {categories.length > 0 &&
          categories.map((category) => (
            <button
              key={category.categoryId}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 relative  rounded-full transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-800   ${
                activeCategory.categoryId === category.categoryId
                  ? "text-white"
                  : " text-card-foreground"
              }`}
              aria-pressed={activeCategory.categoryId === category.categoryId}
            >
              {category.name}
              {activeCategory.categoryId === category.categoryId && (
                <motion.div
                  layoutId={`category-indicator`}
                  className={`absolute inset-0 rounded-full -z-1 bg-indigo-600 dark:bg-indigo-500
                `}
                />
              )}
            </button>
          ))}
      </div>
    </nav>
  );
}
