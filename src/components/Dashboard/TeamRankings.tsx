import Image from "next/image";
import Link from "next/link";

import RankingTable from "../admin/RankingTable";
import Card from "./Card";

export default function TeamRankings() {
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
      <RankingTable />
    </Card>
  );
}
