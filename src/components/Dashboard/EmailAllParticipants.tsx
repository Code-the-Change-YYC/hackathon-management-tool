import { useEffect } from "react";

type Props = { closeModal: () => void };

export default function EmailAllParticipants({ closeModal }: Props) {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const modal = document.querySelector(".modal-container");
      if (modal && !modal.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);
  return (
    <div className="flex size-full items-center justify-center">
      <div className="modal-container max-w-2xl rounded-3xl bg-light-grey shadow-2xl">
        <div className="flex items-center justify-between rounded-t-3xl bg-awesomer-purple p-6">
          <h2 className="text-lg font-semibold text-white">
            Email All Participants
          </h2>
          <button
            onClick={closeModal}
            className="text-2xl text-white hover:text-gray-300"
          >
            &times;
          </button>
        </div>
        <form className="flex flex-col justify-center gap-6 p-6">
          <div className="flex flex-row justify-between">
            <div>
              <label className="text-md font-medium text-black">From:</label>
              <input
                type="text"
                value="Code The Change"
                readOnly
                className="rounded-md bg-gray-100 p-2 text-gray-500"
              />
            </div>
            <div>
              <label className="text-md font-medium text-black">To:</label>
              <input
                type="text"
                value="All Participants"
                readOnly
                className="rounded-md bg-gray-100 p-2 text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <label className="text-md relative stroke-white font-bold text-black">
              Subject:
            </label>
            <input
              type="text"
              placeholder="Enter subject here"
              className="w-3/4 rounded-md p-2 focus:ring-1 focus:ring-awesome-purple"
            />
          </div>
          <div className="shadow-t-xl flex h-1/2 flex-col rounded-2xl bg-white shadow-lg shadow-awesomer-purple">
            <textarea
              rows={6}
              placeholder="Enter your message here"
              className="rounded-2xl p-2 focus:ring-1 focus:ring-awesome-purple"
            />
          </div>
          <div className="mt-8 flex items-center justify-center font-extrabold">
            <button
              type="submit"
              className="w-32 rounded-3xl bg-awesomer-purple p-2 text-white shadow-lg ring-1 ring-white transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:bg-awesomer-purple/90"
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
