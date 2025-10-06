import Link from "next/link";
import PurpleButton from "@/components/PurpleButton";
import { Underline } from "@/utils/text-utils";

export default function page() {
  return (
    <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-8 text-center font-bold">
      <h1 className="flex justify-start text-4xl">But First...</h1>
      <div className="flex w-full flex-col items-center rounded-3xl bg-pastel-green p-8">
        <div className="flex w-1/2 min-w-60 flex-col items-center gap-4 rounded-3xl bg-white p-8">
          <div className="text-3xl">
            <div className="hidden xl:block">
              <Underline>Join the official Discord!</Underline>
            </div>
            <div className="w-full xl:hidden">
              Join the official
              <Underline>
                <span className="ml-3">Discord!</span>
              </Underline>
            </div>
          </div>
          <Link
            target="_blank"
            rel="noreferrer"
            href={process.env.NEXT_PUBLIC_DISCORD_LINK ?? ""}
          >
            <PurpleButton className="w-auto px-4">
              Hackathon Discord
            </PurpleButton>
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between sm:flex-row">
        <Link href={"/register/team"}>
          <PurpleButton>Back</PurpleButton>
        </Link>
        <Link href={"/register/team/ready"}>
          <PurpleButton>Next</PurpleButton>
        </Link>
      </div>
    </div>
  );
}
