import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import PastWinners from "./LandingPage/PastWinners";

const PagePlaceholderStyles =
  "flex flex-col w-full h-screen items-center justify-center";

const PagePlaceholder = () => {
  return (
    <div className={PagePlaceholderStyles}>
      <PastWinners />
      <h1 className="text-center text-3xl ">
        Under construction, stay tuned on social media for more!
      </h1>
      <div className="mt-[20px] flex">
        <Link
          href="https://www.instagram.com/codethechangeyyc"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4"
        >
          <FaInstagram size={35} />
        </Link>
        <Link
          href="https://www.linkedin.com/company/code-the-change-yyc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={35} />
        </Link>
      </div>
    </div>
  );
};

export default PagePlaceholder;
