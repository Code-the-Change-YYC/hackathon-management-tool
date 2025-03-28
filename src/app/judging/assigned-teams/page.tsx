const AssignedTeamsPage = () => {
  const assignedTeams = [
    { id: 1, name: "Team Alpha" },
    { id: 2, name: "Team Beta" },
    { id: 3, name: "Team Gamma" },
  ];

  return (
    <div>
      <h1> Put assinged teams here Assigned Teams</h1>
      <ul>
        {assignedTeams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssignedTeamsPage;
