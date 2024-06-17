import Image from "next/image";

const exit_icon = "/svgs/judging/exit_icon.svg";

interface ModalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
}

const ModalPopup = (props: ModalPopupProps) => {
  const { isOpen, onClose, teamName } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-4/5 max-w-[1200px] rounded-md bg-white p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Scoring {teamName}</h1>
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
