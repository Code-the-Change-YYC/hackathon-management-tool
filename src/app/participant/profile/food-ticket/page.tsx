import Image from "next/image";

import UserFoodTicket from "@/components/UserProfile/FoodTicket";

export default function FoodTicket() {
  return (
    <div className="flex size-full flex-col items-center bg-fuzzy-peach">
      <div className="hidden md:block">
        <Image
          src="/images/userProfile/Star_Icons.svg"
          alt="Right Squiggly SVG"
          width={30}
          height={30}
          className="md:absolute md:left-10 md:top-[50rem]"
        />
        <Image
          src="/images/userProfile/Star_Icons.svg"
          alt="Right Squiggly SVG"
          width={30}
          height={30}
          className="md:absolute md:right-8 md:top-[30rem]"
        />
        <Image
          src="/images/userProfile/Star_Icons.svg"
          alt="Right Squiggly SVG"
          width={30}
          height={30}
          className="md:absolute md:right-10 md:top-[60rem]"
        />{" "}
      </div>
      <div className="mb-3 flex w-fit flex-col items-center justify-between uppercase text-[#FF6B54] md:mx-10 md:px-16 md:py-10">
        <h1 className="mt-3 text-lg font-bold md:text-2xl">My Food Ticket</h1>
        <div className="bg-pink mt-10 flex w-fit flex-col items-center gap-5 rounded-3xl border-4 border-white bg-white/30 px-8 py-20 sm:flex-row sm:justify-start lg:gap-12 lg:px-20 lg:py-16">
          <UserFoodTicket />
        </div>
      </div>
    </div>
  );
}
