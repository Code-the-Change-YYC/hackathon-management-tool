"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FormFieldsHeader from "@/components/LoginForm/FormFieldsHeader";
import PersonalFormFields from "@/components/LoginForm/PersonalFormFields";
import type { AuthenticatorProps } from "@aws-amplify/ui-react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import type { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";
import { type AuthContext } from "@aws-amplify/ui/dist/types";

export default function Login() {
  const pathname = usePathname();

  const components: DefaultComponents = {
    SignIn: {
      Header: () => <FormFieldsHeader />,
    },
    SignUp: {
      Header: () => <FormFieldsHeader />,
    },
    Footer: () => {
      const { toSignIn, toSignUp } = useAuthenticator();
      return (
        <Link
          className="flex w-full justify-center py-4 text-center hover:underline"
          href={pathname === "/login" ? "/register" : "/login"}
          onClick={() => {
            pathname === "/login" ? toSignUp() : toSignIn();
          }}
        >
          {pathname === "/register"
            ? "Already have an account?"
            : "Don't have an account? Sign up"}
        </Link>
      );
    },
  };
  const services: AuthContext["services"] = {};
  const formFields: AuthenticatorProps["formFields"] = {
    signUp: {},
  };
  return (
    <Authenticator
      socialProviders={["google"]}
      initialState={pathname === "/login" ? "signIn" : "signUp"}
      signUpAttributes={[]}
      services={services}
      components={components}
      formFields={formFields}
    >
      {({ user }) => {
        if (user) return <PersonalFormFields user={user} />;
        return <div>Error, please try again later</div>;
      }}
    </Authenticator>
  );
}
