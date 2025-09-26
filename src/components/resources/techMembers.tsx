import MemberCards from "./memberCards";

export default function TechMembers() {
  const techMembers = [
    { name: "Burton Jong", discord: "tbd", role: "VP Tech" },
    { name: "Fisayo Adabs", discord: "tbd", role: "Tech Lead" },
    { name: "Justin Pham", discord: "tbd", role: "Developer" },
    { name: "Anthony Chan", discord: "tbd", role: "Developer" },
    { name: "Ajay Sallh", discord: "tbd", role: "Developer" },
    { name: "Hooriya Khan", discord: "tbd", role: "Developer" },
    { name: "Simar Kandola", discord: "tbd", role: "Developer" },
    { name: "Fiona Truong", discord: "tbd", role: "Developer" },
  ];

  const techBackground = "bg-fuzzy-peach";

  return (
    <div className="grid grid-cols-3 gap-14">
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
