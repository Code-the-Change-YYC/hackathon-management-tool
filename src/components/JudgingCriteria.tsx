const CRITERIA_CONTAINER = "flex flex-col w-full h-screen bg-[#BAFBE4]";

const JudgingCriteria = () => {
  return (
    <div className={CRITERIA_CONTAINER}>
      <h1 className="text-start">
        Judging <em>Criteria</em>
      </h1>
      <div>
        <ul></ul>
      </div>
    </div>
  );
};

export default JudgingCriteria;
