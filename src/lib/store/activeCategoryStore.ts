import { create } from "zustand";

export type ActiveCategory = {
  categoryId: string;
  name: string;
};

type ActiveCategoryStore = {
  activeCategory: ActiveCategory;
  setActiveCategory: (category: ActiveCategory) => void;
};

export const activeCategoryStore = create<ActiveCategoryStore>((set) => ({
  activeCategory: { categoryId: "All", name: "All" },
  setActiveCategory: (category) => set({ activeCategory: category }),
}));

export const useActiveCategoryStore = activeCategoryStore;
