"use client";

import { generateClient } from "aws-amplify/api";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import type { Schema } from "@/amplify/data/resource";
import { Button, CheckboxField, Input, Label } from "@aws-amplify/ui-react";
import { useMutation } from "@tanstack/react-query";

const client = generateClient<Schema>();
export default function ResetPage() {
  const userMutation = useMutation({
    mutationFn: async (input: Schema["ResetHackathon"]["args"]) => {
      console.log(input);
      try {
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

  const onSubmit: SubmitHandler<Schema["ResetHackathon"]["args"]> = (data) => {
    userMutation.mutate(data);
  };

  const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      scoringComponents: [
        { friendlyName: "", isSidepot: false, id: generateId() },
      ],
      scoringSidepots: [
        { friendlyName: "", isSidepot: true, id: generateId() },
      ],
      resetUsers: false,
      resetTeams: false,
      resetRooms: false,
      resetScores: false,
      startDate: "",
      endDate: "",
      safetyCheck: "",
    },
  });

  const {
    fields: scoringComponents,
    append: appendScoringComponent,
    remove: removeScoringComponent,
  } = useFieldArray({
    control,
    name: "scoringComponents",
  });

  const {
    fields: scoringSidepots,
    append: appendScoringSidepot,
    remove: removeScoringSidepot,
  } = useFieldArray({
    control,
    name: "scoringSidepots",
  });

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
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full flex-col justify-center gap-4 bg-white p-4 md:p-8"
    >
      <div className="flex w-full flex-col justify-between gap-2 md:gap-12">
        <div className="flex w-full flex-row">
          <div className="mr-24 flex w-1/3 flex-col gap-2">
            <Label>Score Components: </Label>
            {scoringComponents.map((field, index) => (
              <div key={field?.id} className="flex flex-row gap-2">
                <Input
                  required
                  id="scoringComponents"
                  {...register(`scoringComponents.${index}.friendlyName`)}
                  placeholder="Usability, Creativity, etc."
                />
                <Button
                  type="button"
                  variation="primary"
                  colorTheme="error"
                  onClick={() => removeScoringComponent(index)}
                >
                  X
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendScoringComponent({
                  friendlyName: "",
                  isSidepot: false,
                  id: generateId(),
                })
              }
            >
              Add Score Component
            </Button>
          </div>
          <div className="flex w-1/3 flex-col gap-2">
            <Label htmlFor="scoringSidepots">Scoring Sidepots: </Label>
            {scoringSidepots.map((field, index) => (
              <div key={field?.id} className="flex flex-row gap-2">
                <Input
                  required
                  id="scoringSidepots"
                  {...register(`scoringSidepots.${index}.friendlyName`)}
                  placeholder="Usability, Creativity, etc."
                />
                <Button
                  variation="primary"
                  colorTheme="error"
                  type="button"
                  onClick={() => removeScoringSidepot(index)}
                >
                  X
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendScoringSidepot({
                  friendlyName: "",
                  isSidepot: true,
                  id: generateId(),
                })
              }
            >
              Add Scoring Sidepot
            </Button>
          </div>
        </div>
        <div className="flex flex-row">
          {" "}
          <div className="mr-24 flex w-1/3 flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate">Start Date:</Label>
              <Input
                required
                type="date"
                id="startDate"
                placeholder="Last Name"
                {...register("startDate")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="endDate">End Date: </Label>
              <Input
                required
                type="date"
                id="endDate"
                placeholder="Last Name"
                {...register("endDate")}
              />
            </div>
          </div>{" "}
          <div className="flex w-1/3 flex-col gap-2">
            <Label>Reset Fields</Label>
            <CheckboxField label="Reset users: " {...register("resetUsers")} />
            <CheckboxField label="Reset Teams: " {...register("resetTeams")} />
            <CheckboxField label="Reset Rooms: " {...register("resetRooms")} />
            <CheckboxField
              label="Reset Scores: "
              {...register("resetScores")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="safetyCheck">
            Enter &quot;delete hackathon&quot; to confirm{" "}
          </Label>
          <div className="flex w-1/2 flex-row gap-2">
            <Input
              required
              id="safetyCheck"
              placeholder="delete hackathon"
              {...register("safetyCheck")}
              className="w-20"
            />
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
      </div>
    </form>
  );
}
