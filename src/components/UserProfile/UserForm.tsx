"use client";

import { useEffect, useMemo } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { type Schema } from "@/amplify/data/resource";
import { useUserDetails } from "@/components/contexts/UserDetailsContext";
import { type UserFormProp } from "@/components/UserProfile/UserProfile";

type UserFormData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  program: string;
  willEatMeals: boolean;
  allergies: string;
};

const getFormValues = (userDetails: any): UserFormData => ({
  id: userDetails?.id || "",
  firstName: userDetails?.firstName || "",
  lastName: userDetails?.lastName || "",
  email: userDetails?.email || "",
  institution: userDetails?.institution || "",
  program: userDetails?.program || "",
  willEatMeals: Boolean(userDetails?.willEatMeals),
  allergies: userDetails?.allergies || "",
});

export default function UserForm({
  userMutation,
  setIsEditing,
  isEditing,
  enableCancelSave,
  setEnableCancelSave,
}: UserFormProp) {
  const { pending } = useFormStatus();
  const { userDetails } = useUserDetails();
  const value = useMemo(() => getFormValues(userDetails), [userDetails]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<UserFormData>({
    defaultValues: value,
  });

  const willEatMeals = watch("willEatMeals");

  useEffect(() => {
    if (userDetails) {
      reset(value);
    }
  }, [value, reset]);

  const handleCancelClick = () => {
    setIsEditing(false);
    setEnableCancelSave(false);
    reset(value);
  };

  const handleSaveClick = (data: UserFormData) => {
    setIsEditing(false); // Exit edit mode
    setEnableCancelSave(false);

    const dirtyData: Record<string, any> = {};

    Object.keys(dirtyFields).forEach((key) => {
      const fieldKey = key as keyof UserFormData;
      if (dirtyFields[fieldKey]) {
        dirtyData[fieldKey] = data[fieldKey];
      }
    });

    if (dirtyFields.willEatMeals && data.willEatMeals) {
      dirtyData.allergies = data.allergies;
    }

    const formattedData = {
      id: data.id,
      ...dirtyData,
    } as Schema["User"]["type"];

    userMutation.mutate(formattedData);
  };

  return (
    <form
      className={"flex flex-col md:mx-10"}
      onSubmit={handleSubmit(handleSaveClick)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <div className="flex flex-col">
          <label>First Name</label>
          <input
            className={`md:text-md  my-2 rounded-full border-4 border-white bg-white py-2 ps-3 text-sm ${isEditing ? "text-black" : "text-ehhh-grey"}`}
            type="text"
            placeholder={"First Name"}
            {...register("firstName", {
              required: isEditing ? "First name is required" : false,
            })}
            disabled={!isEditing} // Disabled when not in edit mode
          />
          {errors.firstName && (
            <span className="text-sm text-strawberry-red">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label>Last Name</label>
          <input
            className={`${"md:text-md  my-2 rounded-full border-4 border-white  bg-white py-2 ps-3 text-sm"} ${isEditing ? "text-black" : "text-ehhh-grey"}`}
            type="text"
            placeholder={"Last Name"}
            {...register("lastName", {
              required: isEditing ? "Last name is required" : false,
            })}
            disabled={!isEditing} // Disabled when not in edit mode
          />
          {errors.lastName && (
            <span className="text-sm text-strawberry-red">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>
      <label>Email</label>
      <input
        className={`${"md:text-md  my-2 rounded-full border-4  border-white bg-white py-2 ps-3 text-sm"} ${"text-ehhh-grey"}`}
        type="email"
        value={userDetails?.email || ""}
        disabled // Should not be able to edit email
      />
      <label>Password</label>
      <input
        className={`${"md:text-md  my-2 rounded-full border-4  border-white  bg-white py-2 ps-3 text-sm"} ${isEditing ? "text-black" : "text-ehhh-grey"}`}
        type="password"
        placeholder="••••••••"
        disabled={!isEditing} // Disabled when not in edit mode
      />
      <label>Institution</label>
      <input
        className={`${"md:text-md  my-2 rounded-full border-4  border-white  bg-white py-2 ps-3 text-sm"} ${isEditing ? "text-black" : "text-ehhh-grey"}`}
        type="text"
        placeholder={"e.g. University of Calgary"}
        {...register("institution")}
        disabled={!isEditing} // Disabled when not in edit mode
      />
      <label>Program</label>
      <input
        className={`${"md:text-md  my-2 rounded-full border-4  border-white  bg-white py-2 ps-3 text-sm"} ${isEditing ? "text-black" : "text-ehhh-grey"}`}
        type="text"
        placeholder={"e.g. Engineering"}
        {...register("program")}
        disabled={!isEditing} // Disabled when not in edit mode
      />
      <label>Do you want provided meals at the hackathon?</label>
      <select
        className={`${"md:text-md  my-2 rounded-full border-4  border-white  bg-white py-2 ps-3 text-sm"} ${isEditing ? "text-black" : "text-ehhh-grey"}`}
        {...register("willEatMeals", {
          setValueAs: (value) => {
            if (typeof value === "boolean") return value;
            return value === "true";
          },
        })}
        disabled={!isEditing} // Disabled when not in edit mode
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      {willEatMeals && (
        <>
          <label>Do you have any allergies?</label>
          <input
            className={`${"md:text-md  my-2 rounded-full border-4  border-white  bg-white  py-2 ps-3 text-sm"} ${isEditing ? "text-black" : "text-ehhh-grey"}`}
            type="text"
            placeholder={"e.g. Dairy, Nuts, etc."}
            {...register("allergies")}
            disabled={!isEditing} // Disabled when not in edit mode
          />
        </>
      )}
      <p>
        Check-in Status <br />
        This status will change to &quot;Yes&quot; after you&apos;ve checked in
        on hackathon day
      </p>
      <input
        className={`${"md:text-md  my-2 rounded-full border-4  border-white  bg-white  py-2 ps-3 text-sm"} ${"text-ehhh-grey"}`}
        type="text"
        value={userDetails?.checkedIn ? "Yes" : "No"}
        readOnly
      />
      <div className=" mb-10 mt-3 flex flex-col justify-between md:flex-row">
        {enableCancelSave ? (
          <>
            <button
              type="button"
              className={
                "my-2 rounded-full border-4 border-white bg-grapefruit  px-10 py-2 text-white md:px-12"
              }
              onClick={handleCancelClick}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={
                " my-2 rounded-full border-4 border-white bg-grapefruit  px-10 py-2 text-white md:px-12"
              }
              disabled={pending}
            >
              {pending ? "Saving.." : "Save"}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={
                "my-2 rounded-full border-4 border-white bg-grapefruit  px-10 py-2 text-white opacity-50 md:px-12"
              }
              disabled
            >
              Cancel
            </button>

            <button
              type="submit"
              className={
                "my-2 rounded-full border-4 border-white bg-grapefruit  px-10 py-2 text-white opacity-50 md:px-12"
              }
              disabled
            >
              Save
            </button>
          </>
        )}
      </div>
    </form>
  );
}
