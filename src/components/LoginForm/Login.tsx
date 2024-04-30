"use client";

import type { AuthUser } from "aws-amplify/auth";
import { confirmSignUp, signUp } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import { type Schema } from "@/amplify/data/resource";
import FormFields from "@/components/LoginForm/FormFields";
import type { AuthenticatorProps } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import type { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";
import { type AuthContext } from "@aws-amplify/ui/dist/types";

const client = generateClient<Schema>(); // use this Data client for CRUDL requests

const components: DefaultComponents = {
  SignUp: {
    // TODO: Move the header fropm the FormFields component here.  (ideally a seperate file)
    Header: () => <></>,
    // TODO: This should only only include the buttons, I think. What do you think? You may be able to hide the big button using CSS
    FormFields,
  },
};

// const services: AuthContext["services"] = {
//   async handleSignUp(formData) {
//     const { username, password, options } = formData;
//     console.log("User Attributes:", options);

//     const signUpReturn = await signUp({
//       username,
//       password,
//       options: {
//         userAttributes: {},
//         autoSignIn: true,
//       },
//     });
//     if (signUpReturn) {
//       console.log(options);
//       // Do Create User call here
//       // TODO: if the user is created successfully, return signUpReturn
//       // TODO: else throw an error

//       return signUpReturn;
//     }
//     throw new Error("Sign up failed");
//   },
//   async handleConfirmSignUp(data) {
//     // TODO: If you wanna do a flow sign up switch the page if this is succesful. (This happens after the user provides the code)
//     return confirmSignUp(data);
//   },
// };
const formFields: AuthenticatorProps["formFields"] = {
  signUp: {
    //   testUsername: {
    //     placeholder: "testUsername",
    //     isRequired: true,
    //     label: "testUsername",
    //   },
    //   givenName: {
    //     placeholder: "First Name",
    //     isRequired: true,
    //     label: "First Name",
    //   },
    //   familyName: {
    //     placeholder: "Last Name",
    //     isRequired: true,
    //     label: "Last Name",
    // },
    username: {
      placeholder: "Email",
      isRequired: true,
      label: "Email",
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
      socialProviders={["google", "apple"]}
      // TODO: You could make this conditional based on sign up or login, so you can reuse everything you did for both. Login shouldn't need any overrides.
      initialState="signUp"
      signUpAttributes={[]}
      // services={services}
      // components={components}
      formFields={formFields}
    >
      {/* <PersonalFormFields /> */}
      <h1>Hi</h1>
    </Authenticator>
  );
}
