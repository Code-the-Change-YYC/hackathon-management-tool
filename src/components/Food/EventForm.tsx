"use client";

import FoodEventCreateForm from "@/../ui-components/FoodEventCreateForm";
import { createFoodEvent } from "@/app/admin/food-tickets/actions";

export default function EventForm() {
  return <FoodEventCreateForm onSubmit={createFoodEvent}></FoodEventCreateForm>;
}
