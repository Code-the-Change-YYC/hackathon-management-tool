import UserFoodTicket from "@/components/UserProfile/FoodTicket";
import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

function FoodTicket() {
  return (
    <>
      <UserFoodTicket />
    </>
  );
}

export default withAuthGuard(FoodTicket, [
  UserType.Participant,
  UserType.Admin,
  UserType.Judge,
]);
