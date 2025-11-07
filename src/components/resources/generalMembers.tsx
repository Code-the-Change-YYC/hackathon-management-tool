import MemberCards from "./memberCards";

export default function GeneralMembers() {
  const generalMembers = [
    { name: "Fiona Truong", discord: ".fionaaa", role: "Co-President" },
    { name: "Nathan Phan", discord: "natphaan", role: "Co-President" },
    { name: "Victoria Wong", discord: "shib3", role: "VP Design" },
    { name: "Ryan Obiar", discord: "", role: "VP Marketing" },
    { name: "Grace Ilori", discord: "g542_542", role: "VP External" },
    {
      name: "Hanna Cho",
      discord: "hannagracec",
      role: "Marketing Commissioner",
    },
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
