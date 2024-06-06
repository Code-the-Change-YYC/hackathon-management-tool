import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FormFieldsHeader() {
  const pathName = usePathname();
  return (
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
  );
}
