/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFoodEvent = /* GraphQL */ `
  query GetFoodEvent($id: ID!) {
    getFoodEvent(id: $id) {
      Description
      End
      Groups
      Name
      Start
      createdAt
      id
      owner
      updatedAt
      userMealsId
      __typename
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
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
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      Allergies
      CheckedIn
      Email
      FirstName
      Institution
      LastName
      Meals {
        nextToken
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
      id
      owner
      teamMembersId
      updatedAt
      __typename
    }
  }
`;
export const listFoodEvents = /* GraphQL */ `
  query ListFoodEvents(
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
        userMealsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
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
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
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
`;
