interface RubricTableProps {
  tableBackgroundColor: string;
  dividerColor: string;
  headerTextColor: string;
  headerBackgroundColor: string;
  textColor: string;
  oddRowColor: string;
  evenRowColor: string;
}

type RubricCriteria = {
  category: string;
  minimal: string[];
  developing: string[];
  satisfactory: string[];
  effective: string[];
  excellent: string[];
};

const RUBRIC_CRITERIA: RubricCriteria[] = [
  {
    category: "Innovation & Creativity",
    minimal: [
      "The idea is unoriginal with little evidence of creative thinking or unique perspective.",
      "Technology use is shallow or unrelated to solving urban challenges.",
    ],
    developing: [
      "Some novel elements, but the idea mostly builds on existing solutions without much innovation.",
      "Technology is applied in a basic or generic way with limited connection to solving urban challenges.",
    ],
    satisfactory: [
      "The idea shows a clear creative twist or improvement on existing approaches.",
      "Technology is used appropriately to address an urban challenge/challenges in a reasonable way.",
    ],
    effective: [
      "The concept feels fresh and distinct, showing meaningful creativity in how it approaches the problem.",
      "Technology is used in an inventive way that clearly fits the chosen urban issue.",
    ],
    excellent: [
      "The idea stands out as highly original or a transformative rethinking of existing solutions.",
      "Technology is applied in a creative and well-justified way that could inspire broader innovation.",
    ],
  },
  {
    category: "Impact & Relevance to Prompt",
    minimal: [
      "The solution does not clearly connect to inclusivity, safety, resilience, or sustainability goals.",
      "The potential impact on people's lives is unclear or very limited.",
    ],
    developing: [
      "The project somewhat aligns with the theme but lacks depth or focus.",
      "It identifies a potential benefit, but the impact feels small or hard to measure.",
    ],
    satisfactory: [
      "The solution directly targets at least one key area of the prompt and defines a clear problem.",
      "The benefits are realistic and can make a noticeable difference for a specific community or group of people.",
    ],
    effective: [
      "The project connects strongly to multiple aspects of the prompt and includes tangible examples.",
      "The solution shows meaningful potential to improve people's lives.",
    ],
    excellent: [
      "The solution embodies the prompt fully and addresses inclusivity, safety, resilience, and sustainability in a unified way.",
      "The potential impact is significant and scalable with clear, measurable outcomes that could influence real change.",
    ],
  },
  {
    category: "Feasibility & Scalability",
    minimal: [
      "The idea overlooks major constraints such as cost, infrastructure, or adoption.",
      "There is no consideration of how the idea could grow beyond the prototype stage.",
    ],
    developing: [
      "Some challenges are acknowledged, but solutions or resources are vague or unrealistic.",
      "The project shows limited potential for scaling and would require major rework to grow beyond a small demo.",
    ],
    satisfactory: [
      "The plan appears practical and takes real constraints into account.",
      "The concept demonstrates realistic potential to evolve into a pilot or early-stage community project with further support.",
    ],
    effective: [
      "The project includes realistic budgeting, infrastructure alignment, and a plan for adoption.",
      "The design and implementation show strong potential to be scaled or replicated with mentorship, funding, or partnerships.",
    ],
    excellent: [
      "The plan is highly executable within real-world limits and shows a full understanding of real constraints.",
      "The idea demonstrates exceptional potential to scale into a real-world initiative or inspire broader adoption beyond the hackathon.",
    ],
  },
  {
    category: "Technical Execution",
    minimal: [
      "The prototype is incomplete or unstable and lacks technical depth.",
      "The technology stack is poorly chosen and does not support the core idea.",
    ],
    developing: [
      "The prototype exists but has noticeable issues or missing functionality.",
      "The chosen tools are serviceable but not well matched to the problem.",
    ],
    satisfactory: [
      "The prototype runs from start to finish and demonstrates all core features.",
      "The technology stack is appropriate and the implementation is technically sound.",
    ],
    effective: [
      "The prototype is stable, well-structured, and performs smoothly, showing strong attention to functionality and reliability under hackathon conditions.",
      "The technical decisions are clear, well-justified, and directly enhance the project's success.",
    ],
    excellent: [
      "The prototype demonstrates strong technical depth and reliability within the hackathon timeframe, showing clear potential for further development into a production-quality product.",
      "The technology stack and architecture are thoughtfully chosen and implemented with precision.",
    ],
  },
  {
    category: "User Experience & Design",
    minimal: [
      "The interface is confusing and lacks accessibility features.",
      "The visual design is poorly executed and distracts from usability.",
    ],
    developing: [
      "Basic usability is present, but users may face unclear navigation.",
      "The design is inconsistent or does not effectively support the idea.",
    ],
    satisfactory: [
      "The layout and flow are intuitive for most users with clear interactions.",
      "The visual design is clean and complements the product's function.",
    ],
    effective: [
      "The experience is smooth and inclusive, showing attention to accessibility and small interaction details.",
      "The visual design enhances clarity and usability while reinforcing the idea's value.",
    ],
    excellent: [
      "The experience feels seamless, engaging, and universally accessible.",
      "The design is visually striking yet purposeful, elevating the idea and encouraging adoption.",
    ],
  },
];

export default function RubricTable(props: RubricTableProps) {
  const renderCell = (content: string[]) => (
    <ul className="mx-2 list-outside list-disc space-y-1 text-left">
      {content.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div
      className={`${props.tableBackgroundColor} mx-5 mb-5 max-w-[1500px] overflow-hidden rounded-2xl border-2 border-dark-green 2xl:mx-auto`}
    >
      <div className="overflow-x-auto">
        <table className="m-3 min-w-[880px] max-w-[1480px] table-fixed">
          <thead>
            <tr
              className={`${props.headerBackgroundColor} ${props.headerTextColor}`}
            >
              <th className={`${props.dividerColor} w-1/6 border-r`}>
                Category
              </th>
              <th className={`${props.dividerColor} w-1/6 border-r`}>
                Minimal (1-2)
              </th>
              <th className={`${props.dividerColor} w-1/6 border-r`}>
                Developing (3-4)
              </th>
              <th className={`${props.dividerColor} w-1/6 border-r`}>
                Satisfactory (5-6)
              </th>
              <th className={`${props.dividerColor} w-1/6 border-r`}>
                Effective (7-8)
              </th>
              <th className={`${props.dividerColor} w-1/6`}>
                Excellent (9-10)
              </th>
            </tr>
          </thead>

          <tbody>
            {RUBRIC_CRITERIA.map((criteria, index) => (
              <tr
                key={criteria.category}
                className={`${props.dividerColor} ${index < RUBRIC_CRITERIA.length - 1 ? "border-b" : ""} align-text-top text-xs ${props.textColor} ${props.oddRowColor} ${props.evenRowColor}`}
              >
                <td
                  className={`${props.dividerColor} border-r px-3 py-2 text-center align-middle text-lg lg:px-4 lg:text-xl`}
                >
                  {criteria.category}
                </td>
                <td
                  className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
                >
                  {renderCell(criteria.minimal)}
                </td>
                <td
                  className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
                >
                  {renderCell(criteria.developing)}
                </td>
                <td
                  className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
                >
                  {renderCell(criteria.satisfactory)}
                </td>
                <td
                  className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
                >
                  {renderCell(criteria.effective)}
                </td>
                <td className="px-3 py-2 lg:px-4">
                  {renderCell(criteria.excellent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
