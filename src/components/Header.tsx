import Image from "next/image";
import Link from "next/link";

const headerContainerStyles =
  "flex flex-row items-center justify-between text-awesomer-purple h-36 bg-white px-8";

const isSignedIn = true;
const hasTeam = true;

export default function Header() {
  return (
    <div className={headerContainerStyles}>
      <div className="flex w-48 font-semibold">
        {isSignedIn ? (
          hasTeam && <Link href="/">Join a Team</Link>
        ) : (
          <Link href="/">Join Hackathon</Link>
        )}
      </div>

      <div className="flex w-48 justify-center">
        <Link href="/">
          <Image
            src="/CTCLogo.svg"
            alt="Awesome Logo"
            width={70}
            height={70}
            className="shadow-lg"
          />
        </Link>
      </div>

      <div className="flex w-48 justify-end">
        {isSignedIn && (
          <Link href="/">
            <Image
              src={
                // This is temporary. replace with user profile image
                "/MissingProfile.png"
              }
              alt={"profile image"}
              width={70}
              height={70}
              className="rounded-full"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
