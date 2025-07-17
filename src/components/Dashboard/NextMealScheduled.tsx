"use client";

import Image from "next/image";
import Link from "next/link";

import { getUpcomingFoodEventDetails } from "@/app/get-food-ticket/actions";
import CalendarIcon from "@/images/dashboard/Calendar.png";
import { useQuery } from "@tanstack/react-query";

import { useUser } from "../contexts/UserContext";
import Card from "./Card";

export default function NextMealScheduled() {
  const href = "#";
  const userId = useUser().currentUser.username as string;
  const { data, isFetching } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["FoodEventTimeSlot"],
    queryFn: async () => {
      const { timeslot } = await getUpcomingFoodEventDetails(userId);
      return {
        timeslot,
      };
    },
  });
  const location = "ICT";
  return (
    <Card className="flex h-full flex-row justify-start gap-8">
      <Link href={href}>
        <Image
          className="transition duration-300 hover:opacity-90"
          src={CalendarIcon}
          alt={"Participant Icon"}
        />
      </Link>
      <div className="flex flex-col gap-2 text-start text-2xl font-medium">
        <h1>
          Next Meal <br /> Scheduled at
        </h1>
        <div className="text-3xl font-bold italic text-dark-grey">
          {isFetching ? "Loading..." : (data?.timeslot ?? "No meal scheduled")}
        </div>
        <h2>Location: {location}</h2>
      </div>
    </Card>
  );
}
