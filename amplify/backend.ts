import { auth } from "@/amplify/auth/resource";
import { data } from "@/amplify/data/resource";
import { getFoodTicket } from "@/amplify/function/BusinessLogic/GetFoodTicket/resource";
import { verifyFoodTicket } from "@/amplify/function/BusinessLogic/VerifyFoodTicket/resource";
import { defineBackend } from "@aws-amplify/backend";

defineBackend({
  auth,
  data,
  getFoodTicket,
  verifyFoodTicket,
});
