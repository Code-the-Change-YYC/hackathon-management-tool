import { usePathname } from "next/navigation";

import { Underline } from "@/utils/text-utils";

export default function FormFieldsHeader() {
  const pathName = usePathname();
  return (
    <div className="ml-4 mt-4 flex items-center justify-center sm:items-start sm:justify-start">
      <div className=" w-fit text-2xl font-semibold xl:text-4xl">
        <div className="flex flex-row gap-4">
          <Underline>
            {pathName === "/register" ? "Individual Registration" : "Login"}
          </Underline>
        </div>
      </div>
    </div>
  );
}
