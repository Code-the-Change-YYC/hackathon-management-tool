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
      className={`flex h-32 w-56 flex-col justify-center gap-2 rounded-xl text-center text-white ${background}`}
    >
      <h1 className="text-2xl font-bold">{name}</h1>
      <div className="flex flex-row items-center justify-center gap-4 text-lg">
        <Image
          src="/svgs/resources/personIcon.svg"
          alt="Person Icon"
          width={15}
          height={15}
        />
        <h2>{role}</h2>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 text-lg">
        <Image
          src="/svgs/resources/discordLogo.svg"
          alt="Discord Icon"
          width={20}
          height={20}
        />
        <h2>{discord}</h2>
      </div>
    </div>
  );
}
