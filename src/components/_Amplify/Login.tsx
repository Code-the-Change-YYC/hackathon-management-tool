"use client";

import type { AuthUser } from "aws-amplify/auth";
import { useEffect } from "react";

import FormFields from "@/components/_Amplify/LoginForm/FormFields";
import PersonalFormFields from "@/components/_Amplify/LoginForm/PersonalFormFields";
import { Authenticator } from "@aws-amplify/ui-react";
import type { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";

const components: DefaultComponents = {
  SignUp: {
    FormFields,
  },
};

export default function Login({ user }: { user?: AuthUser }) {
  useEffect(() => {
    if (user) {
      console.log(user);
      // User needs to complete their registration before redirecting
      // redirect("/");
    }
  }, [user]);
  return (
    <Authenticator initialState="signUp" components={components}>
      <PersonalFormFields />
    </Authenticator>
  );
}
