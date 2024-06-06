import Link from "next/link";

export default function page() {
  const BUTTON_STYLES =
    "bg-awesomer-purple flex items-center justify-center w-full py-2 hover:opacity-90 transition duration-300 font-medium text-xl rounded-full border-4 border-white shadow-md md:w-[300px]";

  // TODO: Add a reminder to join a team in two days
  return (
    <div className="flex w-full flex-col justify-center gap-6 rounded-3xl bg-white p-4 md:p-8">
      <div className=" py-24 text-center text-3xl font-bold">
        {/* TODO: Update "two" to be dynamic */}
        We will remind you to join a team in two days!
      </div>
      <div className="flex justify-end">
        <Link className={BUTTON_STYLES} href={"/"}>
          <button className="text-white ">Close</button>
        </Link>
      </div>
    </div>
  );
}
