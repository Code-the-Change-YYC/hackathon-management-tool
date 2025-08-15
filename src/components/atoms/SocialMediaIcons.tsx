import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const ICON_SIZE = 30;

const SocialMediaIcons = () => {
  type socialMediaType = {
    link: string;
    icon: IconType;
  };

  const links: socialMediaType[] = [
    {
      link: "https://www.facebook.com/CodeTheChangeYYC/",
      icon: FaFacebook,
    },
    {
      link: "https://www.instagram.com/codethechangeyyc/",
      icon: FaInstagram,
    },
    {
      link: "https://www.tiktok.com/@codethechangeyyc/",
      icon: FaTiktok,
    },
    {
      link: "https://www.linkedin.com/company/code-the-change-yyc/",
      icon: FaLinkedin,
    },
    {
      link: "https://www.youtube.com/channel/UC4wZt-bCL31HjxUF-zc5U_g",
      icon: FaYoutube,
    },
    {
      link: "https://github.com/Code-the-Change-YYC",
      icon: FaGithub,
    },
  ];

  return (
    <div className={`flex items-start space-x-6 pt-3 text-white `}>
      {links.map(({ link, icon: Icon }) => (
        <Link href={link} key={link} target="_blank">
          <Icon
            size={ICON_SIZE}
            className="cursor-pointer transition-all duration-300 hover:scale-110"
          />
        </Link>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
