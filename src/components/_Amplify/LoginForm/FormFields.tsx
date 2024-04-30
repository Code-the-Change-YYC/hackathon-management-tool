import Image from "next/image";

import {
  Authenticator,
  Flex,
  Input,
  Label,
  SelectField,
  useAuthenticator,
} from "@aws-amplify/ui-react";

const FormFields = () => {
  const { toSignUp } = useAuthenticator();
  const institutions = [
    "University of Calgary",
    "Mount Royal University",
    "SAIT",
    "Other",
    "None",
  ];
  return (
    <>
      <div
        className="relative flex w-full flex-col justify-center gap-4 rounded-3xl bg-white p-4 md:p-8
    "
      >
        <Image
          className="absolute -right-28 top-0"
          src={"/svgs/login/Star_Icon.svg"}
          height={51}
          width={59}
          alt={""}
        />{" "}
        <Image
          className="absolute -left-28 bottom-0"
          src={"/svgs/login/Star_Icon.svg"}
          height={51}
          width={59}
          alt={""}
        />
        <div className="text-lg font-semibold md:text-2xl xl:text-4xl">
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
        {/* <div className="flex flex-row justify-between gap-2 md:gap-12 ">
          <div className="flex w-1/2 flex-col gap-2">
            <Label htmlFor="first_name">* First Name:</Label>
            <Input id="first_name" name="first_name" placeholder="First Name" />
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <Label htmlFor="last_name">* Last Name:</Label>
            <Input id="last_name" name="last_name" placeholder="Last Name" />
          </div>
        </div> */}
        <Authenticator.SignUp.FormFields />
        {/* <Authenticator.Provider /> */}
        {/* <SelectField name="institution" label="Which institution do you go to?">
          <option selected disabled>
            Select Insitution
          </option>
          {institutions.map((institution) => (
            <option key={institution} value={institution}>
              {institution}
            </option>
          ))}
        </SelectField> */}
        {/* <SelectField
          name="require_food"
          label="* Do you want provided food at the hackathon?"
        >
          <option selected disabled>
            Select an option
          </option>
          <option value={"yes"}>Yes</option>
          <option value={"no"}>No</option>
          <option value={"unsure"}>Unsure</option>
        </SelectField> */}
        {/* <Flex direction="column" gap="small">
          <Label htmlFor="allergies">
            * If you wanted provided food, please indicate any allergies:
          </Label>
          <Input id="allergies" name="allergies" placeholder="e.g. peanuts" />
        </Flex> */}
        <div className=" flex w-full justify-end ">
          <button className=" rounded-full border-4 border-white bg-awesomer-purple px-4 py-1 font-semibold text-white shadow-lg hover:opacity-90 md:px-8 md:py-2">
            Cancel
          </button>
          <button
            onClick={() => toSignUp()}
            className=" rounded-full border-4 border-white bg-awesomer-purple px-4 py-1 font-semibold text-white  shadow-lg hover:opacity-90 md:px-8 md:py-2"
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};
export default FormFields;
