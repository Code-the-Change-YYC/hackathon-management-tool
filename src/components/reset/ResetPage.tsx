"use client";

import { generateClient } from "aws-amplify/api";
import { useState } from "react";

import type { Schema } from "@/amplify/data/resource";
import {
  Button,
  CheckboxField,
  Input,
  Label,
  TextAreaField,
} from "@aws-amplify/ui-react";
import { useMutation } from "@tanstack/react-query";

const client = generateClient<Schema>();
export default function ResetPage() {
  const userMutation = useMutation({
    mutationFn: async (input: Schema["ResetHackathon"]["args"]) => {
      console.log(input);
      try {
        // e.preventDefault(); // This will prevent the default form submit action which is to refresh the page
        if (input.safetyCheck !== "delete hackathon") {
          console.log(
            `must complete safety check, looking for \'delete hackathon\'}`,
          );
          return;
        }

        // Here you would typically handle the submission to AWS Amplify
        const { data: statusCode, errors } =
          await client.mutations.ResetHackathon({
            ...input,
          });
        if (errors) {
          console.log(errors);
        }
        console.log("Form Data Submitted:", input, statusCode?.statusCode);
        return;
      } catch (error) {
        console.error("Error updating user", error);
        throw error;
      }
    },
  });

  const [formState, setFormState] = useState<Schema["ResetHackathon"]["args"]>(
    {} as Schema["ResetHackathon"]["args"],
  );

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userMutation.mutate(formState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (userMutation.isPending) {
    return (
      // These are mandatory divs for the loading spinner
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  if (userMutation.isError) {
    return <div>Error, please try again later.</div>;
  }
  return (
    <form
      onSubmit={submitForm}
      className="relative flex w-full flex-col justify-center gap-4 bg-white p-4 md:p-8"
    >
      <div className="flex w-full flex-col justify-between gap-2 md:gap-12">
        <div className="flex flex-col gap-2">
          <TextAreaField
            descriptiveText="Score Components "
            label="Score Components (JSON): "
            required
            id="scoreComponents"
            name="scoreComponents"
            placeholder={`[
              {
                id: "Cool beans, this should be a uuid",
                friendlyName: "no name for you",
                isSidepot: false
              },
              {
                id: "uuid v2",
                friendlyName: "I love eating free food",
                isSidepot: false
              }
            ]`}
            value={formState.scoreComponents?.toString()}
            onChange={handleChange}
            resize="vertical"
            rows={12}
          />
        </div>
        <div className="flex flex-col gap-2">
          <TextAreaField
            required
            descriptiveText="Scoring Sidepots "
            label="Scoring Sidepots (JSON): "
            id="scoringSidepots"
            name="scoringSidepots"
            placeholder={`[
                {
                  id: "Cool beans, this should be a uuid",
                  friendlyName: "no name for you",
                  isSidepot: false
                },
                {
                  id: "uuid v2",
                  friendlyName: "I love eating free food",
                  isSidepot: false
                }
              ]`}
            value={formState.scoringSidepots?.toString() ?? ""}
            onChange={handleChange}
            resize="vertical"
            rows={12}
          />
        </div>
        <div className="flex w-1/3 flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="startDate">Start Date:</Label>
            <Input
              required
              type="date"
              id="startDate"
              name="startDate"
              placeholder="Last Name"
              value={formState.startDate?.toString() ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="endDate">End Date: </Label>
            <Input
              required
              type="date"
              id="endDate"
              name="endDate"
              placeholder="Last Name"
              value={formState.endDate?.toString() ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex w-1/3 flex-col gap-2">
          <Label>Reset Fields</Label>
          <CheckboxField
            name="resetUsers"
            value="yes"
            checked={formState.resetUsers === true}
            onChange={handleChange}
            label="Reset users: "
          />
          <CheckboxField
            name="resetTeams"
            value="yes"
            checked={formState.resetTeams === true}
            onChange={handleChange}
            label="Reset Teams"
          />
          <CheckboxField
            name="resetRooms"
            value="yes"
            checked={formState.resetRooms === true}
            onChange={handleChange}
            label="Reset Rooms"
          />
          <CheckboxField
            name="resetScores"
            value="yes"
            checked={formState.resetScores === true}
            onChange={handleChange}
            label="Reset Scores: "
          />
        </div>
        <div className="flex items-center">
          <Button
            variation="primary"
            colorTheme={
              userMutation.isSuccess
                ? "success"
                : userMutation.isError
                  ? "error"
                  : undefined // Set the colorTheme to undefined if none of the conditions are met
            }
            loadingText="Loading..."
            type="submit"
            isLoading={userMutation.isPending}
          >
            {userMutation.isSuccess
              ? "Success"
              : userMutation.isError
                ? "Error"
                : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
