import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

//import FoodEventCreateForm from "@../../../ui-components/FoodEventCreateForm";
import { type Schema } from "@/amplify/data/resource";

const DELETE_STYLES =
  "bg-awesomer-purple px-5 py-2 mt-6 mb-3 text-white rounded-md hover:bg-[#A689FF]";

type FoodEvent = Schema["FoodEvent"]["type"];

type OutputFoodEventProps = {
  foodData: any; //tried making type as FoodEvent[] but didn't work;
  handleDelete: (eventId: string) => Promise<void>;
  deleteFoodEventId: string | null;
};

const OutputFoodEvent = ({
  handleDelete,
  foodData,
  deleteFoodEventId,
}: OutputFoodEventProps) => {
  return (
    <div>
      {foodData && foodData.length > 0 && (
        <h2 className="my-6 text-xl font-bold">Display created food events:</h2>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {foodData !== undefined &&
          foodData.map((event: FoodEvent) => (
            <div
              key={event.id}
              className="w-auto rounded-lg border border-slate-100 bg-white p-6 shadow-md"
            >
              <h3 className="py-3 text-lg font-semibold">{event.name}</h3>
              <p className="text-sm">
                <strong> Description:</strong> {event.description}
              </p>
              <p className="text-sm">
                <strong>Start of food event:</strong>{" "}
                {event.start ? new Date(event.start).toLocaleString() : ""}
              </p>
              <p className="text-sm">
                <strong>End of food event:</strong>
                {event.end ? new Date(event.end).toLocaleString() : ""}
              </p>
              <p className="text-sm">
                <strong>Total group count:</strong> {event.totalGroupCount}
              </p>
              <p className="text-sm">
                <strong>Created At:</strong>{" "}
                {new Date(event.createdAt).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Updated At:</strong>{" "}
                {new Date(event.updatedAt).toLocaleString()}
              </p>
              <button
                className={DELETE_STYLES}
                onClick={() => handleDelete(event.id)}
              >
                {deleteFoodEventId === event.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OutputFoodEvent;
