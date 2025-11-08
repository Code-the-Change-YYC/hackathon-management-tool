import MemberCards from "./memberCards";

export default function TechMembers() {
  const techMembers = [
    { name: "Burton Jong", discord: "j05ng", role: "VP Tech" },
    {
      name: "Simar Kandola",
      discord: "_the_real_ninja",
      role: "HTC Developer",
    },
    { name: "Fiona Truong", discord: ".fionaaa", role: "HTC Developer" },
    { name: "Matthew Liu", discord: "degr8sid", role: "Tech Lead" },
    { name: "Yahya Asmara", discord: "aphva", role: "Developer" },
    { name: "Jason Duong", discord: "plehhelp", role: "Developer" },
  ];

  const techBackground = "bg-fuzzy-peach";

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:gap-14">
      {techMembers.map((member) => (
        <MemberCards
          key={member.name}
          name={member.name}
          discord={member.discord}
          role={member.role}
          background={techBackground}
        />
      ))}
    </div>
  );
}
