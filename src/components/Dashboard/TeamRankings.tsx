import Image from "next/image";
import Link from "next/link";

import type { Schema } from "@/amplify/data/resource";

import client from "../_Amplify/AmplifyBackendClient";
// import RankingTable from "../admin/RankingTable";
import RankingTableCopy from "../admin/RankingTable copy";
import Card from "./Card";

type ScoringMetric = Record<
  string,
  Omit<Schema["ScoreComponentType"]["type"], "id">
>;
export type TeamScore = {
  score: Record<
    string,
    Omit<Schema["ScoreComponentType"]["type"], "id"> & {
      amount: string;
    }
  >;
  team: Pick<Schema["Team"]["type"], "id" | "name"> | null;
};
export default async function TeamRankings() {
  const { data: hackathons } = await client.models.Hackathon.list({
    selectionSet: ["scoringComponents.*", "scoringSidepots.*"],
    limit: 1,
  });
  const { data: scores } = await client.models.Score.list({
    selectionSet: ["team.id", "team.name", "score"],
  });
  const hackathonData = hackathons[0];
  const scoringMetrics: ScoringMetric = {
    ...hackathonData.scoringComponents.reduce((acc, metric) => {
      acc[metric.id] = {
        friendlyName: metric.friendlyName,
        isSidepot: false,
      };
      return acc;
    }, {} as ScoringMetric),
    ...hackathonData.scoringSidepots.reduce((acc, metric) => {
      acc[metric.id] = {
        friendlyName: metric.friendlyName,
        isSidepot: true,
      };
      return acc;
    }, {} as ScoringMetric),
  };
  const formattedScores = scores.map((score) => {
    return {
      ...score,
      score: JSON.parse(score.score as string) as ScoringMetric,
    };
  });
  const mergedScores: TeamScore[] = formattedScores.map((teamScore) => {
    let score: TeamScore["score"] = {};
    for (let k of Object.keys(teamScore.score)) {
      score[k] = {
        // @ts-ignore
        amount: teamScore.score[k],
        friendlyName: scoringMetrics[k].friendlyName,
        isSidepot: scoringMetrics[k].isSidepot,
      };
    }
    return {
      team: teamScore.team,
      score,
    };
  });
  console.log(JSON.stringify(mergedScores, null, 2));
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
      <RankingTableCopy scores={mergedScores} />
    </Card>
  );
}
