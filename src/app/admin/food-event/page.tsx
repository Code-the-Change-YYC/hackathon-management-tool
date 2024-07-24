"use client";

// THIS PAGE IS A SAMPLE, PLEASE REPLACE IT AND IMPROVE IT FROM HERE
//import { generateClient } from "aws-amplify/data";
//import { useEffect, useState } from "react";
//import { type Schema } from "@/amplify/data/resource";
import CreateFoodEventForm from "./createFoodEventForm";
import OutputFoodEvent from "./outputFoodEvent";

//import FoodEventCreateForm from "@../../../ui-components/FoodEventCreateForm";
//import { type Schema } from "@/amplify/data/resource";

//import { deleteFoodEvent } from "./userFoodEventActions";

// const DELETE_STYLES =
//   "bg-awesomer-purple px-5 py-2 my-2 text-white rounded-md hover:bg-[#A689FF]";

// type FoodEvent = Schema["FoodEvent"]["type"];

export default function AdminFoodEvents() {
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

  return (
    <div className="w-full bg-medium-grey py-8">
      <div className="m-6 rounded-md bg-white px-10 pb-10">
        {/* FoodEventCreateForm is the temporary form used, use a new component later on*/}
        {/* @ts-ignore - Temporarily since this will all be replaced */}
        {/* <FoodEventCreateForm onSubmit={createFoodEvent} /> */}
        <CreateFoodEventForm />
        <OutputFoodEvent />
      </div>
    </div>
  );
}
