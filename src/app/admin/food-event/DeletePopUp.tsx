import Image from "next/image";

const exit_icon = "/svgs/admin/exit_icon.svg";

const DELETE_RECORD_POPUP_TILE_STYLES =
  "bg-opacity-25 flex backdrop-blur-sm fixed inset-0 justify-center items-center  ";

type DeletePopUpProps = {
  isPopUpVisible: boolean;
  onClose: () => void;
};

const DeletePopUp = ({ isPopUpVisible, onClose }: DeletePopUpProps) => {
  if (!isPopUpVisible) return null;
  return (
    <div className={DELETE_RECORD_POPUP_TILE_STYLES}>
      <div className="w-2/5 rounded-md border-2 bg-white p-8">
        <div className="flex items-start justify-between">
          <h1 className="mb-4 text-2xl font-bold">
            Are you sure you want to delete this record?
          </h1>
          <button onClick={onClose}>
            <Image
              src={exit_icon}
              alt="Exit page icon"
              width={15}
              height={15}
              className="mt-2"
            />
          </button>
        </div>
        <p className="mb-8">
          This record will be deleted{" "}
          <i>
            <b>permanently</b>
          </i>
          . You cannot undo this action.
        </p>
        <div className="flex justify-end">
          <button className="mr-4 rounded-md border border-black p-2 px-6 hover:opacity-40">
            Cancel
          </button>
          <button className="rounded-md border bg-dark-pink p-2 px-6 text-white hover:bg-pastel-pink">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
