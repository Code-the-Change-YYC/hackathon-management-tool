/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
import * as APITypes from "./API";

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const VerifyUserCode =
  /* GraphQL */ `query VerifyUserCode($eventId: String, $userCode: String) {
  VerifyUserCode(eventId: $eventId, userCode: $userCode) {
    body
    headers
    statusCode
    __typename
  }
}
` as GeneratedQuery<
    APITypes.VerifyUserCodeQueryVariables,
    APITypes.VerifyUserCodeQuery
  >;
export const getFoodEvent = /* GraphQL */ `query GetFoodEvent($id: ID!) {
  getFoodEvent(id: $id) {
    attended {
      nextToken
      __typename
    }
    createdAt
    description
    end
    groups
    id
    name
    owner
    start
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFoodEventQueryVariables,
  APITypes.GetFoodEventQuery
>;
export const getTeam = /* GraphQL */ `query GetTeam($id: ID!) {
  getTeam(id: $id) {
    createdAt
    id
    members {
      nextToken
      __typename
    }
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTeamQueryVariables, APITypes.GetTeamQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    allergies
    checkedIn
    createdAt
    email
    firstName
    id
    institution
    lastName
    meal {
      createdAt
      description
      end
      groups
      id
      name
      owner
      start
      updatedAt
      __typename
    }
    mealId
    meals
    owner
    team {
      createdAt
      id
      name
      owner
      updatedAt
      __typename
    }
    teamId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listFoodEvents = /* GraphQL */ `query ListFoodEvents(
  $filter: ModelFoodEventFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listFoodEvents(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      description
      end
      groups
      id
      name
      owner
      start
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFoodEventsQueryVariables,
  APITypes.ListFoodEventsQuery
>;
export const listTeams = /* GraphQL */ `query ListTeams(
  $filter: ModelTeamFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listTeams(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      name
      owner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTeamsQueryVariables, APITypes.ListTeamsQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      allergies
      checkedIn
      createdAt
      email
      firstName
      id
      institution
      lastName
      mealId
      meals
      owner
      teamId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
