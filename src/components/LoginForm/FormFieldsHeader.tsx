import { usePathname } from "next/navigation";
import { Underline } from "@/utils/text-utils";

export default function FormFieldsHeader() {
  const pathName = usePathname();
  return (
    <div className="ml-4 mt-4 text-2xl font-semibold xl:text-3xl">
      <Underline>
        {pathName === "/register" ? "Individual Registration" : "Login"}
      </Underline>
    </div>
  );
}
