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
      <div className=" flex w-full justify-start p-4 text-6xl">
        <h1>
          Hello,
          <span className={`capitalize italic ${nameColor}`}>
            {` ${name}`}!
          </span>
        </h1>
      </div>
    </Card>
  );
}
