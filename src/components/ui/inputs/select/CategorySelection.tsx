"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import CategorySelectionItem from "@/components/ui/inputs/select/CategorySelectionItem";
import MobileCategoryDrawer from "./MobileCategoryDrawer"; // Import the new component

interface CategorySelectionProps {
  categories: { categoryId: string; name: string }[];
  selectedCategoryId: string | null;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
}

function CategorySelection({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategorySelectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // New state for mobile detection
  const [selectedLabel, setSelectedLabel] = useState<string | null>(
    selectedCategoryId
      ? categories.find((cat) => cat.categoryId === selectedCategoryId)?.name ||
          null
      : "Select a category"
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outSideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };

    window.addEventListener("click", outSideClick);

    return () => window.removeEventListener("click", outSideClick);
  }, [isOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 560);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      setSelectedLabel(
        categories.find((cat) => cat.categoryId === selectedCategoryId)?.name ||
          "Select a category"
      );
    } else {
      setSelectedLabel("Select a category");
    }
  }, [selectedCategoryId, categories]);

  const handleSelect = (categoryId: string, name: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedLabel(name);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-[15rem]" ref={selectRef}>
      <motion.div
        className={`flex items-center justify-between px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border  rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200
          ${
            isOpen
              ? "border-indigo-500 dark:border-indigo-400"
              : "border-gray-300 dark:border-gray-700"
          }`}
        onClick={() =>
          isMobile ? setIsOpen(true) : setIsOpen((prevOpen) => !prevOpen)
        }
      >
        <span
          className={`${
            selectedLabel !== "Select a category"
              ? "text-indigo-600 dark:text-indigo-400"
              : ""
          } text-xs font-semibold dark:text-gray-200`}
        >
          {selectedLabel}
        </span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 dark:text-gray-200"
          viewBox="0 0 20 20"
          fill="currentColor"
          animate={{ rotate: isOpen && !isMobile ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </motion.svg>
      </motion.div>

      {!isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {categories.map((category) => (
                <CategorySelectionItem
                  key={category.categoryId}
                  category={category}
                  handleSelect={handleSelect}
                  itemIsSelected={selectedCategoryId === category.categoryId}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}

      {isMobile && (
        <MobileCategoryDrawer
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default CategorySelection;
