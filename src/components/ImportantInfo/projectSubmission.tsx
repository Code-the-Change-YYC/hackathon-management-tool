import Image from "next/image";
import Link from "next/link";
import RedirectIcon from "../RedirectIcon";

export default function ProjectSubmission() {
  return (
    <div className="flex w-full flex-col gap-5 bg-pastel-green pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="mt-10 text-center text-5xl text-black">
          Submitting your Project
        </h1>
        <div className="pointer-events-none flex justify-center">
          <Image
            src="/svgs/importantInfo/purpleUnderline.svg"
            alt="Purple Underline"
            width={90}
            height={30}
          />
        </div>
      </div>

      <div className="mx-5 space-y-5 text-start md:mx-16 xl:mx-60">
        <div className="space-y-2">
          <p className="text-lg font-bold">
            To submit a project, please read the following steps carefully
          </p>
          <div className="ml-1 flex flex-row items-start gap-2">
            <Image
              src="/svgs/importantInfo/star.svg"
              alt="star icon"
              width={25}
              height={25}
            />
            <p>
              On{" "}
              <span className="font-bold text-awesome-purple">
                Sunday, November 9th,{" "}
              </span>
              submit your project{" "}
              <span className="font-bold text-awesome-purple">
                {" "}
                before 12pm MST (2:00pm EST, 11:00am PST)
              </span>
              . You can do this on our{" "}
              <a
                href="https://hack-the-change-2025.devpost.com/"
                target="_blank"
                rel="noopener noreffer"
                className="inline-flex flex-row items-center gap-1 text-awesome-purple underline"
              >
                DevPost Page
                <RedirectIcon className="h-4 w-4 text-awesome-purple" />
              </a>
              .
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-lg font-bold">What Goes into a Submission?</p>
          <ul className="mx-4 w-fit list-outside list-disc pl-2 text-left">
            <li>Your team ID and team name!!</li>
            <li>
              Project source code (submit a link to a Github, if applicable)
            </li>
            <li>
              A link to your 2-3 minute demo video of your software or hardware
              project in action.
            </li>
          </ul>
        </div>

        <div className="space-y-1">
          <p className="text-lg font-bold">Submission Instructions</p>
          <ol className="list-decimal space-y-5 pl-8">
            <li>
              Click "<span className="underline">Start Project</span>"
              <div className="relative h-40 w-80 md:h-48 md:w-[450px] lg:h-64 lg:w-[600px]">
                <Image
                  src="/images/importantInfo/startSubmission.png"
                  alt="Start submission"
                  fill
                  className="object-contain"
                />
              </div>
            </li>
            <li>
              Complete the following project submission form to submit a project
              <div className="relative h-40 w-80 md:h-52 md:w-[450px] lg:h-72 lg:w-[600px]">
                <Image
                  src="/images/importantInfo/completeSubmission.png"
                  alt="Complete submission"
                  fill
                  className="object-contain"
                />
              </div>
            </li>
          </ol>
        </div>

        <div className="space-y-1">
          <p className="text-lg font-bold">What Happens After Submissions?</p>
          <ul className="mx-4 w-fit list-outside list-disc pl-2">
            <li>
              From{" "}
              <span className="font-bold text-awesome-purple">
                1pm MST to 4pm MST
              </span>
              , teams will be demoing their projects to judges live. We’ll post
              a schedule around{" "}
              <span className="font-bold text-awesome-purple">12:30pm MST</span>
              with a schedule of the teams presenting to the judges and at what
              time!
            </li>
            <li>
              Look at the{" "}
              <Link
                href="/participant/rubric"
                className="text-awesome-purple underline"
              >
                Judging Rubric
              </Link>{" "}
              for more information on how judges will be evaluating you.
            </li>
            <li>
              You will have up to{" "}
              <span className="font-bold text-awesome-purple">
                8 minutes to present
              </span>{" "}
              and{" "}
              <span className="font-bold text-awesome-purple">
                2 minutes for Q&A
              </span>{" "}
              from the judges.
            </li>
          </ul>
        </div>

        <div className="space-y-1">
          <p className="text-lg font-bold">What Happens After Judging?</p>
          <p>
            Our team will take about an hour to aggregate all the final scores
            from 4pm to 5pm MST on Sunday, and announce the winners on our
            closing ceremonies, streamed on{" "}
            <a
              href="https://www.twitch.tv/codethechangeyyc"
              target="_blank"
              rel="noopener noreffer"
              className="inline-flex flex-row items-center gap-1 text-awesome-purple underline"
            >
              Twitch!
              <RedirectIcon className="h-4 w-4 text-awesome-purple" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
