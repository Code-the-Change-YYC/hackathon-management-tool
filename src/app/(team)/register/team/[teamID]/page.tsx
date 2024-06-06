export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())
  const teams = [{ teamID: "myTeamName1" }, { teamID: "HackathonToolTeam-24" }];
  return teams.map((team) => ({
    teamID: team.teamID,
  }));
}

export default function page({ params }: { params: { teamID: string } }) {
  return <div>Your team name is: {params.teamID}</div>;
}
