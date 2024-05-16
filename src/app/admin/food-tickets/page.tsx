"use client";

import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import FoodEventCreateForm from "@/../ui-components/FoodEventCreateForm";
import { type Schema } from "@/amplify/data/resource";

type FoodEvent = Schema["FoodEvent"]["type"];

export default function AdminFoodTickets() {
  const client = generateClient<Schema>();

  const [foodData, setFoodData] = useState<FoodEvent[]>(); // Use useState to manage foodData

  useEffect(() => {
    async function fetchData() {
      console.log(foodData);
      const { data, errors } = await client.models.FoodEvent.list();
      if (!errors) {
        setFoodData(data); // Update state with fetched data
      } else {
        console.error(errors); // Log errors if any
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log(foodData);
  }, [foodData]);

  async function deleteFoodEvent(eventID: string) {
    const toBeDeletedFoodEvent = {
      id: eventID,
    };
    const { errors } =
      await client.models.FoodEvent.delete(toBeDeletedFoodEvent);

    if (errors) {
      console.log(errors);
    }
  }

  return (
    <div>
      <FoodEventCreateForm />
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {foodData !== undefined &&
          foodData.map((event: any) => (
            <div
              key={event.id}
              className="w-auto rounded-lg bg-white p-6 shadow-md"
            >
              <button onClick={() => deleteFoodEvent(event.id)}>
                Delete this event
              </button>
              ;<h3 className="text-lg font-semibold">{event.Name}</h3>
              <p className="text-sm text-gray-600">{event.Description}</p>
              <p className="text-sm">
                <strong>Start:</strong>{" "}
                {new Date(event?.Start).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>End:</strong> {new Date(event?.End).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Groups:</strong> {event.Groups}
              </p>
              <p className="text-sm">
                <strong>Created At:</strong>{" "}
                {new Date(event.createdAt).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Updated At:</strong>{" "}
                {new Date(event.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
