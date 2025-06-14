interface RubricTableProps {
  tableBackgroundColor: string;
  dividerColor: string;
  headerTextColor: string;
  headerBackgroundColor: string;
  textColor: string;
  oddRowColor: string;
  evenRowColor: string;
}

export default function RubricTable(props: RubricTableProps) {
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
              <th className={`${props.dividerColor} w-1/6 border-r`}>
                Excellent (9-10)
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              className={`${props.dividerColor} border-b align-text-top text-xs ${props.textColor} ${props.oddRowColor} ${props.evenRowColor}`}
            >
              <td
                className={`${props.dividerColor} border-r px-3 py-2 text-center align-middle text-lg lg:px-4 lg:text-xl`}
              >
                Idea
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>The product is unrelated to the prompt.</li>
                  <li>
                    Idea is very similar or identical to a well-known solution.
                  </li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    Product takes wide liberty with the prompt and is loosely
                    related.
                  </li>
                  <li>
                    Innovative aspects of the idea are not explained or
                    showcased.
                  </li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    Product loosely addresses the prompt, and would not have a
                    large impact
                  </li>
                  <li>
                    Innovative aspects of the idea are explained vaguely or not
                    showcased.
                  </li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>Product innovatively addresses the prompt.</li>
                  <li>
                    Innovative aspects of the idea are explained and showcased.
                  </li>
                </ul>
              </td>
              <td className="px-3 py-2 lg:px-4">
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    Product directly addresses the prompt and explains its
                    solution to the prompt in detail. 
                  </li>
                  <li>
                    Innovative and goes beyond the original scope of the project
                  </li>
                  <li>
                    Innovative aspects of the idea are explained and clearly
                    showcased.
                  </li>
                </ul>
              </td>
            </tr>

            <tr
              className={`${props.dividerColor} border-b align-text-top text-xs ${props.textColor} ${props.oddRowColor} ${props.evenRowColor}`}
            >
              <td
                className={`${props.dividerColor} border-r px-3 py-2 text-center align-middle text-lg lg:px-4 lg:text-xl`}
              >
                Effectiveness
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>The product is not functional and is unpresentable</li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    Some features are completely broken or requires multiple
                    attempts to work.
                  </li>
                  <li>
                    Most of the product’s functionality does not relate to the
                    original idea of the product.
                  </li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>The core features of the product are functional. </li>
                  <li>
                    Noticeable bugs in some features, but these bugs do not
                    break the overall function of the product.
                  </li>
                  <li>
                    Some of the product’s functionality does not relate to its
                    original idea.
                  </li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>The core features of the product are functional. </li>
                  <li>
                    There are minor noticeable bugs in some features, but these
                    bugs do not detract from the effectiveness of the product.
                  </li>
                  <li>
                    Most of the product’s functionality relates to its original
                    idea.
                  </li>
                </ul>
              </td>
              <td className="px-3 py-2 lg:px-4">
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    All features of the product are functional and working
                    correctly.
                  </li>
                  <li>
                    No visible bugs throughout the entirety of the product.
                  </li>
                  <li>
                    All of the product’s functionality strengthens and relates
                    to its original idea.
                  </li>
                </ul>
              </td>
            </tr>

            <tr
              className={`${props.dividerColor} border-b align-text-top text-xs ${props.textColor}`}
            >
              <td
                className={`${props.dividerColor} border-r px-3 py-2 text-center align-middle text-lg ${props.textColor} ${props.oddRowColor} ${props.evenRowColor} lg:px-4 lg:text-xl`}
              >
                Technical Challenge
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    Product is straightforward and requires little to no
                    technical effort
                  </li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    Product implements some level of coding and requires a small
                    amount of technical effort
                  </li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <p>The product does at least ONE of the following:</p>
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    Uses 1-2 different technologies/services together, including
                    databases, servers, datasets, and external APIs.
                  </li>
                  <li>
                    Implements a simple computer science concept or technique of
                    medium effort to enhance its functionality in an effective
                    way.
                  </li>
                  <li>Includes more than one functionality.</li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <p>The product does at least ONE of the following:</p>
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    Uses 3-4 different technologies/services together, including
                    databases, servers, datasets, and external APIs.
                  </li>
                  <li>
                    Implements a computer science concept or technique of medium
                    complexity to enhance its core functionality in an effective
                    way.
                  </li>
                  <li>Includes a wide range of cohesive functionalities.</li>
                </ul>
              </td>
              <td className="px-3 py-2 lg:px-4">
                <p>The product does at least ONE of the following:</p>
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    Uses 5+ different technologies/services together, including
                    databases, servers, datasets, and external APIs. 
                  </li>
                  <li>
                    Implements a difficult and complex computer science concept
                    or technique to enhance its functionality.
                  </li>
                  <li>Introduces a new solution that breaks ground.</li>
                </ul>
              </td>
            </tr>

            <tr
              className={`${props.dividerColor} border-b align-text-top text-xs ${props.textColor} ${props.oddRowColor} ${props.evenRowColor}`}
            >
              <td
                className={`${props.dividerColor} border-r px-3 py-2 text-center align-middle text-lg lg:px-4 lg:text-xl`}
              >
                Presentation/ Marketability
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    The team appears to have not prepared for the presentation
                    at all
                  </li>
                  <li>Knowledge on the topic is not apparent</li>
                  <li>Questions asked by judges cannot be answered</li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    The team appears to have practiced for the presentation, but
                    the delivery is not smooth.
                  </li>
                  <li>Limited knowledge of the topic</li>
                  <li>
                    Questions asked by the judges can be partially answered with
                    uncertainty
                  </li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>The team is coordinated in their presentation. </li>
                  <li>
                    Presentation includes information regarding motivation,
                    marketability, and real-world applications of their product.
                  </li>
                  <li>Solid knowledge of the topic</li>
                  <li>
                    Questions asked by judges can be answered with simple
                    phrases
                  </li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    The presentation is engaging and team members appear
                    coordinated in the delivery.
                  </li>
                  <li>
                    Presentation provides unique perspectives on the motivation,
                    marketability, and real-world applications of their product.
                  </li>
                  <li>Good knowledge on the topic</li>
                  <li>
                    Questions asked by judges can be answered eloquently with
                    some code references
                  </li>
                </ul>
              </td>
              <td className="px-3 py-2 lg:px-4">
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    Presenters are enthusiastic and the presentation clearly
                    captivates the audience.
                  </li>
                  <li>
                    Presentation is visually appealing and provides unique
                    perspectives on the motivation, marketability, and
                    real-world applications of their product.
                  </li>
                  <li>Refined knowledge on the topic</li>
                  <li>
                    Questions asked by judges can be answered eloquently with
                    code references
                  </li>
                </ul>
              </td>
            </tr>

            <tr
              className={`align-text-top text-xs ${props.textColor} ${props.oddRowColor} ${props.evenRowColor}`}
            >
              <td
                className={`${props.dividerColor} border-r px-3 py-2 text-center align-middle text-lg lg:px-4 lg:text-xl`}
              >
                Design
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>The design of the product makes it unusable</li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    The design of the project overall detracts from its
                    functionality
                  </li>
                  <li>Product usage is not intuitive or difficult to follow</li>
                  <li>The product message and intention are unclear</li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    The product’s design neither detracts nor enhances its
                    functionality.
                  </li>
                  <li>
                    Presentation includes information regarding motivation,
                    marketability, and real-world applications of their product.
                  </li>
                  <li>
                    The product’s message is mostly clear but loosely relates to
                    its original idea.
                  </li>
                </ul>
              </td>
              <td
                className={`${props.dividerColor} border-r px-3 py-2 lg:px-4`}
              >
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>The product’s design is clean and uncluttered.</li>
                  <li>
                    The product is easy to use but may require some additional
                    instruction.
                  </li>
                  <li>
                    The product’s message is clear and the product’s design
                    relates to its original idea.
                  </li>
                </ul>
              </td>
              <td className="px-3 py-2 lg:px-4">
                <ul className="mx-2 list-outside list-disc space-y-1 text-left">
                  <li>
                    The product’s design is clean, visually appealing and
                    eye-catching.
                  </li>
                  <li>
                    The product is organized and can be used without any
                    additional instruction.
                  </li>
                  <li>
                    The product’s design enhances and aligns strongly with its
                    original idea.
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
