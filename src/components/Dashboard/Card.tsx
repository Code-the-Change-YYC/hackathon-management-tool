import { twMerge } from "tailwind-merge";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex w-full flex-col items-center justify-center rounded-xl bg-white p-4 py-6 text-center shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
