import AboutEventTile from "@/components/LandingPage/AboutEventTile";
import JudgeShowcase from "@/components/LandingPage/JudgeShowcase";
import JudgingCriteria from "@/components/LandingPage/JudgingCriteria";
import UserProfile from "@/components/UserProfile/UserProfile";

export default function Home() {
  return (
    <main>
      <>
        <AboutEventTile />
        <JudgingCriteria />
        <JudgeShowcase />
        <UserProfile />
      </>
    </main>
  );
}
