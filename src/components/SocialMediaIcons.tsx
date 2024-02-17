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

const SocialMediaIcons = ({ classes }: { classes: string }) => {
  type socialMediaType = {
    link: string;
    icon: IconType;
  };

  const links: socialMediaType[] = [
    {
      link: "https://www.facebook.com/CodeTheChangeYYC/",
      icon: FaFacebook as IconType,
    },
    {
      link: "https://www.instagram.com/codethechangeyyc/",
      icon: FaInstagram as IconType,
    },
    {
      link: "https://www.tiktok.com/@codethechangeyyc/",
      icon: FaTiktok as IconType,
    },
    {
      link: "https://www.linkedin.com/company/code-the-change-yyc/",
      icon: FaLinkedin as IconType,
    },
    {
      link: "https://www.youtube.com/channel/UC4wZt-bCL31HjxUF-zc5U_g",
      icon: FaYoutube as IconType,
    },
    {
      link: "https://github.com/Code-the-Change-YYC",
      icon: FaGithub as IconType,
    },
  ];

  return (
    <div className={`flex items-start space-x-6 pt-5 ${classes}`}>
      {links.map(({ link, icon: Icon }) => (
        <Link href={link} key={link}>
          <Icon size={ICON_SIZE} className="cursor-pointer" />
        </Link>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
