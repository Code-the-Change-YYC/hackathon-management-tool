import { generateClient } from "aws-amplify/api";
import { useRouter } from "next/navigation";

import type { Schema } from "@/amplify/data/resource";
import FormFields from "@/components/LoginForm/FormFields";
import FormFieldsHeader from "@/components/LoginForm/FormFieldsHeader";
import { Flex, Input, Label, SelectField } from "@aws-amplify/ui-react";
import { useMutation } from "@tanstack/react-query";

const client = generateClient<Schema>();
export default function PersonalFormFields() {
  const router = useRouter();
  const userMutation = useMutation({
    mutationFn: async (input: Schema["User"]["type"]) => {
      (await client.models.User.create(input)).data;
    },
    onSuccess: () => {
      router.push("/");
    },
  });
  const institutions = [
    "University of Calgary",
    "Mount Royal University",
    "SAIT",
    "Other",
    "None",
  ];
  // Not really typesafe, but it's for a hackathon...
  const submitForm = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const user = {
      ...data,
      meals: data.meals === "yes" ? true : false,
    } as Schema["User"]["type"];
    try {
      userMutation.mutate(user);
    } catch (e) {}
  };
  return (
    <form
      action={submitForm}
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
          />
        </div>
        <div className="flex w-1/2 flex-col gap-2">
          <Label htmlFor="lastName">* Last Name:</Label>
          <Input
            required
            id="lastName"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
      </div>
      <SelectField name="institution" label="Which institution do you go to?">
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
        <Input id="allergies" name="allergies" placeholder="e.g. peanuts" />
      </Flex>
      <FormFields mutationStatus={userMutation.status} />
    </form>
  );
}
