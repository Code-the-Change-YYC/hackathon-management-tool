import Image from "next/image";
import Card from "../Dashboard/Card";

interface StatsPanelProps {
  icon: string;
  stat: number;
  alt: string;
  subheader: string;
}

const StatsPanel = (props: StatsPanelProps) => {
  const { icon, stat, alt, subheader } = props;

  return (
    <Card className="flex-1">
      <div
        className={
          "flex size-12 items-center justify-center rounded-full bg-pastel-pink"
        }
      >
        <Image src={icon} height={50} width={25} alt={alt} />
      </div>
      <h1 className={"my-2 text-5xl font-semibold"}>
        <i>{stat}</i>
      </h1>
      <p className={"max-w-[150px] text-center"}>{subheader}</p>
    </Card>
  );
};

export default StatsPanel;
