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
  const [foodData, setFoodData] = useState<
    Array<Partial<Schema["FoodEvent"]["type"]>>
  >([]);
  const [deleteFoodEventId, setDeleteFoodEventId] = useState<string | null>(
    null,
  );
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const { data, isFetching } = useQuery({
    initialData: [],
    initialDataUpdatedAt: 0,
    queryKey: ["FoodEvents"],
    queryFn: async () => {
      const response = await client.models.FoodEvent.list();

      if (response.errors) throw new Error(response.errors[0].message);

      setFoodData(response.data);

      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      foodData;
    }
  }, [data]);

  const handleDeletePopUp = (eventID: string) => {
    setDeleteFoodEventId(eventID);
    setShowDeletePopup(true);
  };

  const handleClosePopUp = () => {
    setShowDeletePopup(false);
    setDeleteFoodEventId(null); // Reset deleteFoodEventId to null if popup is closed
  };

  const queryClient = useQueryClient();
  const handleDelete = async (deleteFoodEventId: string) => {
    try {
      await deleteFoodEvent(deleteFoodEventId as string);
      const newFoodData = foodData?.filter(
        (event) => event.id !== deleteFoodEventId,
      );
      setFoodData(newFoodData);
      setShowDeletePopup(false);
      queryClient.invalidateQueries({ queryKey: ["FoodEvent"] });
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
