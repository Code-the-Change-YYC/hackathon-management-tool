import Image from "next/image";

const exit_icon = "/svgs/admin/exit_icon.svg";

const POPUP_SECTION_STYLES =
  "fixed left-0 top-0 flex size-full items-center justify-center bg-black/60";
const POPUP_TILE_STYLES = "w-4/5 max-w-[1200px] rounded-md bg-white p-4";

const POPUP_TILE_HEADER_STYLES = "mb-2 flex justify-between";

const POPUP_TILE_TABLE_SECTION_STYLES =
  "mb-8 rounded-md border border-awesomer-purple bg-light-grey p-2";
const POPUP_TILE_TABLE_CONTENT_STYLES =
  "w-full border-separate border-spacing-2 text-left";
const POPUP_TILE_TABLE_HEADER_STYLES = "bg-awesome-purple text-white";
const POPUP_TILE_TABLE_CELL_STYLES = "rounded-md p-2";

interface PopupProps {
  selectedMembersData: string[];
  selectedMemberStatus: string | string[];
  teamName: string;
  onClose: () => void;
}

const Popup = ({
  selectedMembersData,
  selectedMemberStatus,
  onClose,
  teamName,
}: PopupProps) => {
  return (
    <div className={POPUP_SECTION_STYLES}>
      <div className={POPUP_TILE_STYLES}>
        <div className={POPUP_TILE_HEADER_STYLES}>
          <h1 className="text-3xl font-semibold">{teamName}&apos;s Team</h1>
          <button className="mr-2" onClick={onClose}>
            <Image
              src={exit_icon}
              alt="Exit page icon"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className={POPUP_TILE_TABLE_SECTION_STYLES}>
          <table className={POPUP_TILE_TABLE_CONTENT_STYLES}>
            <thead>
              <tr className={POPUP_TILE_TABLE_HEADER_STYLES}>
                <th className="w-1/2 rounded-md p-2">Members</th>
                <th className={POPUP_TILE_TABLE_CELL_STYLES}>Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedMembersData.map((member, index) => (
                <tr className="bg-white" key={member}>
                  <td className={POPUP_TILE_TABLE_CELL_STYLES}>{member}</td>
                  <td className={POPUP_TILE_TABLE_CELL_STYLES}>
                    {selectedMemberStatus[index]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Popup;
