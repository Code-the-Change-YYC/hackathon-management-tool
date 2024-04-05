import {
  Authenticator,
  Flex,
  Input,
  Label,
  SelectField,
} from "@aws-amplify/ui-react";

const FormFields = () => {
  const institutions = [
    "University of Calgary",
    "Mount Royal University",
    "SAIT",
    "Other",
    "None",
  ];
  return (
    <>
      <Flex>
        <Flex direction="column" gap="small">
          <Label htmlFor="first_name">* First Name:</Label>
          <Input id="first_name" name="first_name" placeholder="First Name" />
        </Flex>
        <Flex direction="column" gap="small">
          <Label htmlFor="last_name">* Last Name:</Label>
          <Input id="last_name" name="last_name" placeholder="Last Name" />
        </Flex>
      </Flex>

      {/* Re-use default `Authenticator.SignUp.FormFields` */}
      <Authenticator.SignUp.FormFields />

      <SelectField label="Which institution do you go to?">
        <option selected disabled>
          Select Insitution
        </option>
        {institutions.map((institution) => (
          <option key={institution} value={institution}>
            {institution}
          </option>
        ))}
      </SelectField>
      <SelectField label="* Do you want provided food at the hackathon?">
        <option selected disabled>
          Select an option
        </option>
        <option value={"yes"}>Yes</option>
        <option value={"no"}>No</option>
        <option value={"unsure"}>Unsure</option>
      </SelectField>
      <Flex direction="column" gap="small">
        <Label htmlFor="allergies">
          * If you wanted provided food, please indicate any allergies:
        </Label>
        <Input id="allergies" name="allergies" placeholder="e.g. peanuts" />
      </Flex>
    </>
  );
};
export default FormFields;
