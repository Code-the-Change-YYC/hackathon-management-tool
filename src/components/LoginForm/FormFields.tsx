import { signOut } from "aws-amplify/auth";

// import { generateClient } from "aws-amplify/data";
// import type { Schema } from "@/amplify/data/resource";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

// const client = generateClient<Schema>(); // use this Data client for CRUDL requests
const FormFields = () => {
  const { toSignUp } = useAuthenticator();
  return (
    <>
      <div
        className="relative flex w-full flex-col justify-center gap-4 rounded-3xl bg-white
    "
      >
        <Authenticator.SignUp.FormFields />
        <div className=" flex w-full justify-end ">
          <button
            onClick={() => void signOut()}
            className=" rounded-full border-4 border-white bg-awesomer-purple px-4 py-1 font-semibold text-white shadow-lg hover:opacity-90 md:px-8 md:py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => toSignUp()}
            className=" rounded-full border-4 border-white bg-awesomer-purple px-4 py-1 font-semibold text-white  shadow-lg hover:opacity-90 md:px-8 md:py-2"
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};
export default FormFields;
