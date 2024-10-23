"use client";

import Link from "next/link";

import FormFieldsHeader from "@/components/LoginForm/FormFieldsHeader";
import PersonalFormFields from "@/components/LoginForm/PersonalFormFields";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import type { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";

export default function Register() {
  const components: DefaultComponents = {
    SignUp: {
      Header: () => <FormFieldsHeader />,
    },
    Footer: () => {
      const { toSignIn } = useAuthenticator();
      return (
        <Link
          className="flex w-full justify-center py-4 text-center hover:underline"
          href="/login"
          onClick={() => {
            toSignIn();
          }}
        >
          Already have an account?
        </Link>
      );
    },
  };
  return (
    <Authenticator
      socialProviders={["google"]}
      initialState={"signUp"}
      signUpAttributes={[]}
      components={components}
    >
      {({ user }) => {
        if (user) return <PersonalFormFields user={user} />;
        return <div>Error, please try again later</div>;
      }}
    </Authenticator>
  );
}
