import type { Asset, BaseEntry } from "contentful";

export interface Alumni extends BaseEntry {
  fields: {
    fullName: string;
    linkedin: string;
    orderNumber: number;
    position: string;
    previousRole: string;
    testimonial: string;
    profile: Asset;
  };
}
export interface Judge extends BaseEntry {
  fields: {
    judgeImg: Asset;
    judgeName: string;
    judgeCompany: string;
    orderNumber?: number;
    position?: string;
  };
}
export interface HackathonDetails extends BaseEntry {
  fields: {
    eventName: string;
    eventBlurb: string;
    eventDate: string;
    locationName: string;
    locationImage: Asset;
    prizeAmount: number;
  };
}
