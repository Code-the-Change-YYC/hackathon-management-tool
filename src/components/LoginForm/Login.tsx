"use client";

import type { AuthUser } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import FormFieldsHeader from "@/components/LoginForm/FormFieldsHeader";
import PersonalFormFields from "@/components/LoginForm/PersonalFormFields";
import type { AuthenticatorProps } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import type { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";
import { type AuthContext } from "@aws-amplify/ui/dist/types";

export default function Login({ user }: { user?: AuthUser }) {
  useEffect(() => {
    if (user) {
      console.log(user);
      // User needs to complete their registration before redirecting
      redirect("/");
    }
  }, [user]);
  const components: DefaultComponents = {
    SignUp: {
      Header: () => <FormFieldsHeader className=" -mb-2 px-8 pt-4" />,
    },
  };

  const services: AuthContext["services"] = {
    // async handleSignUp(formData) {
    //   const { username, password, options } = formData;
    //   console.log("User Attributes:", options);
    //   const signUpReturn = await signUp({
    //     username,
    //     password,
    //     options: {
    //       userAttributes: {},
    //       autoSignIn: true,
    //     },
    //   });
    //   if (signUpReturn) {
    //     console.log(options);
    //     // Do Create User call here
    //     // TODO: if the user is created successfully, return signUpReturn
    //     // TODO: else throw an error
    //     return signUpReturn;
    //   }
    //   throw new Error("Sign up failed");
    // },
    // async handleConfirmSignUp(data) {
    //   // TODO: If you wanna do a flow sign up switch the page if this is succesful. (This happens after the user provides the code)
    //   return confirmSignUp(data);
    // },
  };
  const formFields: AuthenticatorProps["formFields"] = {
    signUp: {},
  };
  return (
    <Authenticator
      socialProviders={["google", "apple"]}
      // TODO: You could make this conditional based on sign up or login, so you can reuse everything you did for both. Login shouldn't need any overrides.
      initialState="signUp"
      signUpAttributes={[]}
      services={services}
      components={components}
      formFields={formFields}
    >
      <PersonalFormFields />
    </Authenticator>
  );
}
