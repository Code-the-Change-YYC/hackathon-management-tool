"use client";

import Image from "next/image";
import { useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { client } from "@/app/QueryProvider";
import LoadingRing from "@/components/LoadingRing";
import UserForm from "@/components/UserProfile/UserForm";
import { useUser } from "@/components/contexts/UserContext";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface UserFormProp {
  data: Schema["User"]["type"];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEnableCancelSave: React.Dispatch<React.SetStateAction<boolean>>;
  enableCancelSave: boolean;
  isEditing: boolean;
  userMutation: any;
}

const UserProfile = () => {
  const { currentUser, isFetching: userContextIsFetching } = useUser();
  const userId = currentUser.username as string;

  const { data, isFetching } = useQuery({
    initialData: {} as Schema["User"]["type"],
    initialDataUpdatedAt: 0,
    queryKey: ["User", userId],
    queryFn: async () => {
      const response = await client.models.User.get({
        id: userId,
      });

      if (response.errors) throw new Error(response.errors[0].message);

      return response.data;
    },
    enabled: !!userId,
  });

  const userMutation = useMutation({
    //mutation takes parameters of input with User type
    mutationKey: ["User"],
    mutationFn: async (input: Schema["User"]["type"]) => {
      const {
        createdAt,
        updatedAt,
        team,
        teamId,
        checkedIn,
        profileOwner,
        ...extractedFields
      } = input;
      // TODO this can be cleaned if we use React Hook Form to handle form state better
      void createdAt,
        void updatedAt,
        void team,
        void teamId,
        void checkedIn,
        void profileOwner;

      try {
        await client.models.User.update(extractedFields);
      } catch (error) {
        console.error("Error updating user", error);
        throw error;
      }
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [enableCancelSave, setEnableCancelSave] = useState<boolean>(false);

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing((previsEditing) => !previsEditing);
      setEnableCancelSave(true);
    }
  };

  return (
    <>
      {" "}
      {isFetching || userContextIsFetching ? (
        <div className="flex h-screen w-full items-center justify-center bg-fuzzy-peach">
          <LoadingRing />
        </div>
      ) : (
        <div className="flex w-full flex-col items-start bg-fuzzy-peach md:items-start">
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
          <div className="w-full md:px-16 md:py-10">
            {/* <ProfileLinks /> */}
            <div className="mb-3 flex justify-between uppercase text-[#FF6B54] md:mx-10">
              <h1 className="mt-3 text-lg font-bold md:text-2xl">My Details</h1>
              <button
                className="my-2 rounded-full border-4 border-white bg-[#FF6B54]  px-10 py-2 text-white md:px-12"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
            {data && (
              <UserForm
                data={data}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                enableCancelSave={enableCancelSave}
                setEnableCancelSave={setEnableCancelSave}
                userMutation={userMutation}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default UserProfile;
