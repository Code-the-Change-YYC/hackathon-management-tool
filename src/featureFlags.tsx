// This file is used to manage feature flags

// Enable landing page

export const enableLandingPage =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_LANDING_PAGE_ENABLE === "TRUE";

// Enable user profile

export const enableUserProfile = true;
