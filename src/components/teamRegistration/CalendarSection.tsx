"use client";

import { downloadEvent } from "@/utils/generateICS";
import PurpleButton from "../PurpleButton";

export default function CalendarSection() {
  return (
    <div className=" flex w-full flex-col items-center justify-evenly gap-4 text-white sm:flex-row">
      <PurpleButton onClick={downloadEvent}>Google</PurpleButton>
      <PurpleButton onClick={downloadEvent}>Outlook</PurpleButton>
      <PurpleButton onClick={downloadEvent}>iCal</PurpleButton>
    </div>
  );
}
