"use client";

import { generateClient } from "aws-amplify/api";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import type { Schema } from "@/amplify/data/resource";
import { Button, CheckboxField, Input, Label } from "@aws-amplify/ui-react";
import { useMutation } from "@tanstack/react-query";

import LoadingRing from "../LoadingRing";

const client = generateClient<Schema>();
export default function ResetPage() {
  const userMutation = useMutation({
    mutationFn: async (input: Schema["ResetHackathon"]["args"]) => {
      console.log(input);
      try {
        if (
          input.safetyCheck !== "delete hackathon" &&
          input.safetyCheck !== "create hackathon"
        ) {
          console.log(
            `must complete safety check, looking for 'delete hackathon' or 'create hackathon'`,
          );
          return;
        }
        // Here you would typically handle the submission to AWS Amplify
        const { data: statusCode, errors } =
          await client.mutations.ResetHackathon({
            ...input,
            scoringComponents: JSON.stringify(input.scoringComponents),
            scoringSidepots: JSON.stringify(input.scoringSidepots),
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
    // Convert scoringComponents and scoringSidepots to JSON strings
    data.scoringComponents = JSON.stringify(data.scoringComponents);
    data.scoringSidepots = JSON.stringify(data.scoringSidepots);
    userMutation.mutate(data);
  };

  const generateId = () => uuidv4();

  const { register, control, handleSubmit, watch, setValue, resetField } =
    useForm({
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
        resetOrCreate: true,
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
    return <LoadingRing />;
  }
  if (userMutation.isError) {
    return <div>Error, please try again later.</div>;
  }

  const resetOrCreate = watch("resetOrCreate");

  const handleCheckboxChange = (value: boolean) => {
    setValue("resetOrCreate", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full flex-col justify-center gap-4 bg-white p-4 md:p-8"
    >
      <div className="flex w-full flex-col justify-between gap-2 md:gap-12">
        <Label>Resetting or Creating Hackathon</Label>
        <CheckboxField
          label="Resetting Hackathon: "
          {...register("resetOrCreate")}
          checked={resetOrCreate}
          onChange={() => {
            handleCheckboxChange(true);
          }}
        />
        <CheckboxField
          label="Creating Hackathon: "
          {...register("resetOrCreate")}
          checked={!resetOrCreate}
          onChange={() => {
            handleCheckboxChange(false);
            resetField("resetUsers");
            resetField("resetTeams");
            resetField("resetScores");
            resetField("resetRooms");
          }}
        />
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
              onClick={() => {
                appendScoringSidepot({
                  friendlyName: "",
                  isSidepot: true,
                  id: generateId(),
                });
              }}
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
            <CheckboxField
              label="Reset Users: "
              {...register("resetUsers")}
              disabled={!resetOrCreate}
              checked={watch("resetUsers")}
            />
            <CheckboxField
              label="Reset Teams: "
              {...register("resetTeams")}
              disabled={!resetOrCreate}
              checked={watch("resetTeams")}
            />
            <CheckboxField
              label="Reset Rooms: "
              {...register("resetRooms")}
              disabled={!resetOrCreate}
              checked={watch("resetRooms")}
            />
            <CheckboxField
              label="Reset Scores: "
              {...register("resetScores")}
              disabled={!resetOrCreate}
              checked={watch("resetScores")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {resetOrCreate ? (
            <Label htmlFor="safetyCheck">
              Enter &quot;delete hackathon&quot; to confirm{" "}
            </Label>
          ) : (
            <Label htmlFor="safetyCheck">
              Enter &quot;create hackathon&quot; to confirm{" "}
            </Label>
          )}

          <div className="flex w-1/2 flex-row gap-2">
            <Input
              required
              id="safetyCheck"
              placeholder={
                resetOrCreate ? "delete hackathon" : "create hackathon"
              }
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
