import Image from "next/image";

import JudgingRubric from "../../judging/RubricTable";

const RubricPage = () => {
  return (
    <div className="flex h-full w-dvw flex-col bg-dashboard-grey">
      <div className="flex h-40 items-center justify-center gap-2 md:h-60">
        <Image
          src="/svgs/judgingRubric/rubric_left.svg"
          alt="Left Squiggly SVG"
          width={100}
          height={60}
          className="mb-2 mr-1 w-1/4 pl-4 md:w-1/3 xl:h-4/5 xl:w-2/5"
        />
        <h1 className="whitespace-nowrap text-center text-2xl font-extrabold text-dark-green md:text-4xl">
          Judging Rubric
        </h1>
        <Image
          src="/svgs/judgingRubric/rubric_right.svg"
          alt="Right Squiggly SVG"
          width={100}
          height={60}
          className="ml-1 w-1/4 pr-4 md:-mt-5 md:w-1/3 xl:h-4/5 xl:w-2/5"
        />
      </div>

      <JudgingRubric
        tableBackgroundColor="bg-light-grey"
        dividerColor="border-dark-green"
        headerTextColor="text-white"
        headerBackgroundColor="bg-dark-green/60"
        textColor="text-emerald-green"
        oddRowColor="odd:bg-light-grey"
        evenRowColor="even:bg-dark-green/15"
      />
    </div>
  );
};

export default RubricPage;
