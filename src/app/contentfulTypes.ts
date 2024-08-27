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

export interface HackathonSponsor extends BaseEntry {
  fields: {
    sponsorOrder: number;
    sponsorImg: Asset;
    sponsorName: string;
    sponsorPage: string;
  };
}
