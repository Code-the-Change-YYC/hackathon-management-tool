"use client";

import { SubmitHandler, useForm } from "react-hook-form";

const HEADER_STYLES = "text-lg my-2";
const INPUT_STYLES =
  "rounded-lg border w-full p-3 my-2 border-2 border-[#A689FF] focus:border-[#b91c1c] focus-outline-none focus:ring-0";
const SUBMIT_STYLES =
  "bg-awesomer-purple px-5 py-3 text-white rounded-md hover:bg-[#A689FF]";
const CLEAR_STYLES =
  "bg-white px-5 py-3 text-black rounded-md border border-[#94a3b8] hover:bg-[#eae5fa] hover:text-[#7055fd]";

type FormFields = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
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
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
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
            {...register("startDate", {
              required: "Start date & time is required.",
            })}
            type="datetime-local"
            className={INPUT_STYLES}
          />
          {errors.startDate && (
            <div className="text-red-500">{errors.startDate.message}</div>
          )}
          <label>End date & time</label>
          <input
            {...register("endDate", {
              required: "End date & time is required.",
            })}
            type="datetime-local"
            className={INPUT_STYLES}
          />
          {errors.endDate && (
            <div className="text-red-500">{errors.endDate.message}</div>
          )}
          <label>Total group count</label>
          <input
            {...register("endDate", {
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
