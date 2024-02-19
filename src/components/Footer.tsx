import SocialMediaIcons from "@/components/SocialMediaIcons";

const footerContainer =
  "flex flex-col items-center justify-center text-awesomer-purple h-36 bg-awesome-purple";

const Footer = () => {
  return (
    <div className={footerContainer}>
      <h2 className="font-bold">Keep Up With Us!</h2>
      <SocialMediaIcons />
      <h4 className="mt-6 font-medium text-ehhh-grey">
        Copyright @ Code the Change YYC
      </h4>
    </div>
  );
};
export default Footer;
