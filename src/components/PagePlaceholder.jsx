import { FaInstagram, FaLinkedin } from "react-icons/fa";

import { enableLandingPage } from "@/featureFlags";

const PagePlaceholderStyles =
  "flex flex-col w-full h-screen items-center justify-center";

const PagePlaceholder = () => {
  return enableLandingPage ? (
    <div className={PagePlaceholderStyles}>
      <h1 className="text-center text-3xl">
        Under construction, stay tuned on social media for more!
      </h1>
      <div className="mt-[20px] flex">
        <a
          href="https://www.instagram.com/codethechangeyyc"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4"
        >
          <FaInstagram size={35} />
        </a>
        <a
          href="https://www.linkedin.com/company/code-the-change-yyc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={35} />
        </a>
      </div>
    </div>
  ) : null;
};

export default PagePlaceholder;
