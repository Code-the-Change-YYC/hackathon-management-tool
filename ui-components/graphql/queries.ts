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
export const getHackathon = /* GraphQL */ `
  query GetHackathon($id: ID!) {
    getHackathon(id: $id) {
      createdAt
      endDate
      id
      scores {
        nextToken
        __typename
      }
      scoringComponents {
        friendlyName
        id
        isSidepot
        __typename
      }
      scoringSidepots {
        friendlyName
        id
        isSidepot
        __typename
      }
      startDate
      updatedAt
      __typename
    }
  }
`;
export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
      createdAt
      id
      judges {
        nextToken
        __typename
      }
      name
      teamRoom {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const getScore = /* GraphQL */ `
  query GetScore($id: ID!) {
    getScore(id: $id) {
      createdAt
      hackathon {
        createdAt
        endDate
        id
        startDate
        updatedAt
        __typename
      }
      hackathonId
      id
      judge {
        JUDGE_roomId
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
        role
        teamId
        updatedAt
        willEatMeals
        __typename
      }
      judgeId
      score
      team {
        approved
        createdAt
        id
        name
        updatedAt
        __typename
      }
      teamId
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
      scores {
        nextToken
        __typename
      }
      teamRooms {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const getTeamRoom = /* GraphQL */ `
  query GetTeamRoom($id: ID!) {
    getTeamRoom(id: $id) {
      createdAt
      id
      room {
        createdAt
        id
        name
        updatedAt
        __typename
      }
      roomId
      team {
        approved
        createdAt
        id
        name
        updatedAt
        __typename
      }
      teamId
      time
      updatedAt
      zoomLink
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      JUDGE_givenScores {
        nextToken
        __typename
      }
      JUDGE_room {
        createdAt
        id
        name
        updatedAt
        __typename
      }
      JUDGE_roomId
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
      role
      team {
        approved
        createdAt
        id
        name
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
        JUDGE_roomId
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
        role
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
export const listHackathons = /* GraphQL */ `
  query ListHackathons(
    $filter: ModelHackathonFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHackathons(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        endDate
        id
        startDate
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRooms(
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
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listScores = /* GraphQL */ `
  query ListScores(
    $filter: ModelScoreFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listScores(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        hackathonId
        id
        judgeId
        score
        teamId
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTeamRooms = /* GraphQL */ `
  query ListTeamRooms(
    $filter: ModelTeamRoomFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTeamRooms(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        id
        roomId
        teamId
        time
        updatedAt
        zoomLink
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
        JUDGE_roomId
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
        role
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
