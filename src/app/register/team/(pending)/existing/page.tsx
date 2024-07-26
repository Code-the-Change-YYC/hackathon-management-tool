import JoinTeamCode from "@/components/teamRegistration/JoinTeamCode";
import { Underline } from "@/utils/text-utils";

export default function page() {
  const instructions = [
    "Obtain the unique 4-digit Team ID from your team member who registered your group.",
    "Enter the Team ID below.",
    "Click on “Join.”",
    "Its official! You joined the team!",
  ];
  return (
    <div className="flex w-full flex-col justify-center gap-6 rounded-3xl bg-white p-4 text-3xl font-bold md:p-8">
      <div className=" flex flex-nowrap gap-2 ">
        <Underline>Join existing </Underline> team
      </div>
      <ol className="flex list-inside list-decimal flex-col gap-1 px-6 text-lg font-medium">
        {instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>
      <JoinTeamCode />
    </div>
  );
}
