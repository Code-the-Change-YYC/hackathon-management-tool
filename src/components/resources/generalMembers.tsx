import MemberCards from "./memberCards";

export default function GeneralMembers() {
  const generalMembers = [
    { name: "Fiona Truong", discord: "coming soon", role: "Co-President" },
    { name: "Nathan Phan", discord: "coming soon", role: "Co-President" },
    { name: "Victoria Wong", discord: "coming soon", role: "VP Design" },
    { name: "Ryan Obiar", discord: "coming soon", role: "VP Marketing" },
    { name: "Grace Ilori", discord: "coming soon", role: "VP External" },
  ];

  const generalBackground = "bg-pastel-pink";

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:gap-14">
      {generalMembers.map((member) => (
        <MemberCards
          key={member.name}
          name={member.name}
          discord={member.discord}
          role={member.role}
          background={generalBackground}
        />
      ))}
    </div>
  );
}
