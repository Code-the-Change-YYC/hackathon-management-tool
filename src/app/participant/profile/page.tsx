// import { getCurrentUser, signIn } from "aws-amplify/auth";
// import { generateClient } from "aws-amplify/data";
// import UserProfile from "@/components/UserProfile/UserProfile";
// import { UserType } from "@/components/contexts/UserContext";
// import withAuthGuard from "@/components/hoc/withAuthGuard";
// // const credentials = {
// //   username: "fisayoadabs@gmail.com", // Example username (could be email or username)
// //   password: "LeadDev_2024", // Example password (ensure it's securely handled)
// // };
// // Sign In Function
// const handleSignIn = async ({
//   username,
//   password,
// }: {
//   username: string;
//   password: string;
// }) => {
//   try {
//     const { isSignedIn, nextStep } = await signIn({ username, password });
//     console.log("SignIn Success:", isSignedIn);
//     console.log(nextStep);
//   } catch (error) {
//     console.error("Error signing in:", error);
//   }
// };
// // Fetch User Data Function
// async function fetchUserData() {
//   try {
//     handleSignIn(credentials);
//     // Fetch current user details
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//       throw new Error("User is not authenticated");
//     }
//     const userId = currentUser?.username; // Assuming username is the userId
//     // Initialize client and fetch user data
//     const client = generateClient();
//     const { data, errors } = await client.models.User.get({ id: userId });
//     if (errors) throw new Error(errors[0]?.message || "Unknown error");
//     return { userData: data, error: null };
//   } catch (err) {
//     console.error("Error fetching user data:", err);
//     return {
//       userData: null,
//       error: err.message || "Failed to load user profile.",
//     };
//   }
// }
// // Profile Component
// async function Profile() {
//   const { userData, error } = await fetchUserData();
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   return <UserProfile data={userData} error={error} />;
// }
// // Export the Profile component wrapped in the AuthGuard
// export default withAuthGuard(Profile, [
//   UserType.Participant,
//   UserType.Admin,
//   UserType.Judge,
// ]);
import { confirmSignUp, getCurrentUser, signIn, signUp } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";



import UserProfile from "@/components/UserProfile/UserProfile";
import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";


// Interface for user credentials
interface Credentials {
  username: string;
  password: string;
  email: string;
}

// Sign-Up Function
const handleSignUp = async ({ username, password, email }: Credentials) => {
  try {
    const result = await signUp({
      username,
      password,
      attributes: { email }, // Add additional attributes if required
    });

    console.log("Sign-up successful:", result);
    return true;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error; // Re-throw the error to propagate
  }
};

// Confirm Sign-Up Function (if verification is required)
const handleConfirmSignUp = async ({
  username,
  code,
}: {
  username: string;
  code: string;
}) => {
  try {
    const result = await confirmSignUp(username, code);
    console.log("Confirmation successful:", result);
    return true;
  } catch (error) {
    console.error("Error during confirmation:", error);
    throw error;
  }
};

// Sign-In Function
const handleSignIn = async ({ username, password }: Credentials) => {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    if (isSignedIn) {
      console.log("Sign-in successful:", nextStep);
      return true;
    } else {
      throw new Error("Sign-in incomplete. Additional steps required.");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error; // Re-throw to propagate the error
  }
};

// Combined Sign-Up and Sign-In Function
const signUpAndSignIn = async (credentials: Credentials) => {
  try {
    // Step 1: Sign-Up
    await handleSignUp(credentials);

    // Step 2 (Optional): If confirmation is required, add confirmation logic here
    // await handleConfirmSignUp({
    //   username: credentials.username,
    //   code: "654179",
    // });

    // Step 3: Sign-In
    await handleSignIn(credentials);

    console.log("User successfully signed up and logged in.");
  } catch (error) {
    console.error("Error during sign-up or sign-in:", error);
    throw error; // Handle errors appropriately
  }
};

// Fetch User Data Function
const fetchUserData = async (credentials: Credentials) => {
  try {
    // Sign-up and Sign-in the user
    await signUpAndSignIn(credentials);

    // Fetch current user details
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User is not authenticated");
    }

    const userId = currentUser.username; // Assuming username is the userId

    // Initialize client and fetch user data
    const client = generateClient();
    const { data, errors } = await client.models.User.get({ id: userId });

    if (errors?.length) {
      throw new Error(
        errors[0]?.message || "Unknown error occurred while fetching data",
      );
    }

    return { userData: data, error: null };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      userData: null,
      error: error.message || "Failed to load user profile.",
    };
  }
};

// Profile Component
async function Profile() {
  const credentials: Credentials = {
    username: "fisayoadabs@gmail.com", // Replace with dynamic inputs
    password: "LeadDev_2024", // Replace with secure handling
    email: "fisayoadabs@gmail.com", // Add the email attribute for sign-up
  };

  const { userData, error } = await fetchUserData(credentials);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <UserProfile data={userData} error={null} />;
}

// Export the Profile component wrapped in the AuthGuard
export default withAuthGuard(Profile, [
  UserType.Participant,
  UserType.Admin,
  UserType.Judge,
]);

// import { getCurrentUser, signIn } from "aws-amplify/auth";
// import { generateClient } from "aws-amplify/data";

// import UserProfile from "@/components/UserProfile/UserProfile";
// import { UserType } from "@/components/contexts/UserContext";
// import withAuthGuard from "@/components/hoc/withAuthGuard";

// interface Credentials {
//   username: string;
//   password: string;
// }

// // Sign-In Function
// const handleSignIn = async ({ username, password }: Credentials) => {
//   try {
//     const { isSignedIn, nextStep } = await signIn({ username, password });
//     if (isSignedIn) {
//       console.log("Sign-in successful:", nextStep);
//       return true;
//     } else {
//       throw new Error("Sign-in incomplete. Additional steps required.");
//     }
//   } catch (error) {
//     console.error("Error during sign-in:", error);
//     throw error; // Re-throw to propagate the error
//   }
// };

// // Fetch User Data Function
// const fetchUserData = async (credentials: Credentials) => {
//   try {
//     // Sign in the user
//     await handleSignIn(credentials);

//     // Fetch current user details
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//       throw new Error("User is not authenticated");
//     }

//     const userId = currentUser.username; // Assuming username is the userId

//     // Initialize client and fetch user data
//     const client = generateClient();
//     const { data, errors } = await client.models.User.get({ id: userId });

//     if (errors?.length) {
//       throw new Error(
//         errors[0]?.message || "Unknown error occurred while fetching data",
//       );
//     }

//     return { userData: data, error: null };
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     return {
//       userData: null,
//       error: error.message || "Failed to load user profile.",
//     };
//   }
// };

// // Profile Component
// async function Profile() {
//   const credentials: Credentials = {
//     username: "random@gmail.com", // Replace with dynamic inputs
//     password: "random", // Replace with secure handling
//   };

//   const { userData, error } = await fetchUserData(credentials);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return <UserProfile data={userData} error={null} />;
// }

// // Export the Profile component wrapped in the AuthGuard
// export default withAuthGuard(Profile, [
//   UserType.Participant,
//   UserType.Admin,
//   UserType.Judge,
// ]);