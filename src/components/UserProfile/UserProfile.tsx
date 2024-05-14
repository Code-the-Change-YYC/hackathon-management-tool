"use client";

import { generateClient } from "aws-amplify/data";
import Image from "next/image";
import { useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import ProfileLinks from "@/components/UserProfile/ProfileLinks";
import UserForm from "@/components/UserProfile/UserForm";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import {
  QueryClient,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const BUTTON_STYLES =
  " rounded-full border-4 border-white bg-[#FF6B54] px-10  md:px-12 py-2 my-2 text-white";

const client = generateClient<Schema>();

export interface UserFormProp {
  data: Schema["User"]["type"];
  checkedIn: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEnableCancelSave: React.Dispatch<React.SetStateAction<boolean>>;
  enableCancelSave: boolean;
  isEditing: boolean;
  userMutation: any;
}

const UserProfile = () => {
  const queryClient = useQueryClient();
  // Queries

  const { data, isFetching } = useQuery({
    initialData: {} as Schema["User"]["type"],
    initialDataUpdatedAt: 0,
    queryKey: ["User", "12345"],
    queryFn: async () => {
      const response = await client.models.User.get({ id: "12345" });
      console.log(response.data);
      return response.data;
    },
    // staleTime: Infinity,
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

    //When mutation is successful, re-fetch updated data using queryKey
    onSuccess: () => {
      // queryClient.setQueryData(["User", "123"], data);
      queryClient.invalidateQueries({
        queryKey: ["User", "12345"],
        // refetchType: "active",
      });
      console.log("success");
    },

    onSettled: () => {
      console.log("settled");
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

  // function updateInputMutation(arg0: { updateInput: string }) {
  //   throw new Error("Function not implemented.");
  // }

  const checkedIn = false;

  return (
    <div>
      {" "}
      {isFetching ? (
        <div className="flex h-screen w-full items-center justify-center bg-fuzzy-peach">
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        <div className="flex w-full flex-col bg-fuzzy-peach">
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
            {data ? (
              <UserForm
                data={data}
                checkedIn={checkedIn}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                enableCancelSave={enableCancelSave}
                setEnableCancelSave={setEnableCancelSave}
                userMutation={userMutation}
              />
            ) : (
              <div className="flex h-screen w-full items-center justify-center bg-fuzzy-peach">
                <h1 className="text-2xl">Loading...</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserProfile;
