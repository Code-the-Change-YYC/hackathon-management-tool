import Image from "next/image";

const CONTAINER_STYLES = "flex h-60 items-center justify-center bg-[#FF6B54]";

export default function ProfileHeader() {
  return (
    <div className={CONTAINER_STYLES}>
      <div className="absolute top-44 flex flex-row md:left-20 md:top-52 md:z-10 ">
        <Image
          src="/images/userProfile/profile.png"
          alt="Profile Image"
          width={120}
          height={120}
          className="align-start mr-2 rounded-full border-4 border-white md:mr-10 md:h-36 md:w-36 lg:-mt-4 lg:ml-4 lg:h-60 lg:w-60 lg:border-8"
        />
      </div>
      <div className="mt-40 flex flex-row items-center md:mt-0">
        <Image
          src="/images/userProfile/Squiggly_Left.svg"
          alt="Left Squiggly"
          width={105}
          height={60}
          className="absolute left-0 mr-1 mt-2 md:h-56 md:w-52 lg:mb-8 lg:block lg:h-1/3 lg:w-2/5"
        />
        <h1 className="flex text-center text-xl font-extrabold text-white md:text-4xl">
          Hello, <span className="italic">Full Name!</span>
        </h1>
        <Image
          src="/images/userProfile/Squiggly_Right.svg"
          alt="Right Squiggly"
          width={105}
          height={60}
          className="absolute right-0 ml-1 mt-2 md:right-0 md:h-56 md:w-60  lg:right-20 lg:block lg:h-1/3 lg:w-1/3"
        />
      </div>
    </div>
  );
}
