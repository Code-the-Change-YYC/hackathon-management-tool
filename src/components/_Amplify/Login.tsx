"use client";

import type { AuthUser } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import FormFields from "@/components/_Amplify/LoginForm/FormFields";
import Header from "@/components/_Amplify/LoginForm/Header";
import { withAuthenticator } from "@aws-amplify/ui-react";
import type { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";
import type { AuthContext } from "@aws-amplify/ui/dist/types/machines/authenticator/types";
import type { SignUpAttribute } from "@aws-amplify/ui/dist/types/types/authenticator/attributes";

const components: DefaultComponents = {
  Header,
  SignUp: {
    FormFields,
  },
};

const someAsyncFunction = async () => {};
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
