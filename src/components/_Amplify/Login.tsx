"use client";

import type { AuthUser } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import FormFields from "@/components/_Amplify/LoginForm/FormFields";
import Header from "@/components/_Amplify/LoginForm/Header";
import { Authenticator } from "@aws-amplify/ui-react";
import type { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";

const components: DefaultComponents = {
  Header,
  SignUp: {
    FormFields,
  },
};

export default function Login({ user }: { user?: AuthUser }) {
  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);
  return <Authenticator initialState="signUp" components={components} />;
}
