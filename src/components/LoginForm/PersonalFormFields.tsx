import type { AuthUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { Id } from "react-toastify";
import { toast } from "react-toastify";

import type { Schema } from "@/amplify/data/resource";
import { client } from "@/app/QueryProvider";
import FormFieldButtons from "@/components/LoginForm/FormFieldButtons";
import FormFieldsHeader from "@/components/LoginForm/FormFieldsHeader";
import { Flex, Input, Label, SelectField } from "@aws-amplify/ui-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../LoadingSpinner";

export default function PersonalFormFields({ user }: { user: AuthUser }) {
  const router = useRouter();
  const { isPending, isError, data } = useQuery({
    queryKey: ["User", user?.userId],
    queryFn: async () => {
      return (await client.models.User.get({ id: user.userId as string })).data;
    },
  });
  const toastRef = useRef<Id>("");
  const userMutation = useMutation({
    mutationKey: ["User", user?.userId],
    mutationFn: async (input: Schema["User"]["type"]) => {
      toastRef.current = toast.loading("Updating user information...");
      return await client.models.User.update({
        id: user.userId,
        firstName: input.firstName,
        lastName: input.lastName,
        institution: input.institution,
        willEatMeals: input.willEatMeals,
        allergies: input.allergies,
      });
    },
    onSuccess: () => {
      toast.update(toastRef.current, {
        render: "User information updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      router.push("/register/team");
    },
    onError: (error) => {
      toast.update(toastRef.current, {
        render: "Failed to update user information",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

      console.error("Error updating user", error);
    },
  });
  const institutions = [
    "University of Calgary",
    "Mount Royal University",
    "SAIT",
    "Other",
    "None",
  ];
  enum MealOptions {
    "Yes" = "Yes",
    "No" = "No",
  }
  const [formState, setFormState] = useState<Schema["User"]["type"]>({
    id: user?.userId,
  } as Schema["User"]["type"]);
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    userMutation.mutate(formState);
  };
  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    if (name === "willEatMeals") {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value === MealOptions.Yes,
      }));
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  if (isPending) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error, please try again later.</div>;
  }
  if (data?.teamId) {
    router.push(`/register/team/${data.teamId}`);
    return null;
  }
  if (data?.completedRegistration) {
    router.push("/register/team");
    return null;
  }
  return (
    <form
      onSubmit={submitForm}
      className="relative flex w-full flex-col justify-center gap-4 rounded-3xl bg-white p-4 md:p-8"
    >
      <FormFieldsHeader />
      <div className="flex flex-row justify-between gap-2 md:gap-12 ">
        <div className="flex w-1/2 flex-col gap-2">
          <Label htmlFor="firstName">* First Name:</Label>
          <Input
            required
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formState?.firstName ?? ""}
            onChange={(e) => updateForm(e)}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-2">
          <Label htmlFor="lastName">* Last Name:</Label>
          <Input
            required
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formState?.lastName ?? ""}
            onChange={(e) => updateForm(e)}
          />
        </div>
      </div>
      <SelectField
        required
        name="institution"
        label="Which institution do you go to?"
        value={formState?.institution ?? "Select Insitution"}
        onChange={(e) => updateForm(e)}
      >
        <option selected disabled>
          Select Insitution
        </option>
        {institutions.map((institution) => (
          <option key={institution} value={institution}>
            {institution}
          </option>
        ))}
      </SelectField>
      <SelectField
        required
        name="willEatMeals"
        label="* Do you want provided food at the hackathon?"
        defaultValue="Select an option"
        value={
          "willEatMeals" in formState
            ? formState.willEatMeals
              ? "Yes"
              : "No"
            : "Select an option"
        }
        onChange={(e) => updateForm(e)}
      >
        <option selected disabled>
          Select an option
        </option>
        {(Object.keys(MealOptions) as Array<keyof typeof MealOptions>).map(
          (mealOption) => (
            <option key={mealOption} value={mealOption}>
              {mealOption}
            </option>
          ),
        )}
      </SelectField>
      <Flex direction="column" gap="small">
        <Label htmlFor="allergies">
          If you wanted provided food, please indicate any allergies:
        </Label>
        <Input
          id="allergies"
          name="allergies"
          placeholder="e.g. peanuts"
          value={formState?.allergies ?? ""}
          onChange={(e) => updateForm(e)}
        />
      </Flex>
      <FormFieldButtons mutationStatus={userMutation.status} />
    </form>
  );
}
