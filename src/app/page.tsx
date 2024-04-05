import CreateTeamPage from "@/app/participant/team-selection/CreateTeamPage";
import AboutEventTile from "@/components/LandingPage/AboutEventTile";
import JudgeShowcase from "@/components/LandingPage/JudgeShowcase";
import JudgingCriteria from "@/components/LandingPage/JudgingCriteria";

export default function Home() {
  return (
    <main>
      <>
        <AboutEventTile />
        <JudgingCriteria />
        <JudgeShowcase />
        <CreateTeamPage />
      </>
    </main>
  );
}
