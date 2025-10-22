import Image from "next/image";

const checkMarkSvg = "/svgs/landingPage/check_mark_bkg.svg";

export const JUDGING_CRITERIA = [
  {
    category: "Innovation & Creativity",
    description:
      "Is the idea original or a fresh take on existing solutions? Does it creatively apply technology to urban challenges (e.g., housing, mobility, disaster resilience, inclusivity)?",
  },
  {
    category: "Impact & Relevance to Prompt",
    description:
      "Does the solution clearly address the challenge? Could it meaningfully improve lives?",
  },
  {
    category: "Feasibility & Scalability",
    description:
      "Is the solution practical given real constraints (budget, infrastructure, etc.)? Could it scale beyond a demo into a real city/community setting?",
  },
  {
    category: "Technical Execution",
    description:
      "Quality of the implementation (working prototype, technical depth, stability)? Use of appropriate technology stack. Is the solution technically sound and well-built?",
  },
  {
    category: "User Experience & Design",
    description:
      "Is the solution intuitive, accessible and user-friendly? Is the solution aesthetically pleasing? Does the design of the product elevate its function and original idea?",
  },
];

const JudgingCriteria = () => {
  return (
    <div className="relative -mt-5 flex flex-col items-center bg-pastel-green px-[5%] py-20 drop-shadow-lg md:drop-shadow-none">
      <h1 className="mb-12 text-center text-3xl font-bold md:text-5xl lg:text-7xl">
        Judging
        <em className="text-awesomer-purple"> Criteria</em>
      </h1>

      <div className="grid w-full max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {JUDGING_CRITERIA.map((criterion, index) => (
          <div
            key={index}
            className="group flex flex-col items-start rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl lg:p-8"
          >
            <div className="mb-4 flex w-full items-center gap-4">
              <Image
                src={checkMarkSvg}
                alt="check mark icon"
                width={60}
                height={60}
                className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                {criterion.category}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-gray-700 lg:text-lg">
              {criterion.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JudgingCriteria;
