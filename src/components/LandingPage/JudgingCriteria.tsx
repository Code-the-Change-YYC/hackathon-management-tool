import Image from "next/image";

const judgingCriteriaStyles =
  "relative flex -mt-5 justify-between bg-[#BAFBE4] py-20 px-10 md:px-24 lg:px-40 drop-shadow-lg md:drop-shadow-none";

const itemStyles =
  "flex justify-start p-4 lg:px-10 lg:text-[1.0rem] items-start";

const checkMarkSvg = "/svgs/landingPage/check_mark_bkg.svg";

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
      "Is the implementation complex? Does the product feature different parts? Does the product use interesting concepts or technologies?",
  },
  {
    category: "Judging Criteria - Presentation/Marketability",
    description:
      "Does the team seem organized in their presentation/demo? Does the presentation engage the judges and have real-world marketability?",
  },
  {
    category: "Judging Criteria - Design",
    description:
      "Is the product aesthetically pleasing? Is the product easy to use? Does the design of the product elevate its function and original idea?",
  },
];

const JudgingCriteria = () => {
  const listJudgingCriteria = JUDGING_CRITERIA.map((criterion, index) => (
    <li key={index} className={itemStyles}>
      <Image
        src={checkMarkSvg}
        alt="check mark icon"
        width={60}
        height={60}
        className="mr-6"
      ></Image>
      <div>
        <h2>{criterion.category}</h2>
        <p>{criterion.description}</p>
      </div>
    </li>
  ));
  return (
    <div className={judgingCriteriaStyles}>
      <div>
        <h1 className="mb-10 text-2xl font-bold">
          Judging
          <em className="text-awesomer-purple"> Criteria</em>
        </h1>
        <ul className="flex flex-col">{listJudgingCriteria}</ul>
      </div>
    </div>
  );
};

export default JudgingCriteria;
