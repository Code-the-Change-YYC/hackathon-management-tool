"use client";

import { DateTime } from "luxon";
import { SubmitHandler, useForm } from "react-hook-form";

import { createFoodEvent } from "./userFoodTicketActions";

const HEADER_STYLES = "text-xl my-2";
const INPUT_STYLES =
  "rounded-lg border w-full p-3 my-2 border-2 border-[#A689FF] focus:border-[#b91c1c] focus-outline-none focus:ring-0";
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
    formState: { errors },
  } = useForm<FormFields>(); // most basic version

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
    //console.log(data);
    console.log(formattedData);
    await createFoodEvent(formattedData);
    // reset(); // Reset form fields after submission
  };
  return (
    <>
      <div className="m-8 flex min-h-screen flex-col items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className={HEADER_STYLES}>Create Food Ticket for Team</h1>
          <label>Team Name</label>
          <input
            {...register("name", {
              required: "Ticket code is required ",
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
            <button type="submit" className={CLEAR_STYLES}>
              Clear
            </button>
            <button type="submit" className={SUBMIT_STYLES}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateFoodTicketForm;
