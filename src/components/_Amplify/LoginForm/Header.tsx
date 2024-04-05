import { View, useTheme } from "@aws-amplify/ui-react";

const Header = () => {
  const { tokens } = useTheme();

  return (
    <View textAlign="center" padding={tokens.space.large}>
      <div className=" text-6xl font-bold text-white">
        Register for Hack the Change{" "}
        <span className="text-green-200">2024</span>
      </div>
    </View>
  );
};
export default Header;
