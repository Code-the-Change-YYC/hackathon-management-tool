import Image from "next/image";

import LoadingRing from "@/components/LoadingRing";

export default function KevinLoadingRing() {
  return (
    <>
      <div className="m-4 flex h-full flex-col justify-center text-center text-2xl">
        <div className="-ml-4 mb-16 flex justify-center">
          <LoadingRing />
        </div>
        <Image
          className="animate-bounce"
          src="/svgs/admin/Kevin.svg"
          alt="Kevin Icon"
          width={240}
          height={240}
        />
        <div className="ml-2 flex w-full items-center justify-center space-x-1">
          <span className="text-dark-pink">Loading</span>
          <span className=" mt-3 size-2 animate-pulse rounded-full bg-dark-pink delay-200"></span>
          <span className="delay-400 mt-3 size-2 animate-pulse rounded-full bg-dark-pink"></span>
          <span className="delay-600 mt-3 size-2 animate-pulse rounded-full bg-dark-pink"></span>
        </div>
      </div>
    </>
  );
}
