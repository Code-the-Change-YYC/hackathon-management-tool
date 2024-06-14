import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { Flex } from "@aws-amplify/ui-react";

export default function FormFieldsHeader({
  className,
}: {
  className?: string;
}) {
  const pathName = usePathname();
  return (
    <div
      className={twMerge(
        "relative ml-4 mt-4 flex flex-col justify-center bg-white px-8" +
          className,
      )}
    >
      <Image
        className="absolute -right-28 top-0"
        src={"/svgs/login/Star_Icon.svg"}
        height={51}
        width={59}
        alt={""}
      />{" "}
      <Image
        className="absolute -left-28 bottom-0"
        src={"/svgs/login/Star_Icon.svg"}
        height={51}
        width={59}
        alt={""}
      />
      <div className="text-lg font-semibold md:text-2xl xl:text-4xl">
        <Flex direction={"column"}>
          <Flex>
            <Image
              className=" pointer-events-none -mr-2 select-none"
              src="/svgs/login/vector_112.svg"
              alt=""
              width={28}
              height={21}
            />
            <div className=" text-nowrap text-black">
              {pathName === "/register" ? "Individual Registration" : "Login"}
            </div>
          </Flex>
          <Image
            src="/svgs/login/vector_113.svg"
            alt=""
            className="-mt-4 ml-8"
            width={130}
            height={17}
          />
        </Flex>
      </div>
    </div>
  );
}
