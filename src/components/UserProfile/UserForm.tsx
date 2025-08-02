"use client";

import type React from "react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { type Schema } from "@/amplify/data/resource";
import { type UserFormProp } from "@/components/UserProfile/UserProfile";

export default function UserForm({
  data,
  userMutation,
  setIsEditing,
  isEditing,
  enableCancelSave,
  setEnableCancelSave,
}: UserFormProp) {
  const { pending } = useFormStatus();
  const [formState, setFormState] = useState<Schema["User"]["type"]>(data);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEnableCancelSave(false);
  };

  const handleSaveClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsEditing(false); // Exit edit mode
    setEnableCancelSave(false);
    userMutation.mutate(formState);
    console.log(formState); // Log the form state
  };

  return (
    <form className={"flex flex-col md:mx-10"} onSubmit={handleSaveClick}>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <div className="flex flex-col">
          <label>First Name</label>
          <input
            className={`md:text-md  my-2 rounded-full border-4 border-white bg-white py-2 ps-3 text-sm ${isEditing ? "text-black" : "text-ehhh-grey"}`}
            type="text"
            placeholder={formState.firstName ?? "First Name"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            value={formState.firstName ?? ""}
            name="firstName"
            disabled={!isEditing} // Disabled when not in edit mode
          />
        </div>
        <div className="flex flex-col">
          <label>Last Name</label>
          <input
            className={`${"md:text-md  my-2 rounded-full border-4 border-white  bg-white py-2 ps-3 text-sm"} ${isEditing ? "text-black" : "text-ehhh-grey"}`}
            type="text"
            placeholder={formState.lastName ?? "Last Name"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            name="lastName"
            value={formState.lastName ?? ""}
            disabled={!isEditing} // Disabled when not in edit mode
          />
        </div>
      </div>
      <label>Email</label>
      <input
        className={`${"md:text-md  my-2 rounded-full border-4  border-white bg-white py-2 ps-3 text-sm"} ${"text-ehhh-grey"}`}
        type="text"
        placeholder={formState.email ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={formState.email ?? ""}
        name="email"
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
        placeholder={formState.institution ?? "e.g. University of Calgary"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={formState.institution ?? ""}
        name="institution"
        disabled={!isEditing} // Disabled when not in edit mode
      />
      <label>Program</label>
      <input
        className={`${"md:text-md  my-2 rounded-full border-4  border-white  bg-white py-2 ps-3 text-sm"} ${isEditing ? "text-black" : "text-ehhh-grey"}`}
        type="text"
        placeholder={formState.program ?? "e.g. Engineering"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={formState.program ?? ""}
        name="program"
        disabled={!isEditing} // Disabled when not in edit mode
      />
      <label>Do you want provided meals at the hackathon?</label>
      <select
        className={`${"md:text-md  my-2 rounded-full border-4  border-white  bg-white py-2 ps-3 text-sm"} ${isEditing ? "text-black" : "text-ehhh-grey"}`}
        value={formState.willEatMeals ? "Yes" : "No"}
        onChange={(e) =>
          setFormState((prevState) => ({
            ...prevState,
            willEatMeals: e.target.value === "Yes",
          }))
        }
        disabled={!isEditing} // Disabled when not in edit mode
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {formState.willEatMeals && (
        <>
          <label>Do you have any allergies?</label>
          <input
            className={`${"md:text-md  my-2 rounded-full border-4  border-white  bg-white  py-2 ps-3 text-sm"} ${isEditing ? "text-black" : "text-ehhh-grey"}`}
            type="text"
            placeholder={formState.allergies ?? "e.g. Dairy, Nuts, etc."}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            value={formState.allergies ?? ""}
            name="allergies"
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
        value={formState.checkedIn ? "Yes" : "No"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
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
