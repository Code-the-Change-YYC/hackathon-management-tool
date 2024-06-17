"use client";

import { deleteFoodEvent } from "@/components/actions/userFoodTicketActions";

export default function DeleteButton({ eventId }: { eventId: string }) {
  const handleDelete = async () => {
    await deleteFoodEvent(eventId);
  };

  return <button onClick={handleDelete}>Delete this event</button>;
}
