"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import FormFieldsHeader from "@/components/LoginForm/FormFieldsHeader";
import PersonalFormFields from "@/components/LoginForm/PersonalFormFields";
import type { AuthenticatorProps } from "@aws-amplify/ui-react";
import {
  Authenticator,
  Button,
  View,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import type { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";
import { type AuthContext } from "@aws-amplify/ui/dist/types";

export default function Login() {
  const components: DefaultComponents = {
    SignUp: {
      Header: () => <FormFieldsHeader />,
    },
    SignIn: {
      Header: () => <FormFieldsHeader />,
    },
    Footer: () => {
      const { toSignIn, toSignUp } = useAuthenticator();
      const [signIn, setSignIn] = useState(false);
      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={() => {
              signIn ? toSignIn() : toSignUp();
              setSignIn(!signIn);
            }}
            size="small"
          >
            {signIn
              ? "Already have an account?"
              : "Don't have an account? Sign up"}
          </Button>
        </View>
      );
    },
  };
  const pathname = usePathname();
  const services: AuthContext["services"] = {};
  const formFields: AuthenticatorProps["formFields"] = {
    signUp: {},
  };

  return (
    <Authenticator
      socialProviders={["google", "apple"]}
      initialState={pathname === "/login" ? "signIn" : "signUp"}
      signUpAttributes={[]}
      services={services}
      components={components}
      formFields={formFields}
    >
      {({ user }) => {
        return <PersonalFormFields user={user} />;
      }}
    </Authenticator>
  );
}
