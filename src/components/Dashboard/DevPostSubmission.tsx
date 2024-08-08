import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import Card from "./Card";

export default async function DevPostSubmission() {
  const teamName = "Team Name";
  const devPostLink = "https://devpost.com/hackathons";
  return (
    <Card className="flex-1 justify-start gap-2">
      <h2 className="text-xl font-medium">{`${teamName}'s`}</h2>
      <div className="">Devpost Submission</div>
      <Link
        className="min-h-48 w-full flex-1 p-4"
        target="_blank"
        href={devPostLink}
      >
        <Skeleton height={"100%"} />
      </Link>
    </Card>
  );
}
