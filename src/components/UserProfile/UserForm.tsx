"use client";

import type React from "react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

import { type Schema } from "@/amplify/data/resource";
import { type UserFormProp } from "@/components/UserProfile/UserProfile";

const INPUT_STYLES: string =
  "rounded-full  border-4 border-white bg-[#FFFFFF]  ps-3  py-2 my-2 text-sm md:text-md bg-white/30";
const BUTTON_STYLES =
  " rounded-full border-4 border-white bg-[#FF6B54] px-10  md:px-12 py-2 my-2 text-white";
const DISABLE_BUTTON_STYLES =
  " rounded-full border-4 border-white bg-[#FF6B54] px-10  md:px-12 py-2 my-2 text-white opacity-50";
const TEXT_COLOR_GRAY = "text-gray-400"; // CSS class for gray text color
const TEXT_COLOR_BLACK = "text-black"; // CSS class for black text color

const FORM_STYLES = "md:mx-10 flex flex-col";

export default function UserForm({
  data,
  checkedIn,
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
    <form className={FORM_STYLES} onSubmit={handleSaveClick}>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <div className="flex flex-col">
          <label>First Name</label>
          <input
            className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
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
            className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
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
        className={`${INPUT_STYLES} ${TEXT_COLOR_GRAY}`}
        type="text"
        placeholder={formState.email ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={formState.email ?? ""}
        name="email"
        disabled // Should not be able to edit email
      />
      <label>Password</label>
      <input
        className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
        type="password"
        placeholder="••••••••"
        disabled={!isEditing} // Disabled when not in edit mode
      />
      <label>Institution</label>
      <input
        className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
        type="text"
        placeholder={formState.institution ?? "e.g. University of Calgary"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={formState.institution ?? ""}
        name="institution"
        disabled={!isEditing} // Disabled when not in edit mode
      />
      <label>Do you want provided meals at the hackathon?</label>
      <select
        className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
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
            className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
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
        className={`${INPUT_STYLES} ${TEXT_COLOR_GRAY}`}
        type="text"
        value={checkedIn ? "Yes" : "No"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        readOnly
      />
      <div className=" mb-10 mt-3 flex flex-col justify-between md:flex-row">
        {enableCancelSave ? (
          <>
            <button
              type="button"
              className={BUTTON_STYLES}
              onClick={handleCancelClick}
            >
              Cancel
            </button>

            <button type="submit" className={BUTTON_STYLES} disabled={pending}>
              {pending ? "Saving.." : "Save"}
            </button>
          </>
        ) : (
          <>
            <button type="button" className={DISABLE_BUTTON_STYLES} disabled>
              Cancel
            </button>

            <button type="submit" className={DISABLE_BUTTON_STYLES} disabled>
              Save
            </button>
          </>
        )}
      </div>
    </form>
  );
}
