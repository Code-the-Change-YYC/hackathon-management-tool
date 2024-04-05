export default function ProfileHeader() {
  return (
    <div>
      {" "}
      <div className="flex h-60 items-center justify-center bg-[#FF6B54]">
        <div>Squiggly 1</div>
        <h1 className="text-4xl font-extrabold text-white">
          Hello, <span className="italic">Full Name!</span>
        </h1>
        <div>Squiggly 2</div>
      </div>
    </div>
  );
}
