import { generateClient } from "aws-amplify/api";

import type { Schema } from "@/amplify/data/resource";
import FormFields from "@/components/LoginForm/FormFields";
import FormFieldsHeader from "@/components/LoginForm/FormFieldsHeader";
import { Flex, Input, Label, SelectField } from "@aws-amplify/ui-react";

// import { useMutation } from "@tanstack/react-query";

const client = generateClient<Schema>();
export default function PersonalFormFields() {
  // const mutation = useMutation({
  //   mutationFn: (newUser: CreateUserInput) => {
  //     console.log(newUser);
  //     return client.models.User.create(newUser);
  //   },
  // });
  const institutions = [
    "University of Calgary",
    "Mount Royal University",
    "SAIT",
    "Other",
    "None",
  ];
  const submitForm = (formData: FormData) => {
    const data = {
      firstName: formData.get("first_name") as string,
      lastName: "string", // .....
      institution: "string",
      meals: true,
      allergies: "string",
      id: "string",
      createdAt: "string",
      updatedAt: "string",
    };
    const returnValue = client.models.User.create(
      data,
      //   {
      //   firstName: "string",
      //   lastName: "string",
      //   institution: "string",
      //   meals: true,
      //   allergies: "string",
      // }
    );
    console.log(returnValue.then((r) => console.log(r)));
  };
  return (
    <>
      <form
        action={submitForm}
        className="relative flex w-full flex-col justify-center gap-4 rounded-3xl bg-white p-4 md:p-8
    "
      >
        <FormFieldsHeader className={" -ml-4 -mt-0 p-0"} />
        <div className="flex flex-row justify-between gap-2 md:gap-12 ">
          <div className="flex w-1/2 flex-col gap-2">
            <Label htmlFor="first_name">* First Name:</Label>
            <Input
              required
              id="first_name"
              name="first_name"
              placeholder="First Name"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <Label htmlFor="last_name">* Last Name:</Label>
            <Input
              required
              id="last_name"
              name="last_name"
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
          name="require_food"
          label="* Do you want provided food at the hackathon?"
        >
          <option selected disabled>
            Select an option
          </option>
          <option value={"yes"}>Yes</option>
          <option value={"no"}>No</option>
          <option value={"unsure"}>Unsure</option>
        </SelectField>
        <Flex direction="column" gap="small">
          <Label htmlFor="allergies">
            If you wanted provided food, please indicate any allergies:
          </Label>
          <Input id="allergies" name="allergies" placeholder="e.g. peanuts" />
        </Flex>
        <FormFields />
      </form>
    </>
  );
}
