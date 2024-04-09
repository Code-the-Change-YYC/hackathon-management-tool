import AboutEventTile from "@/components/LandingPage/AboutEventTile";
import HackathonInformationContainer from "@/components/LandingPage/HackathonInformationContainer";
import JudgeShowcase from "@/components/LandingPage/JudgeShowcase";
import JudgingCriteria from "@/components/LandingPage/JudgingCriteria";
import ThankSponsors from "@/components/LandingPage/ThanksSponsors";
import PagePlaceholder from "@/components/PagePlaceholder";
import { enableLandingPage } from "@/featureFlags";

export default function Home() {
  return (
    <main>
      {enableLandingPage ? (
        <PagePlaceholder />
      ) : (
        <>
          <AboutEventTile />
          <HackathonInformationContainer />
          <JudgingCriteria />
          <JudgeShowcase />
          <ThankSponsors />
        </>
      )}
    </main>
  );
}
