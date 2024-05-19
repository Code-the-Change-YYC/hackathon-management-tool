"use client";

import FoodEventCreateForm from "@/../ui-components/FoodEventCreateForm";
import { createFoodEvent } from "@/app/admin/food-tickets/actions";

export default function EventForm() {
  // FIXME: No idea why there is a TypeScript error here, everything works fine though.
  return <FoodEventCreateForm onSubmit={createFoodEvent}></FoodEventCreateForm>;
}
