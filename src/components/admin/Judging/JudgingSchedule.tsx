"use client";

import { useState } from "react";

import JudgingTimeline from "@/components/admin/Judging/JudgingTimeline";
import RoomAssigner from "@/components/admin/Judging/RoomAssigner";

export default function JudgingSchedule() {
  const [numberOfRooms, setNumberOfRooms] = useState<number>();

  console.log(numberOfRooms);
  return (
    <div>
      <RoomAssigner setNumberOfRooms={setNumberOfRooms} />
      <JudgingTimeline />
    </div>
  );
}
