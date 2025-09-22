import Image from "next/image";

interface ResourceCardsProp {
  name: string;
  imgSrc: string;
  description: string;
  link: string;
}

export default function ResourceCards({
  name,
  imgSrc,
  description,
  link,
}: ResourceCardsProp) {
  return (
    <div className="flex w-72 flex-col items-center justify-center gap-4 rounded-xl bg-pale-grey p-4 drop-shadow-lg hover:scale-105 md:w-[350px] md:flex-row xl:w-[400px]">
      <Image
        src={imgSrc}
        alt={`${name} image`}
        width={100}
        height={100}
        className="pointer-events-none"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-extrabold">{name}</h1>
        <p>{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreffer"
          className="text-end text-black/50 hover:underline"
        >
          Visit →
        </a>
      </div>
    </div>
  );
}
