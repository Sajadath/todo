import { v4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Category = {
  categoryId: string;
  name: string;
};
export type Categories = Category[];

export type Task = {
  id: string;
  title: string;
  category: Category;
  isCompleted: boolean;
  createdAt: string;
};

type Store = {
  tasks: Task[];

  categories: Categories;

  addTask: (task: Omit<Task, "id" | "isCompleted" | "createdAt">) => void;
  toggleTask: (id: string) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  addCategory: (category: string) => Category;
  deleteCategory: (categoryId: string) => void;
};

export function uidGenerator() {
  return v4();
}

export const useTaskStore = create<Store>()(
  persist(
    (set, get) => ({
      tasks: [],
      categories: [
        { categoryId: "1", name: "Personal" },
        { categoryId: "2", name: "Work" },
      ],

      addTask: (task) =>
        set((state) => ({
          tasks: [
            {
              ...task,
              id: uidGenerator(),
              isCompleted: false,
              createdAt: new Date().toISOString(),
            },
            ...state.tasks,
          ],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
          ),
        })),
      editTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      deleteCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter(
            (cat) => cat.categoryId !== categoryId
          ),
        })),
      addCategory: (categoryName) => {
        const normalize = (str: string) =>
          str.toUpperCase().trim().replace(/\s+/g, " ");
        const state = get();
        const existing = state.categories.find(
          (cat) => normalize(cat.name) === normalize(categoryName)
        );
        if (existing) {
          return existing;
        }
        const newCategory: Category = {
          categoryId: uidGenerator(),
          name: categoryName,
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
        return newCategory;
      },
    }),
    { name: "todo-taskStorage" }
  )
);
