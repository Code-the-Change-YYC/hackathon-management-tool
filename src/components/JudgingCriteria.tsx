import Image from "next/image";

const judgingCriteriaStyles =
  "flex flex-col p-10 w-full h-screen justify-evenly bg-[#BAFBE4]";

const checkMarkSvg = "/svgs/judgingCriteria/check_mark_bkg.svg";
const svgSize = 50;

export const JUDGING_CRITERIA = [
  {
    category: "Judging Criteria - Idea",
    description:
      "Does the product address the prompt? Does the product introduce a new/unique approach or perspective?",
  },
  {
    category: "Judging Criteria - Effectiveness",
    description:
      "Does the product function as intended? Does the product execute on its idea in a way that’s effective?",
  },
  {
    category: "Judging Criteria - Technical Challenge",
    description:
      "Does the product function as intended? Does the product execute on its idea in a way that’s effective?",
  },
  {
    category: "Judging Criteria - Presentation/Marketability",
    description:
      "Is the implementation complex? Does the product feature different parts? Does the product use interesting concepts or technologies? (If you are unable to judge this criteria accurately, please leave it blank.)",
  },
  {
    category: "Judging Criteria - Design",
    description:
      "Does the team seem organized in their presentation/demo? Does the presentation engage the judges and have real-world marketability? (If you are unable to judge this criteria accurately, please leave it blank.)",
  },
];

const JudgingCriteria = () => {
  const listJudgingCriteria = JUDGING_CRITERIA.map((criterion, index) => (
    <li key={index} className="flex items-center">
      <Image
        src={checkMarkSvg}
        alt="check mark icon"
        width={svgSize}
        height={svgSize}
      ></Image>
      <div className="p-4">
        <h2>{criterion.category}</h2>
        <p>{criterion.description}</p>
      </div>
    </li>
  ));
  return (
    <div className={judgingCriteriaStyles}>
      <h1>Judging Criteria</h1>
      <ul>{listJudgingCriteria}</ul>
    </div>
  );
};

export default JudgingCriteria;
