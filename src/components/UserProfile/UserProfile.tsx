import Link from "next/link";

const LINK_STYLES =
  "align-center text-center text-1xl md:text-md my-12 flex flex-row gap-16 text-[#FF6B54]";
const INPUT_STYLES =
  "rounded-full border-4 border-white bg-[#FFFFFF] /50 ps-3 py-2 my-2 text-sm md:text-md";
const BUTTON_STYLES =
  " rounded-full border-4 border-white bg-[#FF6B54] px-10  md:px-12 py-2 my-2 text-white";

const UserProfile = () => {
  return (
    <div className="flex w-full flex-col bg-[#FFD7C5]">
      <div className="flex h-60 items-center justify-center bg-[#FF6B54]">
        <div>Squiggly 1</div>
        <h1 className="text-4xl font-extrabold text-white">
          Hello, <span className="italic">Full Name!</span>
        </h1>
        <div>Squiggly 2</div>
      </div>
      <div className="px-10  md:px-16 md:py-10">
        <div className={LINK_STYLES}>
          <Link href="/participant/profile">My details</Link>
          <Link href="/participant/profile/team-details">Team details</Link>
          <Link href="/participant/profile/food-ticket">Food Ticket</Link>
        </div>
        <div className="mb-3 flex justify-between uppercase text-[#FF6B54]">
          <h1 className="mt-4 text-lg font-bold md:mt-3 md:text-2xl">
            My Details
          </h1>
          <button className={BUTTON_STYLES}>Edit</button>
        </div>
        <form className="flex flex-col ">
          <div>
            <div className="grid grid-cols-2 gap-5 ">
              <label>First Name</label>
              <label>Last name</label>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <input
                className={INPUT_STYLES}
                type="text"
                placeholder="First Name"
              />
              <input
                className={INPUT_STYLES}
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <label>Email</label>
          <input className={INPUT_STYLES} type="text" placeholder="Email" />
          <label>Password</label>
          <input
            className={INPUT_STYLES}
            type="password"
            placeholder="Password"
          />
          <label>Institution</label>
          <input
            className={INPUT_STYLES}
            type="text"
            placeholder="Institution"
          />
          <label>Do you want provided meals at the hackathon?</label>
          <input className={INPUT_STYLES} type="text" placeholder="Allergies" />
          <label>Do you have any allergies?</label>
          <input className={INPUT_STYLES} type="text" placeholder="Allergies" />
          <p>
            Check-in Status <br />
            This status will change to &quot;Yes&quot; after you&apos;ve checked
            in on hackathon day
          </p>
          <input className={INPUT_STYLES} type="text" placeholder="Check-in" />
        </form>
        <div className=" my-6 flex flex-col justify-between md:flex-row">
          <button className={BUTTON_STYLES}>Cancel</button>
          <button className={BUTTON_STYLES}>Save</button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
