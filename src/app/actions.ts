"use server";

import type { BaseEntry } from "contentful";
import { createClient } from "contentful";
import type { ContentTypeMap } from "./contentfulTypes";

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN ?? "",
});

interface ContentfulEntry<T> extends BaseEntry {
  contentTypeId: string;
  fields: T;
}

export async function fetchContent<T extends keyof ContentTypeMap>(
  contentId: T,
): Promise<ContentfulEntry<ContentTypeMap[T]>[]> {
  try {
    const res = await contentfulClient.getEntries<
      ContentfulEntry<ContentTypeMap[T]>
    >({
      content_type: contentId,
    });
    const data = res.items;
    return data as ContentfulEntry<ContentTypeMap[T]>[];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch content" + (err as Error).message);
  }
}
