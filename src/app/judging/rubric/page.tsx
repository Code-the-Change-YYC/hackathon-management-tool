import JudgingRubric from "../../judging/RubricTable";

const RubricPage = () => {
  return (
    <div className="flex h-full w-dvw flex-col bg-dashboard-grey">
      <h1 className="my-8 whitespace-nowrap text-center text-3xl font-extrabold text-dark-green md:my-12 md:text-4xl">
        Judging Rubric
      </h1>

      <JudgingRubric
        tableBackgroundColor="bg-light-grey"
        dividerColor="border-[#C4C4C4]"
        headerTextColor="text-white"
        headerBackgroundColor="bg-[#72E4CE]"
        textColor="text-dark-grey"
        oddRowColor="odd:bg-light-grey"
        evenRowColor="even:bg-[#E4E4E4]"
      />
    </div>
  );
};

export default RubricPage;
