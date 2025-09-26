import MemberCards from "./memberCards";

export default function GeneralMembers() {
  const generalMembers = [
    { name: "Fiona Truong", discord: "tbd", role: "Co-President" },
    { name: "Nathan Phan", discord: "tbd", role: "Co-President" },
    { name: "Victoria Wong", discord: "tbd", role: "VP Design" },
    { name: "Ryan Obiar", discord: "tbd", role: "VP Marketing" },
    { name: "Grace Ilori", discord: "tbd", role: "VP External" },
  ];

  const generalBackground = "bg-pastel-pink";

  return (
    <div className="grid grid-cols-3 gap-14">
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
