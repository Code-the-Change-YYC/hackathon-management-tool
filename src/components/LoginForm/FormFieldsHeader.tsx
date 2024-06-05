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
      <div className="size-fit text-lg font-semibold md:text-2xl xl:text-4xl">
        <div className="size-fit">
          <div className="flex flex-row gap-4">
            <Image
              className=" pointer-events-none select-none"
              src="/svgs/login/vector_112.svg"
              alt=""
              width={28}
              height={21}
            />
            <h1 className="min-w-40">
              {pathName === "/register" ? "Individual Registration" : "Login"}
            </h1>
          </div>
          <div className="relative h-4">
            <Image src="/images/register/group_58.png" alt="" fill />
          </div>
        </div>
      </div>
    </div>
  );
}
