"use client";
import { useModalStore } from "@/lib/store/modalStore";
import { AnimatePresence } from "motion/react";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import DeleteModal from "@/components/ui/modals/deleteModal/DeleteModal";
import Header from "@/components/header/Header";

function LayoutDesign({ children }: { children: ReactNode }) {
  const { isModalOpen } = useModalStore((state) => state);
  return (
    <div className=" w-screen flex flex-col">
      <Header />
      <main className=" flex flex-col gap-6 h-full  ">{children}</main>
      <AnimatePresence>{isModalOpen && <DeleteModal />}</AnimatePresence>
      <ToastContainer />
    </div>
  );
}

export default LayoutDesign;
