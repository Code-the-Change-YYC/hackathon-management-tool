import Image from "next/image";
import Link from "next/link";

import client from "../_Amplify/AmplifyBackendClient";
import RankingTable from "../admin/RankingTable";
import Card from "./Card";

export default async function TeamRankings() {
  const { data: hackathons } = await client.models.Hackathon.list();
  const hackathonData = hackathons[0];
  const scoringMetrics = [
    ...hackathonData.scoringComponents,
    ...hackathonData.scoringSidepots,
  ];
  return (
    <Card className="h-full">
      <div className="flex w-full flex-row items-center justify-between pb-2">
        <div className=" font-medium">View Team Rankings</div>
        <Link href="/admin/teams">
          <Image
            src={"/images/admin/RightArrow.png"}
            className="transition duration-300 hover:opacity-90"
            alt={"arrow"}
            width={60}
            height={60}
          />
        </Link>
      </div>
      <div className="flex size-full justify-start overflow-auto rounded-xl">
        <RankingTable scoringMetrics={scoringMetrics} />
      </div>
    </Card>
  );
}
