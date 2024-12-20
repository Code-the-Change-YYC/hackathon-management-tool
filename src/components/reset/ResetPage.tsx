"use client";

import { generateClient } from "aws-amplify/api";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import type { Schema } from "@/amplify/data/resource";
import { Button, CheckboxField, Input, Label } from "@aws-amplify/ui-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import LoadingRing from "../LoadingRing";

const client = generateClient<Schema>();
export default function ResetPage() {
  const userMutation = useMutation({
    mutationFn: async (input: Schema["ResetHackathon"]["args"]) => {
      console.log(input);

      try {
        if (input.safetyCheck !== "i love code the change") {
          console.log(
            `must complete safety check, looking for 'i love code the change'`,
          );
          return;
        }
        // Here you would typically handle the submission to AWS Amplify
        const toastObj = toast.loading("Resetting...");
        const { data: statusCode, errors } =
          await client.mutations.ResetHackathon({
            ...input,
          });
        if (errors) {
          toast.dismiss(toastObj);
          toast.error("Error resetting hackathon");
          console.log(errors);
        }
        void statusCode;
        toast.dismiss(toastObj);
        toast.success("Hackathon reset successfully");
        return;
      } catch (error) {
        console.error("Error updating user", error);
        throw error;
      }
    },
  });

  const hackathonData = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["Hackathon"],
    queryFn: async () => {
      const response = await client.models.Hackathon.list();

      if (response.errors) throw new Error(response.errors[0].message);

      if (response.data[0]) {
        setValue("scoringComponents", response.data[0].scoringComponents || []);
        setValue("scoringSidepots", response.data[0].scoringSidepots || []);
        setValue("startDate", response.data[0].startDate || "");
        setValue("endDate", response.data[0].endDate || "");
        return response.data[0];
      } else return [];
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
        resetting: true,
        creating: false,
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

  if (hackathonData.isPending) return <LoadingRing />;

  if (userMutation.isPending) return <LoadingRing />;

  if (userMutation.isError) return <div>Error, please try again later.</div>;

  const [resetting, creating] = watch(["resetting", "creating"]);

  const handleCheckboxChange = (value: keyof Schema["Hackathon"]["type"]) => {
    setValue("resetting", false);
    setValue("creating", false);

    setValue(value as keyof Schema["ResetHackathon"]["args"], true);
  };

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
          <div className="mr-24 flex min-w-96 flex-col gap-2">
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
          <div className="mr-24 flex min-w-20 flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label>Resetting or Creating Hackathon</Label>
              <CheckboxField
                label="Resetting Hackathon: "
                {...register("resetting")}
                checked={resetting}
                onChange={() => {
                  handleCheckboxChange(
                    "resetting" as keyof Schema["Hackathon"]["type"],
                  );
                }}
              />
              <CheckboxField
                label="Creating Hackathon: "
                {...register("resetting")}
                checked={creating}
                onChange={() => {
                  handleCheckboxChange(
                    "creating" as keyof Schema["Hackathon"]["type"],
                  );
                  resetField("resetUsers");
                  resetField("resetTeams");
                  resetField("resetScores");
                  resetField("resetRooms");
                }}
              />
            </div>
          </div>
          {resetting && (
            <div className="flex w-1/3 flex-col gap-2">
              <Label>Reset Fields</Label>
              <CheckboxField
                label="Reset Users: "
                {...register("resetUsers")}
                checked={watch("resetUsers")}
              />
              <CheckboxField
                label="Reset Teams: "
                {...register("resetTeams")}
                checked={watch("resetTeams")}
              />
              <CheckboxField
                label="Reset Rooms: "
                {...register("resetRooms")}
                checked={watch("resetRooms")}
              />
              <CheckboxField
                label="Reset Scores: "
                {...register("resetScores")}
                checked={watch("resetScores")}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="safetyCheck">
            Enter &quot;i love code the change&quot; to confirm{" "}
          </Label>

          <div className="flex w-1/2 flex-row gap-2">
            <Input
              required
              id="safetyCheck"
              placeholder="i love code the change"
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
