const TEAMS_TABLE_SECTION_STYLES =
  "text-xl text-black flex flex-col items-center";
const TEAMS_TABLE_SECTION_CONTENT_STYLES = "w-4/5 max-w-[1500px]";

const TEAMS_TABLE_FILTER_TILE_STYLES = "bg-light-grey m-8 p-4 rounded-md";
const TEAMS_TABLE_FILTER_BAR_STYLES = "bg-white rounded-md";
const TEAMS_TABLE_FILTER_CONTENT_STYLES = "";
const FILTER_CHECKBOX_COLUMN_STYLES =
  "flex max-w-[1200px] justify-between mx-auto p-8";
const FILTER_CHECKBOX_STLYES = "h-5 w-5 m-2";

const TEAMS_TABLE_SEARCH_RESULTS_BAR_STYLES = "bg-white rounded-md";
const TEAMS_TABLE_DATA_TILE_STYLES = "bg-light-grey m-8 p-4 rounded-md";
const TEAMS_TABLE_DATA_CELL_STYLES = "rounded-md p-6";

const teams = [
  { teamName: "PickledBread", status: "TEAM - Approved, Not Checked in" },
  { teamName: "EcoFlow", status: "TEAM - Approved, Checked In" },
  { teamName: "CatLovers", status: "TEAM - Approved, Not Checked In" },
];

const TeamsTablePage = () => {
  return (
    <div className={TEAMS_TABLE_SECTION_STYLES}>
      <div className={TEAMS_TABLE_SECTION_CONTENT_STYLES}>
        {/* filter tile */}
        <div className={TEAMS_TABLE_FILTER_TILE_STYLES}>
          {/* filter search box */}
          <div className={TEAMS_TABLE_FILTER_BAR_STYLES}>
            <h1 className="m-2 p-4">Filters</h1>
          </div>
          <div className={TEAMS_TABLE_FILTER_CONTENT_STYLES}>
            <label className="ml-8">
              <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
              Teams
            </label>
            {/* filter columns */}
            <div className={FILTER_CHECKBOX_COLUMN_STYLES}>
              <div className="ml-12 flex-col ">
                <div>
                  <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                  <label>Approved</label>
                </div>
                <div>
                  <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                  <label>Checked-in</label>
                </div>
              </div>
              <div>
                <div>
                  <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                  <label>In-active</label>
                </div>
                <div>
                  <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                  <label>Short-term</label>
                </div>
                <div>
                  <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                  <label>Long-term</label>
                </div>
              </div>
              <div>
                <div>
                  <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                  <label>Archived</label>
                </div>
                <div>
                  <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                  <label>Rejected</label>
                </div>
                <div>
                  <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                  <label>Removed</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* teams data tile */}
        <div className={TEAMS_TABLE_DATA_TILE_STYLES}>
          {/* search results bar */}
          <div className={TEAMS_TABLE_SEARCH_RESULTS_BAR_STYLES}>
            <h1 className="m-2 p-4">Search Results (100 teams found)</h1>
          </div>
          <div>
            <table className="mt-6 w-full border-separate border-spacing-x-2 text-left">
              <thead className="bg-dark-grey">
                <tr className="text-white">
                  <th className="w-1/2 rounded-md p-6">Team Name</th>
                  <th className={TEAMS_TABLE_DATA_CELL_STYLES}>Status</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-medium-grey"}`}
                  >
                    <td className={TEAMS_TABLE_DATA_CELL_STYLES}>
                      {team.teamName}
                    </td>
                    <td className={TEAMS_TABLE_DATA_CELL_STYLES}>
                      {team.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsTablePage;
