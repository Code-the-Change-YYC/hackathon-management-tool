"use client";

// THIS PAGE IS A SAMPLE, PLEASE REPLACE IT AND IMPROVE IT FROM HERE
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import FoodEventCreateForm from "@../../../ui-components/FoodEventCreateForm";
import { type Schema } from "@/amplify/data/resource";

import CreateFoodTicketForm from "./createFoodTicketForm";
import { createFoodEvent, deleteFoodEvent } from "./userFoodTicketActions";

// const HEADER_STYLES = "text-lg";
// const INPUT_STYLES = "rounded-md border w-full p-4 my-1 border-2";
// const SUBMIT_STYLES =
//   "bg-awesomer-purple p-4 w-full my-1 text-white rounded-md hover:bg-[#A689FF]";

type FoodEvent = Schema["FoodEvent"]["type"];

export default function AdminFoodTickets() {
  const client = generateClient<Schema>();

  const [foodData, setFoodData] = useState<FoodEvent[]>(); // Use useState to manage foodData

  useEffect(() => {
    async function fetchData() {
      const { data, errors } = await client.models.FoodEvent.list();
      if (!errors) {
        setFoodData(data); // Update state with fetched data
      } else {
        console.error(errors);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="m-6 rounded-md bg-white">
        {/* FoodEventCreateForm is the temporary form used, use a new component later on*/}
        {/* @ts-ignore - Temporarily since this will all be replaced */}
        <FoodEventCreateForm onSubmit={createFoodEvent} />
        <CreateFoodTicketForm />
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          {foodData !== undefined &&
            foodData.map((event: FoodEvent) => (
              <div
                key={event.id}
                className="w-auto rounded-lg bg-white p-6 shadow-md"
              >
                <button onClick={() => deleteFoodEvent(event.id)}>
                  Delete this event
                </button>
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-sm">
                  <strong>Start:</strong>{" "}
                  {event.start ? new Date(event.start).toLocaleString() : ""}
                </p>
                <p className="text-sm">
                  <strong>End:</strong>
                  {event.end ? new Date(event.end).toLocaleString() : ""}
                </p>
                <p className="text-sm">
                  <strong>Groups:</strong> {event.totalGroupCount}
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
    </div>
  );
}
