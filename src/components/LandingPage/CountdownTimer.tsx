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
  return (
    <div
      className={twMerge(
        " relative flex flex-col items-center justify-center rounded-lg bg-awesome-purple p-4 text-white sm:p-8",
        className,
      )}
    >
      <div
        className={
          "relative flex items-center justify-center text-4xl font-bold uppercase sm:text-5xl md:text-6xl lg:text-8xl"
        }
      >
        {value}
        <div
          className={
            "absolute -bottom-5 hidden flex-col items-center justify-center text-center text-xl uppercase sm:flex md:-bottom-8"
          }
        >
          {name}
        </div>
      </div>
      <div
        className={
          "absolute inset-x-0 top-[55%] -translate-y-1/2 border-b-2 border-white/95 "
        }
      ></div>
    </div>
  );
}

export default CountdownTimer;
