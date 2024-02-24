import JudgingCriteria from "@/components/LandingPage/JudgingCriteria";
import PagePlaceholder from "@/components/PagePlaceholder";
import { enableLandingPage } from "@/featureFlags";

export default function Home() {
  return (
    <main>{enableLandingPage ? <PagePlaceholder /> : <JudgingCriteria />}</main>
  );
}
