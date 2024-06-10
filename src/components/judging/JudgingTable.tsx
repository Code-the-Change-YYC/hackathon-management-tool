import Image from "next/image";

const check_icon = "/svgs/judging/circle_check.svg";

const JUDGE_TABLE_HEADER_CELL_STLYES =
  "text-white text-xl font-medium py-4 bg-dark-pink";
const JUDGE_TABLE_CELL_STYLES = "text-center text-lg py-4";

const PAGINATION_BUTTON_STYLES =
  "bg-dark-pink text-white rounded-full pb-1 px-6 mr-2";

interface JudgingTableProps {
  tableHeaders: Array<{ columnHeader: string; className: string }>;
  tableData: Array<(string | boolean)[]>;
}

const JudgingTable = (props: JudgingTableProps) => {
  const { tableHeaders, tableData } = props;

  return (
    <div className="h-full rounded-lg bg-white p-6 drop-shadow-md">
      <div>
        <table className="w-full border-separate border-spacing-x-0.5">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`${JUDGE_TABLE_HEADER_CELL_STLYES} ${header.className}`}
                >
                  {header.columnHeader}
                </th>
              ))}
              <th className="w-1/5 rounded-tr-lg bg-dark-pink"></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-[#f1f1f1]" : "bg-[#e1e1e1]"}`}
              >
                {/* iterates through all rows except last (boolean for scored status) */}
                {row.slice(0, -1).map((cell, cellIndex) => (
                  <td key={cellIndex} className={JUDGE_TABLE_CELL_STYLES}>
                    {cell}
                  </td>
                ))}
                <td className={JUDGE_TABLE_CELL_STYLES}>
                  {row[row.length - 1] ? (
                    <div className="flex justify-center">
                      <Image
                        src={check_icon}
                        height={40}
                        width={25}
                        alt="Checkmark icon"
                      />
                    </div>
                  ) : (
                    <button className="rounded-full border-2 border-dark-pink bg-pastel-pink px-2 py-1 text-sm text-dark-pink">
                      + Create Score
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex justify-end">
          <button className={PAGINATION_BUTTON_STYLES}>&lt;</button>
          <button className={PAGINATION_BUTTON_STYLES}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default JudgingTable;
