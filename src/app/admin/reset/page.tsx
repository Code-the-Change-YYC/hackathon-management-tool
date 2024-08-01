import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";
import ResetPage from "@/components/reset/ResetPage";

function Reset() {
  return (
    <main className="w-full bg-medium-grey">
      <ResetPage />
    </main>
  );
}

export default withAuthGuard(Reset, [UserType.Admin]);
