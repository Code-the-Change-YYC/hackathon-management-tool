import JudgingRubric from "../../judging/RubricTable";

const RubricPage = () => {
  return (
    <div className="flex h-full w-dvw flex-col bg-dashboard-grey">
      <h1 className="my-8 whitespace-nowrap text-center text-3xl font-extrabold text-dark-green md:my-12 md:text-4xl">
        Judging Rubric
      </h1>

      <JudgingRubric
        tableBackgroundColor="bg-light-grey"
        dividerColor="border-ehhh-grey"
        headerTextColor="text-white"
        headerBackgroundColor="bg-dark-green/50"
        textColor="text-dark-grey"
        oddRowColor="odd:bg-light-grey"
        evenRowColor="even:bg-dashboard-grey"
      />
    </div>
  );
};

export default RubricPage;
