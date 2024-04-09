import Image from "next/image";

import {
  Flex,
  Input,
  Label,
  PasswordField,
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
    <div className="relative">
      <Image
        className="absolute -right-28 -top-10"
        src={"/svgs/login/Star_Icon.svg"}
        height={51}
        width={59}
        alt={""}
      />{" "}
      <Image
        className="absolute -bottom-24 -left-28"
        src={"/svgs/login/Star_Icon.svg"}
        height={51}
        width={59}
        alt={""}
      />
      <div className=" text-2xl font-semibold xl:text-4xl">
        <Flex direction={"column"}>
          <Flex>
            <Image
              className="-mr-4"
              src="/svgs/login/vector_112.svg"
              alt=""
              width={28}
              height={21}
            />
            <div className=" text-nowrap">Individual Registration</div>
          </Flex>
          <Image
            src="/svgs/login/vector_113.svg"
            alt=""
            className="-mt-4 ml-8"
            width={130}
            height={17}
          />
        </Flex>
      </div>
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
      <Flex direction="column" gap="small">
        <Label htmlFor="email">*Email</Label>
        <Input id="email" name="email" placeholder="Email" />
      </Flex>
      <PasswordField name="password" label="*Password" placeholder="Password" />
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
    </div>
  );
};
export default FormFields;
