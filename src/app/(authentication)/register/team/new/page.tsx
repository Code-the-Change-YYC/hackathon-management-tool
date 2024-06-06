"use client";

import Link from "next/link";

import { Underline } from "../ready/page";

const BUTTON_STYLES =
  "bg-awesomer-purple w-full py-2 hover:opacity-90 transition duration-300 font-medium text-xl rounded-full border-4 border-white shadow-md w-44";
export default function page() {
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const teamName = e.currentTarget.teamName.value;
    // TODO: Send teamName to backend
    // filter profanity, non english characters, "ready", "join", "register", "team", "new", "existing", "join", "submit", "create", "discord", "channel", "member", "id", "unique", "digit", "form", "provide", "officially", "group", "navigate", "submit", "officially", "join", "group", "assign", "following", "registration", "next", "steps", "looking", "for", "a", "team", "reach", "out", "to", "an", "existing", "team", "form", "a", "new", "team", "after", "forming", "a", "team", "assign", "one", "member", "to", "register", "new", "team", "using", "your", "team", "name", "they", "will", "receive", "a", "unique", "digit", "team", "id", "following", "registration", "next", "provide", "this", "digit", "team", "id", "to", "all", "team", "members", "each", "team", "member", "must", "navigate", "to", "join", "existing", "team", "to", "submit", "this", "id", "to", "officially", "join", "the", "group", "join", "the", "code", "the", "change", "yyc", "discord", "and", "navigate", "to", "the", "looking", "for", "a", "team", "channel", "reach", "out", "to", "an", "existing", "team", "or", "form", "a", "new", "team", "after", "forming", "a", "team", "assign", "one", "member", "to", "register", "new", "team", "using", "your", "team", "name", "they", "will", "receive", "a", "unique", "digit", "team", "id", "following", "registration", "next", "provide", "this", "digit", "team", "id", "to", "all", "team", "members", "each", "team", "member", "must", "navigate", "to", "join", "existing"
    console.log(teamName);
  }
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex w-full flex-col justify-center gap-6 rounded-3xl bg-white p-4 md:p-8"
    >
      <div className="ml-4 flex items-center justify-center text-3xl font-semibold sm:items-start sm:justify-start">
        <Underline>Register new team</Underline>
      </div>
      <div className="flex flex-col gap-2 sm:py-12">
        <label htmlFor="teamName" className="w-fit drop-shadow">
          Team Name
        </label>
        <input
          id="teamName"
          type="text"
          className="w-full rounded-xl border-2 border-black/20 p-2"
          placeholder="Team Name"
          required
          maxLength={50}
        />
      </div>
      <div className="flex flex-col items-center justify-between gap-4 text-white sm:flex-row">
        <Link href={"/register/team/ready"}>
          <button className={BUTTON_STYLES}>Back</button>
        </Link>
        <Link href={"/register/team/ready"}>
          <button type="submit" className={BUTTON_STYLES}>
            Register
          </button>
        </Link>
      </div>
    </form>
  );
}
