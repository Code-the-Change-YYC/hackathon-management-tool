import Image from "next/image";

import JudgingRubric from "../../judging/RubricTable";

const RubricPage = () => {
  return (
    <div className="flex h-full w-dvw flex-col bg-pastel-green">
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
        tableBackgroundColor="bg-[#E3FFF8]"
        dividerColor="border-dark-green"
        headerTextColor="text-dark-green"
        headerBackgroundColor="bg-[#D2F4EA]"
        textColor="text-[#017D66]"
        oddRowColor="odd:bg-[#E3FFF8]"
        evenRowColor="even:bg-[#D2F4EA]"
      />
    </div>
  );
};

export default RubricPage;
