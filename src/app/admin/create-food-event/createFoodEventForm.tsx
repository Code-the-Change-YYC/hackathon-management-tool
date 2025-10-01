"use client";

import { generateClient } from "aws-amplify/data";
import { DateTime } from "luxon";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { type Schema } from "@/amplify/data/resource";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const HEADER_STYLES = "text-2xl my-8";
const INPUT_STYLES =
  "rounded-lg border w-full p-3 my-2 border-2 border-awesome-purple focus:bg-lilac-purple/50";
const SUBMIT_STYLES =
  "bg-awesomer-purple px-5 py-3 text-white rounded-md hover:bg-awesome-purple";
const CLEAR_STYLES =
  "bg-white px-5 py-3 text-black rounded-md border border-regal-blue/50 hover:bg-lilac-purple/50 hover:text-awesomer-purple";

const client = generateClient<Schema>();

type CreateFoodEventInput = {
  name: string;
  description: string;
  start: string;
  end: string;
  totalGroupCount: number;
};

const CreateFoodTicketForm = () => {
  const queryClient = useQueryClient();

  const createFoodEvent = async (fields: CreateFoodEventInput) => {
    const { errors } = await client.models.FoodEvent.create({
      name: fields.name,
      description: fields.description,
      start: fields.start,
      end: fields.end,
      totalGroupCount: fields.totalGroupCount,
    });

    if (errors) {
      throw new Error(errors[0].message);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateFoodEventInput>();

  const foodEventMutation = useMutation({
    mutationFn: createFoodEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["FoodEvents"] });
      queryClient.invalidateQueries({ queryKey: ["FoodTicket"] });
      reset();
    },
    onError: (error) => {
      console.error("Error updating table data:", error);
    },
  });

  const onSubmit: SubmitHandler<CreateFoodEventInput> = (data) => {
    // Parse and validate the start date
    const startDateTime = DateTime.fromISO(data.start, {
      zone: "America/Edmonton",
    });
    if (!startDateTime.isValid) {
      console.error("Invalid start date & time");
      return;
    }

    // Parse and validate the end date
    const endDateTime = DateTime.fromISO(data.end, {
      zone: "America/Edmonton",
    });
    if (!endDateTime.isValid) {
      console.error("Invalid end date & time");
      return;
    }

    // Check if dates are valid
    if (!startDateTime.isValid || !endDateTime.isValid) {
      throw new Error("Invalid start or end date");
    }

    const formattedData = {
      name: data.name,
      description: data.description,
      totalGroupCount: data.totalGroupCount,
      start: startDateTime.toISO().toString(),
      end: endDateTime.toISO().toString(),
    };

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
            <div className="text-strawberry-red">{errors.name.message}</div>
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
            <div className="text-strawberry-red">
              {errors.description.message}
            </div>
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
            <div className="text-strawberry-red">{errors.start.message}</div>
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
            <div className="text-strawberry-red">{errors.end.message}</div>
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
            <div className="text-strawberry-red">
              {errors.totalGroupCount.message}
            </div>
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
