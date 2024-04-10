import Image from "next/image";

import { Flex, Input, Label, PasswordField } from "@aws-amplify/ui-react";

const FormFields = () => {
  return (
    <div className="relative">
      <Image
        className="absolute -right-28 -top-10"
        src={"/svgs/login/Star_Icon.svg"}
        height={51}
        width={59}
        alt={""}
      />
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
      <Flex direction="column" gap="small">
        <Label htmlFor="email">*Email</Label>
        <Input id="email" name="email" placeholder="Email" />
      </Flex>
      <PasswordField name="password" label="*Password" placeholder="Password" />
    </div>
  );
};
export default FormFields;
