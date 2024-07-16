"use client";

import { SubmitHandler, useForm } from "react-hook-form";

const HEADER_STYLES = "text-lg";
const INPUT_STYLES = "rounded-md border w-full p-4 my-1 border-2";
const SUBMIT_STYLES =
  "bg-awesomer-purple p-4 w-full my-1 text-white rounded-md hover:bg-[#A689FF]";

type FormFields = {
  ticketCode: string;
  foodEventID: string;
};

export default function TicketVerificationNY() {
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

  //add pattern requirement or min length - 11:0 for input fields once you hear back from Allan
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className={HEADER_STYLES}>Enter food ticket information:</h1>
          <input
            {...register("ticketCode", {
              required: "Ticket code is required ",
              validate: (value) => {
                if (!value.includes("@")) {
                  return "Ticket code must include @";
                }
                return true;
              },
            })}
            type="text"
            className={INPUT_STYLES}
            placeholder="Enter ticket code"
          />
          {errors.ticketCode && (
            <div className="text-red-500">{errors.ticketCode.message}</div>
          )}
          <input
            {...register("foodEventID", {
              required: "Food Event ID is required.",
              minLength: {
                value: 9,
                message: "Food Event ID must have at least 9 characters.",
              },
            })}
            type="text"
            className={INPUT_STYLES}
            placeholder="Enter Food Event ID"
          />
          {errors.foodEventID && (
            <div className="text-red-500">{errors.foodEventID.message}</div>
          )}
          <button type="submit" className={SUBMIT_STYLES}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
