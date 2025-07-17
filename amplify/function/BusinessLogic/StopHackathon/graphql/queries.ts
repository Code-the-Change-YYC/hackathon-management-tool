/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listHackathons = /* GraphQL */ `
  query ListHackathons(
    $filter: ModelHackathonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHackathons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startDate
        endDate
        scoringComponents {
          id
          friendlyName
          isSidepot
          __typename
        }
        scoringSidepots {
          id
          friendlyName
          isSidepot
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
