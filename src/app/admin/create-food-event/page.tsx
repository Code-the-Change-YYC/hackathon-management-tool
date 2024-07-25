"use client";

import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import DeletePopUp from "./DeletePopUp";
import CreateFoodEventForm from "./createFoodEventForm";
import OutputFoodEvent from "./outputFoodEvent";
import { deleteFoodEvent } from "./userFoodEventActions";

const LOADING_SCREEN_STYLES =
  "flex h-screen w-full items-center justify-center bg-awesome-purple";

const client = generateClient<Schema>();

export default function FoodEvents() {
  // type FoodEvent = Schema["FoodEvent"]["type"];
  // const [foodData, setFoodData] = useState<FoodEvent[]>(); // Use useState to manage foodData
  // const [foodData, setFoodData] = useState<
  //   Array<Partial<Schema["FoodEvent"]["type"]>>
  // >([]); // Use useState to manage foodData
  const [deleteFoodEventId, setDeleteFoodEventId] = useState<string | null>(
    null,
  );
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const queryClient = useQueryClient();

  const { data: foodData, isFetching } = useQuery({
    initialData: [],
    initialDataUpdatedAt: 0,
    queryKey: ["FoodEvent"],
    queryFn: async () => {
      const response = await client.models.FoodEvent.list({
        selectionSet: [
          "name",
          "description",
          "start",
          "end",
          "totalGroupCount",
        ],
      });
      // setFoodData(response.data);

      return response.data;
    },
  });

  // const fetchData = async () => {
  //   try {
  //     const { data, errors } = await client.models.FoodEvent.list();
  //     if (!errors) {
  //       setFoodData(data);
  //     } else {
  //       console.error(errors);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    foodData;
  }, []);

  const handleDeletePopUp = (eventID: string) => {
    setDeleteFoodEventId(eventID);
    setShowDeletePopup(true);
  };

  const handleClosePopUp = () => {
    setShowDeletePopup(false);
    setDeleteFoodEventId(null); // Reset deleteFoodEventId if popup is closed
  };

  const handleDelete = async () => {
    try {
      await deleteFoodEvent(deleteFoodEventId as string);
      queryClient.invalidateQueries({ queryKey: ["FoodEvent"] });

      // const newFoodData = foodData?.filter(
      //   (event) => event.id !== deleteFoodEventId,
      // );
      // setFoodData(newFoodData);
      setShowDeletePopup(false);
    } catch (error) {
      console.error("Failed to delete Food Event", error);
    }
  };

  return (
    <div>
      {isFetching ? (
        <div className={LOADING_SCREEN_STYLES}>
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        <div className="w-full bg-medium-grey py-8">
          <div className="m-6 rounded-md bg-white px-10 pb-10">
            <CreateFoodEventForm />
            <OutputFoodEvent
              foodData={foodData}
              handleDeletePopUp={handleDeletePopUp}
              deleteFoodEventId={deleteFoodEventId ?? ""}
            />
            <DeletePopUp
              isPopUpVisible={showDeletePopup}
              onClose={handleClosePopUp}
              handleDelete={handleDelete}
              deleteFoodEventId={deleteFoodEventId ?? ""}
            />
          </div>
        </div>
      )}
    </div>
  );
}
