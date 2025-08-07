import Image from "next/image";

export default function KevinLoadingRing() {
  return (
    <>
      <div className="m-4 flex h-full flex-col justify-center text-center text-2xl">
        <Image
          className="animate-bounce"
          src="/svgs/admin/Kevin.svg"
          alt="Kevin Icon"
          width={240}
          height={240}
        />
        <div className="ml-2 flex w-full items-center justify-center space-x-1">
          <span className="font-semibold text-dark-grey">Loading</span>
          <span className=" mt-3 size-1 animate-pulse rounded-full bg-dark-grey delay-200"></span>
          <span className="delay-400 mt-3 size-1 animate-pulse rounded-full bg-dark-grey"></span>
          <span className="delay-600 mt-3 size-1 animate-pulse rounded-full bg-dark-grey"></span>
        </div>
      </div>
    </>
  );
}
