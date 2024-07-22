"use client";

import { DateTime } from "luxon";
import { SubmitHandler, useForm } from "react-hook-form";

import { createFoodEvent, deleteFoodEvent } from "./userFoodTicketActions";

const HEADER_STYLES = "text-2xl my-8";
const INPUT_STYLES =
  "rounded-lg border w-full p-3 my-2 border-2 border-[#A689FF] focus:bg-[#ede9fe] ";
const SUBMIT_STYLES =
  "bg-awesomer-purple px-5 py-3 text-white rounded-md hover:bg-[#A689FF]";
const CLEAR_STYLES =
  "bg-white px-5 py-3 text-black rounded-md border border-[#94a3b8] hover:bg-[#eae5fa] hover:text-[#7055fd]";

export declare type FormFields = {
  name: string;
  description: string;
  start: string;
  end: string;
  totalGroupCount: number;
};

const CreateFoodTicketForm = () => {
  //register input fields to react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  //When form gets submitted, first call handleSubmit from react hook, then it will ensure form fields are valid before calling onSubmit with the form field data
  //aka helps with verification
  const onSubmit: SubmitHandler<FormFields> = async (data: any) => {
    const currentTime = DateTime.now()
      .setZone(process.env.TIME_ZONE)
      .toJSDate(); //currentlocal time in the time zone

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
      start: startDateTime.toJSDate(),
      end: endDateTime.toJSDate(),
      currentTime,
    };

    console.log(formattedData);
    await createFoodEvent(formattedData);

    reset();
  };

  return (
    <>
      <div className=" flex min-h-screen flex-col items-center justify-center">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <h1 className={HEADER_STYLES}>Create Food Event</h1>
          <label>Team Name</label>
          <input
            {...register("name", {
              required: "Team name is required ",
            })}
            type="text"
            className={INPUT_STYLES}
            placeholder="Enter Team Name"
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
          <label>Description</label>
          <input
            {...register("description", {
              required: "Description is required.",
            })}
            type="text"
            className={INPUT_STYLES}
            placeholder="Enter description of ticket"
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
          <label>Total group count</label>
          <input
            {...register("totalGroupCount", {
              required: "Total group count is required.",
            })}
            type="text"
            className={INPUT_STYLES}
            placeholder="Enter total group count"
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
