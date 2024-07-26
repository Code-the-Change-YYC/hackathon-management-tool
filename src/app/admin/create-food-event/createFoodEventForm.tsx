"use client";

import { DateTime } from "luxon";
import { SubmitHandler, useForm } from "react-hook-form";

import { type Schema } from "@/amplify/data/resource";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFoodEvent } from "./userFoodEventActions";

const HEADER_STYLES = "text-2xl my-8";
const INPUT_STYLES =
  "rounded-lg border w-full p-3 my-2 border-2 border-[#A689FF] focus:bg-[#ede9fe] ";
const SUBMIT_STYLES =
  "bg-awesomer-purple px-5 py-3 text-white rounded-md hover:bg-[#A689FF]";
const CLEAR_STYLES =
  "bg-white px-5 py-3 text-black rounded-md border border-[#94a3b8] hover:bg-[#eae5fa] hover:text-[#7055fd]";

type CreateFoodEventFormProps = {
  foodData: Array<Partial<Schema["FoodEvent"]["type"]>>;
};

const CreateFoodTicketForm = ({ foodData }: CreateFoodEventFormProps) => {
  const queryClient = useQueryClient();
  //register input fields to react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Schema["FoodEvent"]["type"]>();

  const foodEventMutation = useMutation({
    mutationFn: createFoodEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["FoodEvent"] });
      reset();
    },
  });
  const onSubmit: SubmitHandler<Schema["FoodEvent"]["type"]> = async (data) => {
    const currentTime = DateTime.now()
      .setZone(process.env.TIME_ZONE)
      .toJSDate(); //current local time in the time zone

    // Parse and validate the start date
    const startDateTime = DateTime.fromISO(data.start, {
      zone: process.env.TIME_ZONE,
    });
    if (!startDateTime.isValid) {
      console.error("Invalid start date & time");
      return;
    }

    // Parse and validate the end date
    const endDateTime = DateTime.fromISO(data.end, {
      zone: process.env.TIME_ZONE,
    });
    if (!endDateTime.isValid) {
      console.error("Invalid end date & time");
      return;
    }

    const formattedData = {
      ...data,
      start: startDateTime.toISO(),
      end: endDateTime.toISO(),
      currentTime,
    };
    console.log(formattedData);
    foodEventMutation.mutate(formattedData);
  };

  return (
    <>
      <div className=" flex min-h-screen flex-col items-center justify-center">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <h1 className={HEADER_STYLES}>Create Food Event</h1>
          <label>Meal Type</label>
          <input
            {...register("name", {
              required: "Type of meal is required ",
            })}
            type="text"
            className={INPUT_STYLES}
            placeholder="Breakfast, Lunch, or Dinner"
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
          <label>Description of Food Event</label>
          <textarea
            {...register("description", {
              required: "Description is required.",
            })}
            className={INPUT_STYLES}
            placeholder="Description"
          />
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
          <label>Start date & time</label>
          <input
            {...register("start", {
              required: "Start date & time is required.",
            })}
            type="datetime-local"
            className={INPUT_STYLES}
          />
          {errors.start && (
            <div className="text-red-500">{errors.start.message}</div>
          )}
          <label>End date & time</label>
          <input
            {...register("end", {
              required: "End date & time is required.",
            })}
            type="datetime-local"
            className={INPUT_STYLES}
          />
          {errors.end && (
            <div className="text-red-500">{errors.end.message}</div>
          )}
          <label>Number of Groups for Scheduled Meal Pick Up</label>
          <input
            {...register("totalGroupCount", {
              required: "Number of groups is required.",
            })}
            type="text"
            className={INPUT_STYLES}
            placeholder="Number of Groups"
          />
          {errors.totalGroupCount && (
            <div className="text-red-500">{errors.totalGroupCount.message}</div>
          )}
          <div className="my-4 flex items-center justify-between text-white">
            <button
              onClick={() => reset()}
              type="submit"
              className={CLEAR_STYLES}
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={SUBMIT_STYLES}
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateFoodTicketForm;
