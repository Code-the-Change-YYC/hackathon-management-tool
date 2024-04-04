"use client";

import { deleteFoodEvent } from "@/app/admin/food-tickets/actions";

export default function DeleteButton({ eventId }) {
  const handleDelete = async () => {
    // Call your delete function here
    await deleteFoodEvent(eventId);
  };

  return <button onClick={handleDelete}>Delete this event</button>;
}
