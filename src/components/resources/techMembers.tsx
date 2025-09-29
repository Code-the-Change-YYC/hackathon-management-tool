import MemberCards from "./memberCards";

export default function TechMembers() {
  const techMembers = [
    { name: "Burton Jong", discord: "coming soon", role: "VP Tech" },
    { name: "Fisayo Adabs", discord: "coming soon", role: "Tech Lead" },
    { name: "Justin Pham", discord: "coming soon", role: "Developer" },
    { name: "Anthony Chan", discord: "coming soon", role: "Developer" },
    { name: "Ajay Sallh", discord: "coming soon", role: "Developer" },
    { name: "Hooriya Khan", discord: "coming soon", role: "Developer" },
    { name: "Simar Kandola", discord: "coming soon", role: "Developer" },
    { name: "Fiona Truong", discord: "coming soon", role: "Developer" },
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
