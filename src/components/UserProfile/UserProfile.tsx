"use client";

import { generateClient } from "aws-amplify/data";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { type Schema } from "@/amplify/data/resource";
import ProfileLinks from "@/components/UserProfile/ProfileLinks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const INPUT_STYLES: string =
  "rounded-full  border-4 border-white bg-[#FFFFFF]  ps-3  py-2 my-2 text-sm md:text-md bg-white/30";
const BUTTON_STYLES =
  " rounded-full border-4 border-white bg-[#FF6B54] px-10  md:px-12 py-2 my-2 text-white";
const DISABLE_BUTTON_STYLES =
  " rounded-full border-4 border-white bg-[#FF6B54] px-10  md:px-12 py-2 my-2 text-white opacity-50";
const TEXT_COLOR_GRAY = "text-gray-400"; // CSS class for gray text color
const TEXT_COLOR_BLACK = "text-black"; // CSS class for black text color

const FORM_STYLES = "md:mx-10 flex flex-col";

const client = generateClient<Schema>();

const UserProfile = () => {
  const queryClient = useQueryClient();

  const { pending } = useFormStatus();
  // Queries

  const { data, isFetching } = useQuery({
    initialData: {} as Schema["User"]["type"],
    initialDataUpdatedAt: 0,
    queryKey: ["User", "123"],
    queryFn: async () =>
      (
        await client.models.User.get({
          id: "123",
        })
      ).data,
  });

  const userMutation = useMutation({
    //mutation takes parameters of input with User type
    mutationFn: async (input: Schema["User"]["type"]) =>
      (await client.models.User.update(input)).data,
    onMutate: () => {
      console.log("Mutate");
    },

    onError: () => {
      console.log("Error");
    },

    onSuccess: () => {
      queryClient.setQueryData(["User", 123], data);
      console.log("success");
    },

    onSettled: () => {
      console.log("settled");
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [enableCancelSave, setEnableCancelSave] = useState<boolean>(false);
  const [formState, setFormState] = useState<Schema["User"]["type"]>(
    {} as Schema["User"]["type"],
  );

  useEffect(() => {
    if (data) {
      setFormState(data);
    }
  }, [data, setFormState]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing((previsEditing) => !previsEditing);
      setEnableCancelSave(true);
    }
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

  const checkedIn = data?.checkedIn; // Placeholder value for now

  // function updateInputMutation(arg0: { updateInput: string }) {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div>
      {" "}
      {isFetching ? (
        <div className="flex h-screen w-full items-center justify-center bg-[#FFD7C5]">
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        <div className="flex w-full flex-col bg-[#FFD7C5]">
          <div className="hidden md:block">
            <Image
              src="/images/userProfile/Star_Icons.svg"
              alt="Right Squiggly SVG"
              width={30}
              height={30}
              className="md:absolute md:left-10 md:top-[50rem]"
            />{" "}
            <Image
              src="/images/userProfile/Star_Icons.svg"
              alt="Right Squiggly SVG"
              width={30}
              height={30}
              className="md:absolute md:right-8 md:top-[30rem]"
            />{" "}
            <Image
              src="/images/userProfile/Star_Icons.svg"
              alt="Right Squiggly SVG"
              width={30}
              height={30}
              className="md:absolute md:right-10 md:top-[70rem]"
            />{" "}
          </div>
          <div className="px-10 md:px-16 md:py-10">
            <ProfileLinks />
            <div className="mb-3 flex justify-between uppercase text-[#FF6B54] md:mx-10">
              <h1 className="mt-3 text-lg font-bold md:text-2xl">My Details</h1>
              <button className={BUTTON_STYLES} onClick={handleEditClick}>
                Edit
              </button>
            </div>

            <form className={FORM_STYLES} onSubmit={handleSaveClick}>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <div className="flex flex-col">
                  <label>First Name</label>
                  <input
                    className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
                    type="text"
                    placeholder={formState.firstName ?? "First Name"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChange(e)
                    }
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChange(e)
                    }
                    name="lastName"
                    value={formState.lastName ?? ""}
                    disabled={!isEditing} // Disabled when not in edit mode
                  />
                </div>
              </div>
              <label>email</label>
              <input
                className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
                type="text"
                placeholder={formState.email ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                value={formState.email ?? ""}
                name="email"
                disabled // Should not be able to edit email
              />
              <label>Password</label>
              <input
                className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
                type="password"
                placeholder="Password"
                disabled={!isEditing} // Disabled when not in edit mode
              />
              <label>Institution</label>
              <input
                className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
                type="text"
                placeholder={
                  formState.institution ?? "e.g. University of Calgary"
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                value={formState.institution ?? ""}
                name="Institution"
                disabled={!isEditing} // Disabled when not in edit mode
              />
              <label>Do you want provided meals at the hackathon?</label>
              <select
                className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
                value={formState.meals ? "Yes" : "No"}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    Meals: e.target.value === "Yes",
                  }))
                }
                disabled={!isEditing} // Disabled when not in edit mode
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {formState.meals && (
                <>
                  <label>Do you have any allergies?</label>
                  <input
                    className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
                    type="text"
                    placeholder={
                      formState.allergies ?? "e.g. Dairy, Nuts, etc."
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChange(e)
                    }
                    value={formState.allergies ?? ""}
                    name="Allergies"
                    disabled={!isEditing} // Disabled when not in edit mode
                  />
                </>
              )}
              <p>
                Check-in Status <br />
                This status will change to &quot;Yes&quot; after you&apos;ve
                checked in on hackathon day
              </p>
              <input
                className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
                type="text"
                value={checkedIn ? "Yes" : "No"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
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

                    <button
                      type="submit"
                      className={BUTTON_STYLES}
                      disabled={pending}
                    >
                      {pending ? (
                        <div className="size-5 animate-spin rounded-full border-b-2 border-white"></div>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className={DISABLE_BUTTON_STYLES}
                      disabled
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className={DISABLE_BUTTON_STYLES}
                      disabled
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserProfile;
