"use client";

import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";

import CreateFoodEventForm from "./createFoodEventForm";
import OutputFoodEvent from "./outputFoodEvent";
import { deleteFoodEvent } from "./userFoodEventActions";

type FoodEvent = Schema["FoodEvent"]["type"];

export default function FoodEvents() {
  const client = generateClient<Schema>();
  const [foodData, setFoodData] = useState<FoodEvent[]>(); // Use useState to manage foodData
  const [deleteFoodEventId, setDeleteFoodEventId] = useState<string | null>(
    null,
  );

  const fetchData = async () => {
    try {
      const { data, errors } = await client.models.FoodEvent.list();
      if (!errors) {
        setFoodData(data);
      } else {
        console.error(errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (eventID: string) => {
    setDeleteFoodEventId(eventID);
    try {
      await deleteFoodEvent(eventID);
      const newFoodData = foodData?.filter((event) => event.id !== eventID);
      setFoodData(newFoodData);
    } catch (error) {
      console.error("Failed to delete Food Event", error);
    }
  };

  return (
    <div className="w-full bg-medium-grey py-8">
      <div className="m-6 rounded-md bg-white px-10 pb-10">
        <CreateFoodEventForm fetchData={fetchData} />
        <OutputFoodEvent
          foodData={foodData}
          handleDelete={handleDelete}
          deleteFoodEventId={deleteFoodEventId}
        />
      </div>
    </div>
  );
}
