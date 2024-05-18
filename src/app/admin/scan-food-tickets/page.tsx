"use client";

import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { getCalgaryTime } from "@/amplify/function/utils/date";
import TicketVerification from "@/components/Food/TicketVerificationSubmit";

type FoodEvent = Schema["FoodEvent"]["type"];

export default function ScanFoodTickets() {
  const client = generateClient<Schema>();
  const [foodData, setFoodData] = useState<FoodEvent[]>();

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

  return (
    <>
      <TicketVerification></TicketVerification>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {foodData &&
          foodData.map((event) => (
            <div
              key={event.id}
              className="w-auto rounded-lg bg-white p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-sm">
                <strong>ID:</strong> {event?.id}
              </p>
              <p className="text-sm">
                <strong>Start:</strong>{" "}
                {event.start
                  ? getCalgaryTime(event.start).toLocaleString()
                  : ""}
              </p>
              <p className="text-sm">
                <strong>End:</strong>
                {event.end ? getCalgaryTime(event.end).toLocaleString() : ""}
              </p>
              <p className="text-sm">
                <strong>Groups:</strong> {event.groups}
              </p>
              <p className="text-sm">
                <strong>Created At:</strong>{" "}
                {getCalgaryTime(event.createdAt).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Updated At:</strong>{" "}
                {getCalgaryTime(event.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
