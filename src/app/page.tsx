import AboutEventTile from "@/components/LandingPage/AboutEventTile";
import HeroSection from "@/components/LandingPage/HeroSection";
import JudgeShowcase from "@/components/LandingPage/JudgeShowcase";
import JudgingCriteria from "@/components/LandingPage/JudgingCriteria";

export default function Home() {
  return (
    <main>
      <>
        <HeroSection />
        <AboutEventTile />
        <JudgingCriteria />
        <JudgeShowcase />
      </>
    </main>
  );
}
