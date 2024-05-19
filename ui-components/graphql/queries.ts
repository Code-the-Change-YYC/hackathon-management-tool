/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const VerifyUserCode = /* GraphQL */ `
  query VerifyUserCode($userCode: String) {
    VerifyUserCode(userCode: $userCode) {
      body
      headers
      statusCode
      __typename
    }
  }
`;
export const getFoodEvent = /* GraphQL */ `
  query GetFoodEvent($id: ID!) {
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
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
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
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
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
`;
export const getUserVerificationCode = /* GraphQL */ `
  query GetUserVerificationCode($userId: String) {
    getUserVerificationCode(userId: $userId) {
      body
      headers
      statusCode
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
        allergies
        checkedIn
        createdAt
        email
        firstName
        id
        institution
        lastName
        mealId
        owner
        teamId
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
