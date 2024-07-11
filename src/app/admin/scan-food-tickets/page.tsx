"use client";

import { generateClient } from "aws-amplify/data";
import React from "react";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import TicketVerification from "@/app/admin/scan-food-tickets/TicketVerification/TicketVerification";

type FoodEvent = Schema["FoodEvent"]["type"];

const ScanFoodTickets = () => {
  const client = generateClient<Schema>();
  const [foodData, setFoodData] = useState<FoodEvent[]>();

  useEffect(() => {
    async function fetchData() {
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
      <div className="h-full bg-[#d9d9d9]">
        <div className>
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
    </>
  );
};

export default ScanFoodTickets;
