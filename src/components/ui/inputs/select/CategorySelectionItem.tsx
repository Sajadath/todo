"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface CategorySelectionItemProps {
  category: { categoryId: string; name: string };
  itemIsSelected: boolean;
  handleSelect: (categoryId: string, name: string) => void;
}

const CategorySelectionItem: React.FC<CategorySelectionItemProps> = ({
  category,
  itemIsSelected,
  handleSelect,
}) => {
  const [isBeingHovered, setIsBeingHovered] = useState(false);
  return (
    <motion.li
      onMouseEnter={() => {
        setIsBeingHovered(true);
      }}
      onMouseLeave={() => {
        setIsBeingHovered(false);
      }}
      key={category.categoryId}
      className={`relative px-3 py-2 text-sm cursor-pointer  ${
        itemIsSelected
          ? " bg-indigo-600 dark:bg-indigo-500 text-gray-200 dark:text-gray-200"
          : "text-gray-700 dark:text-gray-200"
      }`}
      onClick={() => handleSelect(category.categoryId, category.name)}
      transition={{ duration: 0.1 }}
    >
      {category.name}
      <AnimatePresence>
        {isBeingHovered && (
          <motion.span
            layoutId="hoveringSelectCategoryIndicator"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="border-2  border-indigo-200  absolute top-0 left-0 right-0 bottom-0"
          />
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default CategorySelectionItem;
