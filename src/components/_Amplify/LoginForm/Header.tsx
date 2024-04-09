import Image from "next/image";

import { View, useTheme } from "@aws-amplify/ui-react";

const Header = () => {
  const { tokens } = useTheme();

  return (
    <div className="relative">
      <Image
        className=" absolute right-[-7rem] top-1/2"
        src={"/svgs/login/Vector_4.svg"}
        width={117}
        height={19}
        alt={""}
      />
      <Image
        src={"/svgs/login/Group_114.svg"}
        className="absolute left-[-16rem] top-1/2"
        width={276}
        height={85}
        alt={""}
      />
      <View textAlign="center" padding={tokens.space.large}>
        <div className=" text-6xl font-bold text-white">
          Register for Hack the Change{" "}
          <span className="text-green-200">2024</span>
        </div>
      </View>
    </div>
  );
};
export default Header;
