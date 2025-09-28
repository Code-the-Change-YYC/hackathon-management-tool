import MemberCards from "./memberCards";

export default function EventsMembers() {
  const eventsMembers = [
    { name: "Simar Kandola", discord: "coming soon", role: "VP Events" },
    { name: "Tanvi Mahal", discord: "coming soon", role: "Jr VP Events" },
    { name: "May Liu", discord: "coming soon", role: "Events Commissioner" },
    {
      name: "Adithya Sagar",
      discord: "coming soon",
      role: "Events Commissioner",
    },
    {
      name: "Anthony Chan",
      discord: "coming soon",
      role: "Events Commissioner",
    },
    {
      name: "Sebastian Nieto",
      discord: "coming soon",
      role: "Events Commissioner",
    },
    { name: "Hira Asad", discord: "coming soon", role: "Events Commissioner" },
    {
      name: "Abudllah Yousaf",
      discord: "coming soon",
      role: "Events Commissioner",
    },
    {
      name: "Ana DuCristea",
      discord: "coming soon",
      role: "Events Commissioner",
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
