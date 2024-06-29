"use server";

// actions.ts

export const getHackathonEditCode = () => {
  return process.env.EDIT_HACKATHON_CODE;
};
