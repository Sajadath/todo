"use client";

import { motion, AnimatePresence } from "framer-motion";
import CategorySelectionItem from "./CategorySelectionItem";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface MobileCategoryDrawerProps {
  categories: { categoryId: string; name: string }[];
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCategoryId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

function MobileCategoryDrawer({
  categories,
  setSelectedCategoryId,
  selectedCategoryId,
  isOpen,
  onClose,
}: MobileCategoryDrawerProps) {
  const handleSelect = (categoryId: string, name: string) => {
    setSelectedCategoryId(categoryId);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      // Lock scroll
      document.body.style.overflow = "hidden";
    } else {
      // Unlock scroll
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 inset-0 z-40 bg-white/5 dark:bg-black/30  bg-opacity-50 backdrop-blur-sm "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-2xl shadow-sm p-5 overflow-y-auto max-h-[80vh] border-t border-t-gray-200 dark:border-t-gray-800"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 ">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 ">
                Select a category
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className=" mx-auto text-center  max-h-[40vh] max-w-[90%] overflow-y-auto">
              {categories.map((category) => (
                <CategorySelectionItem
                  key={category.categoryId}
                  category={category}
                  handleSelect={handleSelect}
                  itemIsSelected={selectedCategoryId === category.categoryId}
                />
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default MobileCategoryDrawer;
