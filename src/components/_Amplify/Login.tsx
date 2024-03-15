"use client";

import type { AuthUser } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import {
  Authenticator,
  Flex,
  Input,
  Label,
  SelectField,
  View,
  useTheme,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import type { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";
import type { AuthContext } from "@aws-amplify/ui/dist/types/machines/authenticator/types";
import type { SignUpAttribute } from "@aws-amplify/ui/dist/types/types/authenticator/attributes";

const components: DefaultComponents = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <div className=" text-6xl font-bold text-white">
          Register for Hack the Change{" "}
          <span className="text-green-200">2024</span>
        </div>
      </View>
    );
  },
  SignUp: {
    FormFields() {
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
              <Input
                id="first_name"
                name="first_name"
                placeholder="First Name"
              />
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
    },
  },
};
const someAsyncFunction = async () => {
  // Implementation of the async function
};

const services: AuthContext["services"] = {
  async validateCustomSignUp(formData) {
    if (!formData.acknowledgement) {
      return {
        acknowledgement: "You must agree to the Terms and Conditions",
      };
    }
    await someAsyncFunction();
  },
};
const signUpAttributes: SignUpAttribute[] = [];

function Login({ user }: { user?: AuthUser }) {
  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);
  return null;
}

export default withAuthenticator(Login, {
  components: components,
  variation: "default",
  initialState: "signIn",
  signUpAttributes: signUpAttributes,
  services: services,
});
