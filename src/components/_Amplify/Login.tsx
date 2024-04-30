"use client";

import type { AuthUser } from "aws-amplify/auth";
import { signUp } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import { type Schema } from "@/amplify/data/resource";
import FormFields from "@/components/_Amplify/LoginForm/FormFields";
import type { AuthenticatorProps } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import type { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";
import { type AuthContext } from "@aws-amplify/ui/dist/types";

const client = generateClient<Schema>(); // use this Data client for CRUDL requests

const components: DefaultComponents = {
  SignUp: {
    // TODO: Move the header fropm the FormFields component here.  (ideally a seperate file)
    Header: () => <></>,
    // TODO: This should only only include the buttons, I think. What do you think?
    FormFields,
  },
};

const services: AuthContext["services"] = {
  async handleSignUp(formData) {
    const { username, password, options } = formData;
    console.log("User Attributes:", options?.userAttributes);

    const signUpReturn = await signUp({
      username,
      password,
      options: {
        userAttributes: {},
        autoSignIn: true,
      },
    });
    if (signUpReturn) {
      console.log(options?.userAttributes);
      // Do Create User call here
      // TODO: if the user is created successfully, return signUpReturn
      // TODO: else throw an error

      return signUpReturn;
    }
    throw new Error("Sign up failed");
  },
};
const formFields: AuthenticatorProps["formFields"] = {
  signUp: {
    testUsername: {
      placeholder: "testUsername",
      isRequired: true,
      label: "testUsername",
    },
  },
};

export default function Login({ user }: { user?: AuthUser }) {
  useEffect(() => {
    if (user) {
      console.log(user);
      // User needs to complete their registration before redirecting
      redirect("/");
    }
  }, [user]);
  return (
    <Authenticator
      initialState="signUp"
      services={services}
      components={components}
      formFields={formFields}
    >
      {/* <PersonalFormFields /> */}
      <h1>Hi</h1>
    </Authenticator>
  );
}
