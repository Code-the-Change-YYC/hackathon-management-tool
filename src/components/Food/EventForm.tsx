"use client";

import { createFoodEvent } from "@/app/admin/food-tickets/actions";
import FoodEventCreateForm from "@/../ui-components/FoodEventCreateForm";

export default function EventForm() {
  return <FoodEventCreateForm onSubmit={createFoodEvent}></FoodEventCreateForm>
}

