import MemberCards from "./memberCards";

export default function IndustryMembers() {
  const industryMembers = [
    { name: "Alexandru Parcioaga", discord: "", role: "Arcurve" },
    { name: "Karam Baroud", discord: "yeezy.yeezus", role: "ZeroKey" },
    {
      name: "Sankar Achary Jankoti",
      discord: "",
      role: "Infosys Limited",
    },
    { name: "Anthony Dam", discord: "anthony.cs", role: "Prev @ IBM" },
    {
      name: "Sidrah Abdullah",
      discord: "degr8sid",
      role: "University of Calgary",
    },
    {
      name: "Farnaz Sheikhi",
      discord: "",
      role: "University of Calgary",
    },
    {
      name: "Miti Mazmudar",
      discord: "",
      role: "University of Calgary",
    },
    { name: "Burton Jong", discord: "j05ng", role: "Pason" },
    { name: "Anthony Chan", discord: "anthonyych4n", role: "Cisco" },
    { name: "Matthew Liu", discord: "degr8sid", role: "Enbridge" },
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
