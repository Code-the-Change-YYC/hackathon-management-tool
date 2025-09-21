import Image from "next/image";

type FaqAccordionProps = {
  title: string;
  data: React.ReactNode;
  isOpen: boolean;
  toggleAccordion: () => void;
};

export default function FaqAccordion({
  title,
  data,
  isOpen,
  toggleAccordion,
}: FaqAccordionProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-4 w-2/3 text-white lg:w-1/2">
        <button
          className={`flex w-full justify-between bg-dark-pink p-4 text-left text-sm drop-shadow-md transition duration-200 md:text-base ${isOpen ? "rounded-t-xl" : "rounded-xl"}`}
          onClick={toggleAccordion}
        >
          {title}
          <Image
            src="/svgs/importantInfo/caret.svg"
            alt="caret"
            width={18}
            height={18}
            className={`float-right transform items-center justify-center align-middle ${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-200`}
          />
        </button>
        {isOpen && (
          <div className="rounded-b-xl bg-fuzzy-peach p-4 text-grapefruit drop-shadow-md">
            {data}
          </div>
        )}
      </div>
    </div>
  );
}
