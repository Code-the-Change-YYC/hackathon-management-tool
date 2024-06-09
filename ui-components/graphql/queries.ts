/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const GetUserMessageCode = /* GraphQL */ `
  query GetUserMessageCode($userMessage: String) {
    GetUserMessageCode(userMessage: $userMessage) {
      body
      headers
      statusCode
      __typename
    }
  }
`;
export const VerifyUserMessage = /* GraphQL */ `
  query VerifyUserMessage($userCode: String) {
    VerifyUserMessage(userCode: $userCode) {
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
      id
      name
      start
      totalGroupCount
      updatedAt
      __typename
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      approved
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
      attendedEvents {
        nextToken
        __typename
      }
      checkedIn
      completedRegistration
      createdAt
      email
      firstName
      id
      institution
      lastName
      profileOwner
      team {
        approved
        createdAt
        id
        name
        owner
        updatedAt
        __typename
      }
      teamId
      updatedAt
      willEatMeals
      __typename
    }
  }
`;
export const getUserFoodEventAttendance = /* GraphQL */ `
  query GetUserFoodEventAttendance($id: ID!) {
    getUserFoodEventAttendance(id: $id) {
      createdAt
      foodEvent {
        createdAt
        description
        end
        id
        name
        start
        totalGroupCount
        updatedAt
        __typename
      }
      foodEventId
      id
      updatedAt
      user {
        allergies
        checkedIn
        completedRegistration
        createdAt
        email
        firstName
        id
        institution
        lastName
        profileOwner
        teamId
        updatedAt
        willEatMeals
        __typename
      }
      userId
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
        id
        name
        start
        totalGroupCount
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
        approved
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
export const listUserFoodEventAttendances = /* GraphQL */ `
  query ListUserFoodEventAttendances(
    $filter: ModelUserFoodEventAttendanceFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserFoodEventAttendances(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        foodEventId
        id
        updatedAt
        userId
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
        completedRegistration
        createdAt
        email
        firstName
        id
        institution
        lastName
        profileOwner
        teamId
        updatedAt
        willEatMeals
        __typename
      }
      nextToken
      __typename
    }
  }
`;
