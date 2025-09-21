import { create } from "zustand";
import { type Task } from "./taskStore";

type ModalStore = {
  isModalOpen: boolean;
  taskInfo: Task | null;
  deleteFn: (() => void) | null;
  setDeleteFn: (fn: () => void) => void;
  openModal: (taskInfo: Task) => void;
  closeModal: () => void;
};
export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  taskInfo: null,
  deleteFn: null,
  setDeleteFn: (fn) => set({ deleteFn: fn }),
  openModal: (taskInfo) => set({ isModalOpen: true, taskInfo }),
  closeModal: () => set({ isModalOpen: false }),
}));
