/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
import * as APITypes from "./API";

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getFoodEvent = /* GraphQL */ `query GetFoodEvent($id: ID!) {
  getFoodEvent(id: $id) {
    Attended {
      nextToken
      __typename
    }
    Description
    End
    Groups
    Name
    Start
    createdAt
    id
    owner
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
    Code
    Members {
      nextToken
      __typename
    }
    Name
    createdAt
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTeamQueryVariables, APITypes.GetTeamQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    Allergies
    CheckedIn
    Email
    FirstName
    Institution
    LastName
    Meals {
      Description
      End
      Groups
      Name
      Start
      createdAt
      id
      owner
      updatedAt
      __typename
    }
    Team {
      Code
      Name
      createdAt
      id
      owner
      updatedAt
      __typename
    }
    createdAt
    foodEventAttendedId
    id
    owner
    teamMembersId
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
      Description
      End
      Groups
      Name
      Start
      createdAt
      id
      owner
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
      Code
      Name
      createdAt
      id
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
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      Allergies
      CheckedIn
      Email
      FirstName
      Institution
      LastName
      createdAt
      foodEventAttendedId
      id
      owner
      teamMembersId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
