import Image from "next/image";

type memberProps = {
  name: string;
  discord?: string;
  role: string;
  background: string;
};

export default function MemberCards({
  name,
  discord,
  role,
  background,
}: memberProps) {
  return (
    <div
      className={`flex h-28 w-52 flex-col justify-center gap-2 rounded-xl text-center text-white lg:h-32 lg:w-60 ${background}`}
    >
      <h1 className="text-xl font-bold lg:text-2xl">{name}</h1>
      <div className="flex flex-row items-center justify-center gap-4 text-base lg:text-lg">
        <Image
          src="/svgs/resources/personIcon.svg"
          alt="Person Icon"
          width={15}
          height={15}
          className="pointer-events-none"
        />
        <h2>{role}</h2>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 text-base lg:text-lg">
        <Image
          src="/svgs/resources/discordLogo.svg"
          alt="Discord Icon"
          width={20}
          height={20}
          className="pointer-events-none"
        />
        <h2>{discord}</h2>
      </div>
    </div>
  );
}
