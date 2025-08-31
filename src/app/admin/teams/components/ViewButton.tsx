import { useState } from "react";
import Modal from "./Modal";
import type { Team } from "./TeamsTablePage";

export default function ViewButton({ team }: { team: Team }) {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <button
        className=" text-awesome-purple"
        onClick={() => setShowPopup(!showPopup)}
      >
        View
      </button>
      {showPopup && (
        <Modal onClose={() => setShowPopup(!showPopup)}>
          <h1 className="text-3xl font-semibold">
            {team.name}
            {"'s"} Team
          </h1>
          <table className="w-full border-separate border-spacing-2 text-left">
            <thead>
              <tr className="bg-awesome-purple text-white">
                <th className="w-1/2 rounded-md p-2">Members</th>
                <th className="rounded-md p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {team.members.map((member) => (
                <tr className="odd:bg-light-grey" key={member.id}>
                  <td className={"rounded-md p-2"}>
                    {`${member.firstName} ${member.lastName}`}
                  </td>
                  <td className={"rounded-md p-2"}>{member.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      )}
    </>
  );
}
