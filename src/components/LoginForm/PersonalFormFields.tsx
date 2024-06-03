import { generateClient } from "aws-amplify/api";
import type { AuthUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Schema } from "@/amplify/data/resource";
import FormFieldButtons from "@/components/LoginForm/FormFieldButtons";
import FormFieldsHeader from "@/components/LoginForm/FormFieldsHeader";
import { Flex, Input, Label, SelectField } from "@aws-amplify/ui-react";
import { useMutation, useQuery } from "@tanstack/react-query";

const client = generateClient<Schema>();
export default function PersonalFormFields({ user }: { user: AuthUser }) {
  const router = useRouter();
  const { isPending, isError, data } = useQuery({
    queryKey: ["user", user?.userId],
    queryFn: async () => {
      return (await client.models.User.get({ id: user.userId as string })).data;
    },
  });
  const userMutation = useMutation({
    mutationFn: async (input: Schema["User"]["type"]) => {
      await client.models.User.update({
        id: user.userId,
        firstName: input.firstName,
        lastName: input.lastName,
        institution: input.institution,
        meals: input.meals,
        allergies: input.allergies,
        completedRegistration: true,
      });
    },
    onSuccess: () => {
      // TODO: ADD TOAST
      router.push("/participant/profile");
    },
  });
  const institutions = [
    "University of Calgary",
    "Mount Royal University",
    "SAIT",
    "Other",
    "None",
  ];
  const [formState, setFormState] = useState<Schema["User"]["type"]>({
    id: user?.userId,
  } as Schema["User"]["type"]);
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userMutation.mutate(formState);
  };
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const updateSelectInput = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    if (name === "meals") {
      setFormState((prevState) => ({ ...prevState, [name]: value === "yes" }));
    }
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  if (isPending) {
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
  if (isError) {
    return <div>Error, please try again later.</div>;
  }
  if (data?.completedRegistration) {
    router.push("/participant/profile");
    return null;
  }
  return (
    <form
      onSubmit={submitForm}
      className="relative flex w-full flex-col justify-center gap-4 rounded-3xl bg-white p-4 md:p-8"
    >
      <FormFieldsHeader className={" -ml-4 -mt-0 p-0"} />
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
        name="institution"
        label="Which institution do you go to?"
        value={formState?.institution ?? "Select Insitution"}
        onChange={(e) => updateSelectInput(e)}
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
        name="meals"
        label="* Do you want provided food at the hackathon?"
        value={(formState?.meals as unknown as string) ?? "Select an option"}
        onChange={(e) => updateSelectInput(e)}
      >
        <option selected disabled>
          Select an option
        </option>
        <option value={"yes"}>Yes</option>
        <option value={"no"}>No</option>
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
