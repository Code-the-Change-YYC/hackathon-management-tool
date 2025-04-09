"use client";

import Image from "next/image";
import { useState } from "react";
import { type Schema } from "@/amplify/data/resource";
import { client } from "@/app/QueryProvider";
import { useUser } from "@/components/contexts/UserContext";
import KevinLoadingRing from "@/components/KevinLoadingRing";
import UserForm from "@/components/UserProfile/UserForm";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function UserProfile() {
  const { currentUser: data, isFetching: userContextIsFetching } = useUser();

  const userMutation = useMutation({
    mutationKey: ["User"],
    mutationFn: async (input: typeof data) => {
      try {
        await client.models.User.update(input);
      } catch (error) {
        throw new Error("Failed to update user");
      }
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [enableCancelSave, setEnableCancelSave] = useState<boolean>(false);

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing((previsEditing) => !previsEditing);
      setEnableCancelSave(true);
    }
  };
  if (userContextIsFetching)
    return (
      <div className="flex w-full items-center justify-center">
        <KevinLoadingRing />
      </div>
    );
  return (
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
        <div className="mb-3 flex justify-between uppercase text-apricot md:mx-10">
          <h1 className="mt-3 text-lg font-bold md:text-2xl">My Details</h1>
          <button
            className=" my-2 rounded-full border-4 border-white bg-apricot  px-10 py-2 text-white md:px-12"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
        <UserForm
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          enableCancelSave={enableCancelSave}
          setEnableCancelSave={setEnableCancelSave}
          userMutation={userMutation}
        />
      </div>
    </div>
  );
}
