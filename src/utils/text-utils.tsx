import Image from "next/image";

export function Underline({
  children,
  noTick,
}: {
  children: React.ReactNode;
  noTick?: boolean;
}) {
  return (
    <span className="relative w-fit">
      <div className="flex">
        {!noTick && (
          <Image
            className="pointer-events-none select-none"
            src="/svgs/login/vector_112.svg"
            alt=""
            width={20}
            height={20}
          />
        )}
        {children}
      </div>
      <div className="absolute h-4 w-full">
        <Image
          src="/images/register/group_58.png"
          objectFit="contain"
          alt=""
          fill
        />
      </div>
    </span>
  );
}
