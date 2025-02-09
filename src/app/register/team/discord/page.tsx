import Link from "next/link";

import PurpleButton from "@/components/PurpleButton";
import { Underline } from "@/utils/text-utils";

export default function page() {
  return (
    <div className="flex w-full flex-col justify-center rounded-xl bg-white p-4 md:p-8">
      <div className="gap-6 p-8 text-center font-bold">
        <h1 className="flex justify-start text-4xl">But First...</h1>
        <div className="relative inline-block text-3xl">
          <Underline>Join the official Discord!</Underline>
        </div>
      </div>
      <div className="flex items-center justify-center p-2">
        <a
          target="_blank"
          rel="noreferrer"
          href={process.env.NEXT_PUBLIC_DISCORD_LINK}
        >
          <PurpleButton>Hackathon Discord</PurpleButton>
        </a>
      </div>
      <div className="flex justify-between">
        <Link className="flex justify-end" href={"/register/team"}>
          <PurpleButton>Back</PurpleButton>
        </Link>
        <Link className="flex justify-end" href={"/register/team/ready"}>
          <PurpleButton>Next</PurpleButton>
        </Link>
      </div>
    </div>
  );
}
