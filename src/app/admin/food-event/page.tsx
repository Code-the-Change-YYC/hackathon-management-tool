"use client";

import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";

import CreateFoodEventForm from "./createFoodEventForm";
import OutputFoodEvent from "./outputFoodEvent";
//import FoodEventCreateForm from "@../../../ui-components/FoodEventCreateForm";
import { deleteFoodEvent } from "./userFoodEventActions";

type FoodEvent = Schema["FoodEvent"]["type"];

export default function FoodEvents() {
  // const client = generateClient<Schema>();

  // const [foodData, setFoodData] = useState<FoodEvent[]>(); // Use useState to manage foodData

  // useEffect(() => {
  //   async function fetchData() {
  //     const { data, errors } = await client.models.FoodEvent.list();
  //     if (!errors) {
  //       setFoodData(data); // Update state with fetched data
  //     } else {
  //       console.error(errors);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const client = generateClient<Schema>();
  const [foodData, setFoodData] = useState<FoodEvent[]>(); // Use useState to manage foodData
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      const { data, errors } = await client.models.FoodEvent.list();
      if (!errors) {
        setFoodData(data); // Update state with fetched data
      } else {
        console.error(errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isDeleting]); // Re-fetch data when isDeleting state changes

  const handleDelete = async (eventID: string) => {
    // await deleteFoodEvent(event.id);
    await deleteFoodEvent(eventID);
    setIsDeleting(true);
  };

  return (
    <div className="w-full bg-medium-grey py-8">
      <div className="m-6 rounded-md bg-white px-10 pb-10">
        {/* FoodEventCreateForm is the temporary form used, use a new component later on*/}
        {/* @ts-ignore - Temporarily since this will all be replaced */}
        {/* <FoodEventCreateForm onSubmit={createFoodEvent} /> */}
        <CreateFoodEventForm fetchData={fetchData} />
        <OutputFoodEvent
          foodData={foodData}
          handleDelete={handleDelete}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}
