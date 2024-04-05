import AboutEventTile from "@/components/LandingPage/AboutEventTile";
import HackathonInformationContainer from "@/components/LandingPage/HackathonInformationContainer";
import JudgeShowcase from "@/components/LandingPage/JudgeShowcase";
import JudgingCriteria from "@/components/LandingPage/JudgingCriteria";

export default function Home() {
  return (
    <main>
      <>
        <AboutEventTile />
        <HackathonInformationContainer />
        <JudgingCriteria />
        <JudgeShowcase />
      </>
    </main>
  );
}
