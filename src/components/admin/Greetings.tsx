"use client";

import { useUser } from "../contexts/UserContext";
import Card from "./Card";

export default function Greetings() {
  const { currentUser } = useUser();
  const name = currentUser.firstName;

  return (
    <Card>
      <div className=" flex w-full justify-start p-4 text-6xl">
        <h1>
          Hello,
          <span className=" italic text-awesome-purple">{` ${name}`}!</span>
        </h1>
      </div>
    </Card>
  );
}
