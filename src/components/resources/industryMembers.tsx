import MemberCards from "./memberCards";

export default function IndustryMembers() {
  const industryMembers = [
    { name: "Kevin", discord: "KevinTheKeycap", role: "Organizer" },
    { name: "Kevin", discord: "KevinTheKeycap", role: "Organizer" },
  ];

  const industryBackground = "bg-medium-grey";

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:gap-14">
      {industryMembers.map((member) => (
        <MemberCards
          key={member.name}
          name={member.name}
          discord={member.discord}
          role={member.role}
          background={industryBackground}
        />
      ))}
    </div>
  );
}
