import Image from "next/image";

const STATS_PANEL_TILE_STYLES =
  "flex h-full flex-col items-center justify-center rounded-lg bg-white px-6 py-8 drop-shadow-md";
const STATS_PANEL_ICON_CONTAINER_STYLES =
  "flex size-12 items-center justify-center rounded-full bg-pastel-pink";
const STATS_PANEL_NUMBER_STYLES = "my-2 text-5xl font-semibold";
const STATS_PANEL_SUBHEADER_STYLES = "max-w-[150px] text-center";

interface StatsPanelProps {
  icon: string;
  stat: number;
  alt: string;
  subheader: string;
}

const StatsPanel = (props: StatsPanelProps) => {
  const { icon, stat, alt, subheader } = props;

  return (
    <div className={STATS_PANEL_TILE_STYLES}>
      <div className={STATS_PANEL_ICON_CONTAINER_STYLES}>
        <Image src={icon} height={50} width={25} alt={alt} />
      </div>
      <h1 className={STATS_PANEL_NUMBER_STYLES}>
        <i>{stat}</i>
      </h1>
      <p className={STATS_PANEL_SUBHEADER_STYLES}>{subheader}</p>
    </div>
  );
};

export default StatsPanel;
