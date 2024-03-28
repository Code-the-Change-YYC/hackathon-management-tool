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
        <div className="flex flex-row gap-4">
          <h2>My details</h2>
          <h2>Team details</h2>
          <h2>Food Ticket</h2>
        </div>
        <div className="flex justify-between ">
          <h1>My Details</h1>
          <button>Edit</button>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
            <label>Last name</label>
            <input type="text" placeholder="Last Name" />
          </div>
          <label>Email</label>
          <input type="text" placeholder="Email" />
          <label>Password</label>
          <input type="password" placeholder="Password" />
          <label>Institution</label>
          <input type="text" placeholder="Institution" />
          <label>Do you want provided meals at the hackathon?</label>
          <input type="checkbox" />
          <label>Do you have any allergies?</label>
          <input type="text" placeholder="Allergies" />
          <p>Check-in Status</p>
          <p>
            This status will change to &quot;Yes&quot; after you&apos;ve checked
            in on hackathon day
          </p>
          <p>checkin status....</p>
        </div>
        <div className="flex justify-between ">
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
