"use client";

import Image from "next/image";
import { createPortal } from "react-dom";

import exit_icon from "@/svgs/admin/exit_icon.svg";

export default function Modal({
  onClose,
  children,
}: {
  onClose?: () => void;
  children?: React.ReactNode;
}) {
  return createPortal(
    <dialog
      onClick={() => {
        if (onClose) onClose();
      }}
      onKeyDown={(e) => e.key === "Escape" && onClose && onClose()}
      className="fixed flex size-full items-center justify-center bg-light-grey/40"
    >
      <button className="absolute right-4 top-4" onClick={onClose}>
        <Image src={exit_icon} alt="Exit page icon" width={20} height={20} />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex min-w-96 flex-col gap-2 rounded-md bg-white p-6 outline outline-4 outline-awesomer-purple"
      >
        {children}
      </div>
    </dialog>,
    document.body,
  );
}
