import Image from "next/image";

const exit_icon = "/svgs/judging/exit_icon.svg";

const MODAL_POPUP_SECTION_STYLES =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/60";
const MODAL_POPUP_TILE_STLYES = "w-4/5 max-w-[1200px] rounded-md bg-white p-6";

interface ModalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  isEditing: boolean;
}

// can edit logic once modal is implemented
const ModalPopup = (props: ModalPopupProps) => {
  const { isOpen, onClose, teamName, isEditing } = props;

  if (!isOpen) return null;

  return (
    <div className={MODAL_POPUP_SECTION_STYLES}>
      <div className={MODAL_POPUP_TILE_STLYES}>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">
            {isEditing ? `Editing ${teamName}` : `Scoring ${teamName}`}
          </h1>
          <button onClick={onClose}>
            <Image
              src={exit_icon}
              height={20}
              width={20}
              alt="Exit popup icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
