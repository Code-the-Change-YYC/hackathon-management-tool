import type { AuthUser } from "aws-amplify/auth";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import type { Schema } from "@/amplify/data/resource";
import { client } from "@/app/QueryProvider";
import FormFieldButtons from "@/components/LoginForm/FormFieldButtons";
import FormFieldsHeader from "@/components/LoginForm/FormFieldsHeader";
import { Flex, Input, Label, SelectField } from "@aws-amplify/ui-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserType, useUser } from "../contexts/UserContext";
import KevinLoadingRing from "../KevinLoadingRing";

export default function PersonalFormFields({ user }: { user: AuthUser }) {
  const router = useRouter();
  const { isPending, isError, data } = useQuery({
    queryKey: ["User", user?.userId],
    queryFn: async () => {
      const response = await client.models.User.get({
        id: user.userId as string,
      });

      if (response.errors) throw new Error(response.errors[0].message);

      return response.data;
    },
  });
  const { revalidateUser } = useUser();
  const userMutation = useMutation({
    mutationKey: ["User", user?.userId],
    mutationFn: async (input: Schema["User"]["type"]) => {
      const toastObj = toast.loading("Updating user information...");
      const response = await client.models.User.update({
        id: user.userId,
        firstName: input.firstName,
        lastName: input.lastName,
        institution: input.institution,
        willEatMeals: input.willEatMeals,
        allergies: input.allergies,
        completedRegistration: true,
      });
      toast.dismiss(toastObj);
      if (response.errors) {
        throw Error(response.errors[0].message);
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("User information updated successfully");
      revalidateUser();
      router.push("/register/team");
    },
    onError: (error) => {
      toast.error(
        `Failed to update user information ${(error as Error).message}. `,
      );
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

  const debouncedUpdateForm = useMemo(
    () =>
      debounce((name: string, value: any) => {
        if (name === "willEatMeals") {
          setFormState((prevState) => ({
            ...prevState,
            [name]: value === "Yes",
          }));
        } else {
          setFormState((prevState) => ({ ...prevState, [name]: value }));
        }
      }, 500),
    [],
  );

  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    debouncedUpdateForm(name, value);
  };

  console.log(isPending);
  if (isPending) {
    return (
      <div className="mt-16 flex w-full items-center justify-center">
        <KevinLoadingRing />
      </div>
    );
  }
  if (isError) {
    return <div>Error, please try again later.</div>;
  }
  if (data?.teamId && data?.completedRegistration) {
    if (data?.role === UserType.Admin) {
      router.push("/admin");
      return null;
    } else if (data?.role === UserType.Judge) {
      router.push("/judging");
      return null;
    } else {
      router.push("/participant/profile");
      return null;
    }
  }
  if (data?.teamId) {
    router.push(`/register/team/${data.teamId}`);
    return null;
  }
  if (data?.completedRegistration) {
    if (data?.role === UserType.Admin) {
      router.push("/admin");
      return null;
    } else if (data?.role === UserType.Judge) {
      router.push("/judging");
      return null;
    } else {
      router.push("/register/team");
      return null;
    }
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
        <option disabled selected>
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
