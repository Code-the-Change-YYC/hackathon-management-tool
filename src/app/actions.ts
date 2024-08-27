"use server";

import { createClient } from "contentful";

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN ?? "",
});
export type ContentType =
  | "alumni"
  | "event"
  | "executive"
  | "pastEvents"
  | "timeline"
  | "hackathonJudge"
  | "upcomingEvents"
  | "hackathonSponsor";

export async function fetchContent(contentId: ContentType) {
  try {
    const res = await contentfulClient.getEntries({ content_type: contentId });
    const data = res.items;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch content" + (err as Error).message);
  }
}
