import CheckUserLoggedIn from "@/components/CheckUserLoggedIn";
import { SuspenseWrapper } from "@/components/SuspenseWrapper";
import UserTablePage from "./UserTablePage";

export const dynamic = "force-dynamic";

export const revalidate = 0;
export default function Users() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto bg-dashboard-grey p-4 text-3xl ">
      <CheckUserLoggedIn>
        <SuspenseWrapper>
          <UserTablePage />
        </SuspenseWrapper>
      </CheckUserLoggedIn>
    </div>
  );
}
