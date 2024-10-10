"use client";

import { useState } from "react";

import JudgingTimeline from "@/components/admin/Judging/JudgingTimeline";
import RoomAssigner from "@/components/admin/Judging/RoomAssigner";

export default function JudgingSchedule() {
  const [numberOfRooms, setNumberOfRooms] = useState<number>();

  console.log(numberOfRooms);
  return (
    <>
      <RoomAssigner setNumberOfRooms={setNumberOfRooms} />
      <div className="flex justify-center">
        <div className="m-4 w-full max-w-[1500px] rounded-md border border-awesomer-purple bg-light-grey p-4 text-lg text-black">
          <JudgingTimeline />
        </div>
      </div>
    </>
  );
}
