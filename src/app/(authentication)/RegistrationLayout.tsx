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
      className="w-full"
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
        "flex w-full flex-1 flex-col items-center overflow-hidden pt-6",
        bgColor,
      )}
    >
      <div className="flex w-11/12 max-w-screen-2xl flex-1 flex-col items-center md:w-9/12 ">
        {/* <Header /> */}
        {header}
        <div className="relative w-full ">
          <Image
            className="absolute -right-28 top-0"
            src={"/svgs/login/Star_Icon.svg"}
            height={51}
            width={59}
            alt={""}
          />
          <Image
            className="absolute -left-28 bottom-0"
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
