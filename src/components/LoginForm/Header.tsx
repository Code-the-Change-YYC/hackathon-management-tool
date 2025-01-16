import Image from "next/image";

const Header = () => {
  return (
    <div className="relative pb-8 pt-6 text-center">
      <div className="pointer-events-none hidden select-none md:block">
        <Image
          className=" absolute -top-2 right-[-125px] "
          src={"/svgs/login/Vector_4.svg"}
          width={117}
          height={19}
          alt={""}
        />
        <Image
          src={"/svgs/login/Group_114.svg"}
          className="absolute left-[-280px]"
          width={276}
          height={85}
          alt={""}
        />
      </div>
      <div className=" text-4xl font-bold text-white lg:text-6xl">
        Register for Hack the Change
        <span className="text-pastel-green"> 2024</span>
      </div>
    </div>
  );
};
export default Header;
