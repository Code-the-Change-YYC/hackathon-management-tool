"use client";

import { UserType, useUser } from "../contexts/UserContext";
import Card from "./Card";

export default function Greetings() {
  const user = useUser();
  const name = user.currentUser.firstName;
  const nameColor =
    user?.currentUser.type === UserType.Admin
      ? "text-awesome-purple"
      : "text-emerald-500";
  return (
    <Card>
      <div className=" flex w-full flex-col justify-start p-2 text-start md:p-4 ">
        <h2 className="text-lg font-normal md:text-xl lg:text-2xl">
          Hack the Change 2024
        </h2>
        <h1 className="text-3xl md:text-4xl lg:text-6xl">
          Hello,
          <span className={`capitalize italic ${nameColor}`}>
            {` ${name}`}!
          </span>
        </h1>
      </div>
    </Card>
  );
}
