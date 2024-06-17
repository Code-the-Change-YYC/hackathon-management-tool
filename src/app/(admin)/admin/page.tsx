import Greetings from "@/components/admin/Greetings";
import NumFoodTickets from "@/components/admin/NumFoodTickets";
import TeamRankings from "@/components/admin/TeamRankings";
import TotalParticipants from "@/components/admin/TotalParticipants";
import TotalTeams from "@/components/admin/TotalTeams";

export default function page() {
  return (
    <div className="flex  flex-col gap-8 p-4 text-3xl font-semibold">
      <Greetings />
      <h1 className="text-2xl">Hackathon Statistics</h1>
      <div className="flex flex-row gap-4">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-row gap-4">
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
