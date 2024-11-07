import AboutEventTile from "@/components/LandingPage/AboutEventTile";
import HackathonInformationContainer from "@/components/LandingPage/HackathonInformationContainer";
import HeroSection from "@/components/LandingPage/HeroSection";
import JudgeShowcase from "@/components/LandingPage/JudgeShowcase";
import JudgingCriteria from "@/components/LandingPage/JudgingCriteria";
import ThankSponsors from "@/components/LandingPage/ThanksSponsors";
import PagePlaceholder from "@/components/PagePlaceholder";
import { enableLandingPage } from "@/featureFlags";

export const revalidate = 600;
const Home = () => {
  return (
    <main className="">
      {enableLandingPage ? (
        <PagePlaceholder />
      ) : (
        <>
          <HeroSection />
          <AboutEventTile />
          <HackathonInformationContainer />
          <JudgingCriteria />
          <JudgeShowcase />
          <ThankSponsors />
        </>
      )}
    </main>
  );
};

export default Home;
