"use client";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../app/globals.css";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer transition={Bounce} />
    </>
  );
}
