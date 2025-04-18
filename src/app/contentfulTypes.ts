import type { Asset, BaseEntry } from "contentful";

export interface Alumni extends BaseEntry {
  fullName: string;
  linkedin: string;
  orderNumber: number;
  position: string;
  previousRole: string;
  testimonial: string;
  profile: Asset;
}
export interface Judge extends BaseEntry {
  judgeImg: Asset;
  judgeName: string;
  judgeCompany: string;
  orderNumber?: number;
  position?: string;
}
export interface HackathonSponsor extends BaseEntry {
  sponsorOrder: number;
  sponsorImg: Asset;
  sponsorName: string;
  sponsorPage: string;
}

export interface HackathonDetails extends BaseEntry {
  eventName: string;
  eventBlurb: string;
  eventDate: string;
  locationName: string;
  locationImage: Asset;
  prizeAmount: number;
  closingCeremony: string;
}

export interface ContentTypeMap {
  alumni: Alumni;
  hackathonJudge: Judge;
  hackathonSponsor: HackathonSponsor;
  hackathonDetails: HackathonDetails;
  event: BaseEntry;
  executive: BaseEntry;
  pastEvents: BaseEntry;
  timeline: BaseEntry;
  upcomingEvents: BaseEntry;
  ceremonyDetails: CeremonyDetails;
  pastHackathonWinner: PastHackathonWinner;
  // add more types as needed...
}

export interface CeremonyDetails extends BaseEntry {
  openingCeremonyLocation: string;
  openingCeremonyDate: string;
  closingCeremonyLocation: string;
  closingCeremonyDate: string;
}

export interface PastHackathonWinner extends BaseEntry {
  projectName: string;
  projectDescription?: string;
  projectImage?: Asset;
  hackathonName?: string;
  teamName?: string;
  teamRanking?: number;
  awardName?: string;
  link?: string;
}
