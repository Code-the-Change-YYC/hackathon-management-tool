import Image from "next/image";

interface StatsPanelProps {
  icon: string;
  stat: number;
  alt: string;
  subheader: string;
}

const StatsPanel = (props: StatsPanelProps) => {
  const { icon, stat, alt, subheader } = props;

  return (
    <div className="mb-4 flex min-h-[225px] flex-col items-center justify-center rounded-lg bg-white px-6 py-8 drop-shadow-md">
      <div className="flex size-12 items-center justify-center rounded-full bg-pastel-pink">
        <Image src={icon} height={50} width={25} alt={alt} />
      </div>
      <h1 className="my-2 text-5xl font-semibold">
        <i>{stat}</i>
      </h1>
      <p className="max-w-[150px] text-center">{subheader}</p>
    </div>
  );
};

export default StatsPanel;
