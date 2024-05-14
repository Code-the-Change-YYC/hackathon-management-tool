import AboutEventTile from "@/components/LandingPage/AboutEventTile";
import HackathonInformationContainer from "@/components/LandingPage/HackathonInformationContainer";
import HeroSection from "@/components/LandingPage/HeroSection";
import JudgeShowcase from "@/components/LandingPage/JudgeShowcase";
import JudgingCriteria from "@/components/LandingPage/JudgingCriteria";
import ThankSponsors from "@/components/LandingPage/ThanksSponsors";
import PagePlaceholder from "@/components/PagePlaceholder";
import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";
import { enableLandingPage } from "@/featureFlags";

const Home = () => {
  return (
    <main>
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

export default withAuthGuard(Home, [
  UserType.Admin,
  UserType.Guest,
  UserType.Judge,
  UserType.Participant,
]);
