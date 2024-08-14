import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

export function SuspenseWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Suspense
      fallback={
        <div className={twMerge("size-full", className)}>
          <Skeleton height={"100%"} />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
