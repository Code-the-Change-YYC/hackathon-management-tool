import Image from "next/image";

export function Underline({
  children,
  noTick,
}: {
  children: React.ReactNode;
  noTick?: boolean;
}) {
  return (
    <div className="relative flex w-fit flex-col">
      <div className="flex w-fit">
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
      <Image
        className="pointer-events-none m-5 w-full select-none pr-5 lg:m-10"
        src="/images/register/group_58.png"
        objectFit="contain"
        alt=""
        fill
      />
    </div>
  );
}
