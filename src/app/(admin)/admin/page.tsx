import Greetings from "@/components/admin/Greetings";
import NumFoodTickets from "@/components/admin/NumFoodTickets";
import TeamRankings from "@/components/admin/TeamRankings";
import TotalParticipants from "@/components/admin/TotalParticipants";
import TotalTeams from "@/components/admin/TotalTeams";

export default function page() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto bg-slate-200 p-4 text-3xl font-semibold">
      <Greetings />
      <h1 className="text-2xl font-semibold">Hackathon Statistics</h1>
      <div className="-mb-2 -ml-2 flex flex-1 flex-row gap-4 overflow-y-auto pb-2 pl-2 ">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-1 flex-row gap-4">
            <TotalTeams />
            <TotalParticipants />
          </div>
          <NumFoodTickets />
        </div>
        <TeamRankings />
      </div>
    </div>
  );
}
