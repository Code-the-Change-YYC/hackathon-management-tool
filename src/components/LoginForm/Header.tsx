import Image from "next/image";

const Header = () => {
  return (
    <div className="relative pb-4 text-center">
      <div className="hidden md:block">
        <Image
          className=" absolute -top-6 right-[-130px] "
          src={"/svgs/login/Vector_4.svg"}
          width={117}
          height={19}
          alt={""}
        />
        <Image
          src={"/svgs/login/Group_114.svg"}
          className="absolute left-[-300px]"
          width={276}
          height={85}
          alt={""}
        />
      </div>
      <div className=" text-4xl font-bold text-white lg:text-6xl">
        Register for Hack the Change{" "}
        <span className="text-green-200">2024</span>
      </div>
    </div>
  );
};
export default Header;
