import SocialMediaIcons from "@/components/atoms/SocialMediaIcons";

const Footer = () => {
  return (
    <div
      className={
        "flex h-36 w-dvw flex-col items-center justify-center bg-awesome-purple text-awesomer-purple"
      }
    >
      <h2 className="font-bold">Keep Up With Us!</h2>
      <SocialMediaIcons />
      <h4 className="mt-4 font-medium text-ehhh-grey">
        Copyright @ Code the Change YYC
      </h4>
    </div>
  );
};
export default Footer;
