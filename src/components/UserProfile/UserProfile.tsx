import Link from "next/link";

const INPUT_STYLES =
  "rounded-full border-4 border-white bg-[#FFFFFF] bg-opacity-50 ps-2 py-2 text-white ";

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
      <div className="px-16 py-10">
        <div className="my-10 flex flex-row gap-4 ">
          <Link href="/participant/profile">My details</Link>
          <Link href="/participant/profile">Team details</Link>
          <Link href="/participant/profile">Food Ticket</Link>
        </div>
        <div className="my-4 flex justify-between uppercase">
          <h1>My Details</h1>
          <button className="font-white rounded-full border-4 border-white bg-[#FF6B54] px-12 py-2 text-white ">
            Edit
          </button>
        </div>
        <form className="flex flex-col">
          <div>
            <div className="grid grid-cols-2 gap-5">
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
          <input className={INPUT_STYLES} type="checkbox" />
          <label>Do you have any allergies?</label>
          <input className={INPUT_STYLES} type="text" placeholder="Allergies" />
          <p>Check-in Status</p>
          <p>
            This status will change to &quot;Yes&quot; after you&apos;ve checked
            in on hackathon day
          </p>
          <p>checkin status....</p>
        </form>
        <div className="flex justify-between ">
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
