const JUDGE_TABLE_HEADER_CELL_STLYES = "text-white py-3 bg-dark-pink";

interface JudgingTableProps {
  tableHeaders: Array<{ columnHeader: string; className: string }>;
}

const JudgingTable = (props: JudgingTableProps) => {
  const { tableHeaders } = props;

  return (
    <div className="rounded-lg bg-white p-6 drop-shadow-md">
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
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JudgingTable;
