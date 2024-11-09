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
    <>
      <div className={"flex h-screen justify-center text-blackish"}>
        <div className={"w-full max-w-[1500px] p-6"}>
          <Greetings accentColor="text-dark-pink" />
          <h2 className={"py-4 text-xl font-semibold"}>Assigned Teams</h2>
          <JudgingTable hackathonData={hackathonData} />
        </div>
      </div>
    </>
  );
}
