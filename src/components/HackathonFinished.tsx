import Image from "next/image";
import SocialMediaIcons from "@/components/atoms/SocialMediaIcons";

const HackathonFinished = () => {
  return (
    <div className="relative min-h-screen w-full bg-cover bg-center">
      <Image
        src="/images/landingpage/HackathonFinished/hackathon_finished_background.png"
        alt="Hackathon has finished background"
        fill={true}
        style={{ objectFit: "cover" }}
        className="pointer-events-none"
        quality={100}
        priority
      />
      <div className="relative flex h-screen items-center justify-center">
        <div className="flex -translate-y-16 flex-col items-center gap-1.5">
          <Image
            src="/CTCLogo.svg"
            alt="CTC Logo"
            className="mb-4"
            width="71"
            height="71"
          />
          <p className="text-shadow-title-hackathon-finished font-omnes text-8xl font-bold text-white">
            Hack the Change
          </p>
          <p className="text-shadow-title-hackathon-finished text-mint-green font-omnes text-8xl font-bold">
            2025
          </p>
          <p className="mt-2.5 font-omnes text-5xl font-bold tracking-wide text-white">
            has finished!
          </p>
          <div className="mb-5 mt-1.5 scale-90 ">
            <SocialMediaIcons />
          </div>
          <div>
            <p className="text-grey-purple rounded-full bg-white px-6 py-3 text-2xl italic shadow-md">
              Thank-you to all participants, judges and sponsors!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonFinished;
