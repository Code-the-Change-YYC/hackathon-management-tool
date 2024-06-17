import Image from "next/image";

import Card from "./Card";
import RankingTable from "./RankingTable";

export default function TeamRankings() {
  return (
    <Card>
      <div className="flex w-full flex-row items-center justify-between">
        <div className=" font-medium">View Team Rankings</div>
        <Image
          src={"/images/admin/RightArrow.png"}
          alt={"arrow"}
          width={60}
          height={60}
        />
      </div>
      <RankingTable />
    </Card>
  );
}
