"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import type { UseMutationResult } from "@tanstack/react-query";

import type { IUser } from "../contexts/UserContext";
import { useUser } from "../contexts/UserContext";
import FormInput from "./FormInput";

export interface UserFormProp {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEnableCancelSave: React.Dispatch<React.SetStateAction<boolean>>;
  enableCancelSave: boolean;
  isEditing: boolean;
  userMutation: UseMutationResult<void, Error, IUser, unknown>;
}
export default function UserForm({
  userMutation,
  setIsEditing,
  isEditing,
  enableCancelSave,
  setEnableCancelSave,
}: UserFormProp) {
  const { pending } = useFormStatus();
  const { currentUser } = useUser();
  const [formState, setFormState] = useState(currentUser);

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
          <FormInput
            label="First Name"
            placeholder={formState.firstName ?? "First Name"}
            onChange={onChange}
            value={formState.firstName ?? ""}
            name={"firstName"}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col">
          <FormInput
            label="Last Name"
            placeholder={formState.firstName ?? "Last Name"}
            onChange={onChange}
            value={formState.lastName ?? ""}
            name={"lastName"}
            disabled={!isEditing}
          />
        </div>
      </div>
      <FormInput
        label="Email"
        placeholder={formState.email ?? ""}
        onChange={onChange}
        value={formState.email ?? ""}
        name={"email"}
        disabled
      />
      <FormInput
        label="Password"
        type="password"
        placeholder="••••••••"
        disabled={!isEditing}
        name="password"
      />
      <FormInput
        label="Institution"
        placeholder={formState.institution ?? "e.g. University of Calgary"}
        onChange={onChange}
        value={formState.institution ?? ""}
        name="institution"
        disabled={!isEditing} // Disabled when not in edit mode
      />
      <label>Do you want provided meals at the hackathon?</label>
      <select
        className={`md:text-md  my-2 rounded-full border-4  border-white   bg-white/30 py-2 ps-3 text-sm ${isEditing ? "text-black" : "text-gray-400"}`}
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
        <FormInput
          name={"allergies"}
          label="Do you have any allergies?"
          placeholder={formState.allergies ?? "e.g. Dairy, Nuts, etc."}
          onChange={onChange}
          value={formState.allergies ?? ""}
          disabled={!isEditing} // Disabled when not in edit mode
        />
      )}
      <div className=" mb-10 mt-3 flex flex-col justify-between md:flex-row">
        {enableCancelSave ? (
          <>
            <button
              className={
                " my-2 rounded-full border-4 border-white bg-apricot  px-10 py-2 text-white md:px-12"
              }
              onClick={handleCancelClick}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={
                " my-2 rounded-full border-4 border-white bg-apricot  px-10 py-2 text-white md:px-12"
              }
              disabled={pending}
            >
              {pending ? "Saving.." : "Save"}
            </button>
          </>
        ) : (
          <>
            {["Cancel", "Save"].map((text) => (
              <button
                key={text}
                type="button"
                disabled
                className=" my-2 rounded-full border-4 border-white bg-apricot  px-10 py-2 text-white opacity-50 md:px-12"
              >
                {text}
              </button>
            ))}
          </>
        )}
      </div>
    </form>
  );
}
