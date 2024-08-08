"use client";

// import { generateClient } from "aws-amplify/api";
import { useEffect } from "react";

// import { type Schema } from "@/amplify/data/resource";

// const client = generateClient<Schema>();

async function calculateScores() {
  // const scoringComponents = (await client.models.Hackathon.list()).data[0]
  //   .scoringComponents;
  const scoringComponents = [
    { id: "component1", friendlyName: "Component 1", isSidepot: false },
    { id: "component2", friendlyName: "Component 2", isSidepot: false },
    { id: "component3", friendlyName: "Component 3", isSidepot: false },
    { id: "component4", friendlyName: "Component 4", isSidepot: false },
    { id: "component5", friendlyName: "Component 5", isSidepot: false },
  ];
  if (!scoringComponents) {
    throw new Error("No scoring components found");
  }

  type ITeamScores = {
    [teamId: string]: {
      total: number;
      components: {
        [x: string]: number;
      };
    };
  };
  type IScoreRaw = {
    teamId: string;
    score: {
      [x: string]: number;
    };
  };

  const fakeScores: IScoreRaw[] = [
    {
      teamId: "1",
      score: {
        component1: 10,
        component2: 20,
        component3: 30,
        component4: 40,
        component5: 50,
      },
    },
    {
      teamId: "2",
      score: {
        component1: 50,
        component2: 40,
        component3: 30,
        component4: 20,
        component5: 10,
      },
    },
    {
      teamId: "1",
      score: {
        component1: 10,
        component2: 20,
        component3: 30,
        component4: 40,
        component5: 50,
      },
    },
    {
      teamId: "1",
      score: {
        component1: 50,
        component2: 40,
        component3: 30,
        component4: 20,
        component5: 10,
      },
    },
  ];

  let teamScores: ITeamScores = {};

  teamScores = fakeScores.reduce((acc, score) => {
    if (!acc[score.teamId]) {
      acc[score.teamId] = {
        total: 0,
        components: {},
      };
    }

    const teamScore = scoringComponents.reduce((total, component) => {
      const scoreComponentId = component?.id ?? "";
      acc[score.teamId].components[scoreComponentId] = acc[score.teamId]
        .components[scoreComponentId]
        ? acc[score.teamId].components[scoreComponentId] +
          score.score[scoreComponentId]
        : score.score[scoreComponentId];

      return total + score.score[scoreComponentId];
    }, 0);

    acc[score.teamId].total += teamScore;

    return acc;
  }, teamScores);

  console.log("Scores", teamScores);
}

const TestPage = () => {
  useEffect(() => {
    calculateScores();
  }, []);
  return <div>Test Page</div>;
};

export default TestPage;
