import SocialMediaIcons from "@/components/SocialMediaIcons";

const footerContainer =
  "flex flex-col items-center justify-center text-[#A689FF] h-36 bg-[#FFFFFF] md:bg-[#7055FD]";

const Footer = () => {
  return (
    <>
      <div className={footerContainer}>
        <h2 className="font-medium">Keep Up With Us!</h2>
        <SocialMediaIcons classes="text-[#7055FD] md:text-white" />
        <h4 className="mt-6 font-light text-[#C5C5C5]">
          Copyright @ Code the Change YYC
        </h4>
      </div>
    </>
  );
};
export default Footer;
