import MemberCards from "./memberCards";

export default function EventsMembers() {
  const eventsMembers = [
    { name: "Simar Kandola", discord: "_the_real_ninja", role: "VP Events" },
    { name: "Tanvi Mahal", discord: "tm.88", role: "Jr VP Events" },
    { name: "May Liu", discord: "pickupmay", role: "Event Coordinator" },
    {
      name: "Adithya Sagar",
      discord: "adithyasagar778",
      role: "Event Coordinator",
    },
    {
      name: "Anthony Chan",
      discord: "anthonyych4n",
      role: "Event Coordinator",
    },
    {
      name: "Hira Asad",
      discord: "purplebarney84",
      role: "Event Coordinator",
    },
    {
      name: "Abudllah Yousaf",
      discord: "nicetrylilbro",
      role: "Event Coordinator",
    },
  ];

  const eventsBackground = "bg-lilac-purple";

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:gap-14">
      {eventsMembers.map((member) => (
        <MemberCards
          key={member.name}
          name={member.name}
          discord={member.discord}
          role={member.role}
          background={eventsBackground}
        />
      ))}
    </div>
  );
}
