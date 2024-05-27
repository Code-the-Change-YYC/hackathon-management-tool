import Image from "next/image";
import Link from "next/link";

const check_mark_icon = "/svgs/checkin/check_mark.svg";

const CheckInPage = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="my-20 flex w-4/5 max-w-[1100px] flex-col items-center rounded-xl border-2 border-dark-pink bg-white p-10 shadow-[15px_15px_0px_0px_#FF4D6F]">
        <Image
          src={check_mark_icon}
          height={80}
          width={80}
          alt="Check mark icon"
          className="mb-4"
        />
        <h1 className="mb-2 text-2xl font-bold text-dark-pink">
          You&apos;re Checked In!
        </h1>
        <p className="mb-6 max-w-[480px] text-center text-lg text-black">
          Thanks for checking in to Hack the Change 2024! Click the button below
          to return to your profile.
        </p>
        <Link
          href="/participant/profile"
          className="rounded-xl bg-dark-pink p-4 font-bold hover:bg-pastel-pink"
        >
          Go To Profile
        </Link>
      </div>
    </div>
  );
};

export default CheckInPage;
