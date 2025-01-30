import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

function layout({ children }: { children: React.ReactNode }) {
  return children;
}

export default withAuthGuard(layout, [UserType.Admin, UserType.Judge]);
