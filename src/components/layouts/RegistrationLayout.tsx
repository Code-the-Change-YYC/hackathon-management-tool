import Image from "next/image";
import { twMerge } from "tailwind-merge";

import Header from "@/components/LoginForm/Header";

export default function RegistrationLayout({
  children,
  header = <Header />,
  bgColor = "bg-awesomer-purple",
  footer = (
    <Image
      src={"/svgs/login/Events_vector.svg"}
      className="pointer-events-none w-full select-none"
      height={207}
      width={1485}
      alt={""}
    />
  ),
}: {
  children: React.ReactNode;
  bgColor?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div
      className={twMerge(
        "flex w-full flex-1 flex-col items-center justify-center overflow-hidden pt-6",
        bgColor,
      )}
    >
      <div className="flex w-11/12 max-w-screen-2xl flex-1 flex-col items-center md:w-9/12 ">
        {header}
        <div className="relative flex w-full flex-col items-center ">
          <Image
            className="pointer-events-none absolute -right-28 top-0 select-none"
            src={"/svgs/login/Star_Icon.svg"}
            height={51}
            width={59}
            alt={""}
          />
          <Image
            className="pointer-events-none absolute -left-28 bottom-0 select-none"
            src={"/svgs/login/Star_Icon.svg"}
            height={51}
            width={59}
            alt={""}
          />
          {children}
        </div>
      </div>
      {footer}
    </div>
  );
}
