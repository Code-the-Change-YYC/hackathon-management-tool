"use client";

import { twMerge } from "tailwind-merge";

import LoadingRing from "@/components/LoadingRing";

import { UserType, useUser } from "../contexts/UserContext";
import Card from "./Card";

export default function Greetings({
  className,
  accentColor,
}: {
  className?: string;
  accentColor?: string;
}) {
  const user = useUser();
  const firstName = user.currentUser.firstName;
  const lastName = user.currentUser.lastName;
  const nameColor =
    user?.currentUser.type === UserType.Admin
      ? "text-awesome-purple"
      : accentColor !== undefined
        ? accentColor
        : "text-emerald-500";
  return (
    <Card>
      <div
        className={twMerge(
          " flex w-full flex-col justify-start p-2 text-start md:p-4 ",
          className,
        )}
      >
        <h2 className="text-lg font-normal md:text-xl lg:text-2xl">
          Hack the Change 2024
        </h2>

        <h1 className="text-3xl md:text-4xl lg:text-6xl">
          Hello,
          {user.isFetching && <LoadingRing />}
          <span className={`capitalize italic ${nameColor}`}>
            {" "}
            {firstName} {lastName}!
          </span>
        </h1>
      </div>
    </Card>
  );
}
