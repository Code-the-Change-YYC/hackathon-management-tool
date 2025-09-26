import MemberCards from "./memberCards";

export default function EventsMembers() {
  const eventsMembers = [
    { name: "Simar Kandola", discord: "tbd", role: "VP Events" },
    { name: "Tanvi Mahal", discord: "tbd", role: "Jr VP Events" },
    { name: "May Liu", discord: "tbd", role: "Events Commissioner" },
    { name: "Adithya Sagar", discord: "tbd", role: "Events Commissioner" },
    { name: "Anthony Chan", discord: "tbd", role: "Events Commissioner" },
    { name: "Sebastian Nieto", discord: "tbd", role: "Events Commissioner" },
    { name: "Hira Asad", discord: "tbd", role: "Events Commissioner" },
    { name: "Abudllah Yousaf", discord: "tbd", role: "Events Commissioner" },
    { name: "Ana DuCristea", discord: "tbd", role: "Events Commissioner" },
  ];

  const eventsBackground = "bg-lilac-purple";

  return (
    <div className="grid grid-cols-3 gap-14">
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
