import Greetings from "@/components/Dashboard/Greetings";
import client from "@/components/_Amplify/AmplifyBackendClient";

import JudgingTable from "./JudgingTable";

export default async function JudgingDashboard() {
  const { data: hackathons } = await client.models.Hackathon.list();
  const hackathonData = {
    scoringComponents: hackathons[0].scoringComponents,
    scoringSidepots: hackathons[0].scoringSidepots,
    id: hackathons[0].id,
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center p-6 text-dark-grey">
      <Greetings accentColor="text-dark-pink" />
      <h2 className="flex w-full py-4 text-xl font-semibold">Assigned Teams</h2>
      <JudgingTable hackathonData={hackathonData} />
    </div>
  );
}
