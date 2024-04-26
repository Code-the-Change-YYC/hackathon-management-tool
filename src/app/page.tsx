import AboutEventTile from "@/components/LandingPage/AboutEventTile";
import HeroSection from "@/components/LandingPage/HeroSection";
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
          <HeroSection />
          <AboutEventTile />
          <JudgingCriteria />
          <JudgeShowcase />
          <ThankSponsors />
        </>
      )}
    </main>
  );
}
