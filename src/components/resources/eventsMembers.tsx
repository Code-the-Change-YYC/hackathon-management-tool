import MemberCards from "./memberCards";

export default function EventsMembers() {
  const eventsMembers = [
    { name: "Simar Kandola", discord: "_the_real_ninja", role: "VP Events" },
    { name: "Tanvi Mahal", discord: "tm.88", role: "Jr VP Events" },
    { name: "May Liu", discord: "pickupmay", role: "Events Coordinator" },
    {
      name: "Adithya Sagar",
      discord: "",
      role: "Events Coordinator",
    },
    {
      name: "Anthony Chan",
      discord: "anthonyych4n",
      role: "Events Coordinator",
    },
    {
      name: "Sebastian Nieto",
      discord: ".sebbyn",
      role: "Events Coordinator",
    },
    {
      name: "Hira Asad",
      discord: "purplebarney84",
      role: "Events Coordinator",
    },
    {
      name: "Abudllah Yousaf",
      discord: "nicetrylilbro",
      role: "Events Coordinator",
    },
    {
      name: "Ana DuCristea",
      discord: "anacoda",
      role: "Events Coordinator",
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
