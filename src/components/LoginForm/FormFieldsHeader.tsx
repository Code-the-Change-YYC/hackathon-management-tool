import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function FormFieldsHeader({
  className,
}: {
  className?: string;
}) {
  const pathName = usePathname();
  return (
    <div>
      <div
        className={twMerge(
          "relative flex flex-col justify-center bg-white px-8" + className,
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
      </div>
      <div className="ml-4 mt-4 flex items-center justify-center sm:items-start sm:justify-start">
        <div className=" w-fit text-2xl font-semibold xl:text-4xl">
          <div className="flex flex-row gap-4">
            <Image
              className="pointer-events-none hidden select-none sm:block"
              src="/svgs/login/vector_112.svg"
              alt=""
              width={28}
              height={21}
            />
            <h1 className="min-w-40 text-center sm:text-left">
              {pathName === "/register" ? "Individual Registration" : "Login"}
            </h1>
          </div>
          <div className="relative h-4 w-full min-w-40">
            <Image
              src="/images/register/group_58.png"
              objectFit="contain"
              alt=""
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
