"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function CountdownTimer({
  name,
  value,
  className,
}: {
  name?: string;
  value: React.ReactNode;
  className?: string;
}) {
  // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return (
    <div
      className={twMerge(
        " relative flex aspect-square w-20 flex-col items-center justify-center rounded-lg bg-awesome-purple p-2 text-white sm:w-24 sm:p-8 md:w-36",
        className,
      )}
    >
      <div
        className={
          "relative flex items-center justify-center text-4xl font-bold uppercase sm:text-5xl md:text-6xl lg:text-8xl"
        }
      >
        {value}
        <div className="absolute -bottom-5 flex flex-col items-center justify-center text-center text-sm uppercase sm:text-xl md:-bottom-8 lg:text-2xl">
          {name}
        </div>
      </div>
      <div
        className={
          "absolute inset-x-0 top-[55%] -translate-y-1/2 border-b-2 border-white/95 "
        }
      />
    </div>
  );
}

export default CountdownTimer;
