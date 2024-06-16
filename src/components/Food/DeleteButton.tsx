"use client";

import { deleteFoodEvent } from "@/app/admin/food-tickets/actions";

export default function DeleteButton({ eventId }: { eventId: string }) {
  const handleDelete = async () => {
    await deleteFoodEvent(eventId);
  };

  return <button onClick={handleDelete}>Delete this event</button>;
}