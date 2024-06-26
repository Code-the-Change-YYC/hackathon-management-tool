/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFoodEvent = /* GraphQL */ `
  subscription OnCreateFoodEvent(
    $filter: ModelSubscriptionFoodEventFilterInput
  ) {
    onCreateFoodEvent(filter: $filter) {
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
export const onCreateHackathon = /* GraphQL */ `
  subscription OnCreateHackathon(
    $filter: ModelSubscriptionHackathonFilterInput
  ) {
    onCreateHackathon(filter: $filter) {
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
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom($filter: ModelSubscriptionRoomFilterInput) {
    onCreateRoom(filter: $filter) {
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
export const onCreateScore = /* GraphQL */ `
  subscription OnCreateScore($filter: ModelSubscriptionScoreFilterInput) {
    onCreateScore(filter: $filter) {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam($filter: ModelSubscriptionTeamFilterInput) {
    onCreateTeam(filter: $filter) {
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
export const onCreateTeamRoom = /* GraphQL */ `
  subscription OnCreateTeamRoom($filter: ModelSubscriptionTeamRoomFilterInput) {
    onCreateTeamRoom(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $profileOwner: String
  ) {
    onCreateUser(filter: $filter, profileOwner: $profileOwner) {
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
export const onCreateUserFoodEventAttendance = /* GraphQL */ `
  subscription OnCreateUserFoodEventAttendance(
    $filter: ModelSubscriptionUserFoodEventAttendanceFilterInput
  ) {
    onCreateUserFoodEventAttendance(filter: $filter) {
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
export const onDeleteFoodEvent = /* GraphQL */ `
  subscription OnDeleteFoodEvent(
    $filter: ModelSubscriptionFoodEventFilterInput
  ) {
    onDeleteFoodEvent(filter: $filter) {
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
export const onDeleteHackathon = /* GraphQL */ `
  subscription OnDeleteHackathon(
    $filter: ModelSubscriptionHackathonFilterInput
  ) {
    onDeleteHackathon(filter: $filter) {
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
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom($filter: ModelSubscriptionRoomFilterInput) {
    onDeleteRoom(filter: $filter) {
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
export const onDeleteScore = /* GraphQL */ `
  subscription OnDeleteScore($filter: ModelSubscriptionScoreFilterInput) {
    onDeleteScore(filter: $filter) {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam($filter: ModelSubscriptionTeamFilterInput) {
    onDeleteTeam(filter: $filter) {
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
export const onDeleteTeamRoom = /* GraphQL */ `
  subscription OnDeleteTeamRoom($filter: ModelSubscriptionTeamRoomFilterInput) {
    onDeleteTeamRoom(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $profileOwner: String
  ) {
    onDeleteUser(filter: $filter, profileOwner: $profileOwner) {
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
export const onDeleteUserFoodEventAttendance = /* GraphQL */ `
  subscription OnDeleteUserFoodEventAttendance(
    $filter: ModelSubscriptionUserFoodEventAttendanceFilterInput
  ) {
    onDeleteUserFoodEventAttendance(filter: $filter) {
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
export const onUpdateFoodEvent = /* GraphQL */ `
  subscription OnUpdateFoodEvent(
    $filter: ModelSubscriptionFoodEventFilterInput
  ) {
    onUpdateFoodEvent(filter: $filter) {
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
export const onUpdateHackathon = /* GraphQL */ `
  subscription OnUpdateHackathon(
    $filter: ModelSubscriptionHackathonFilterInput
  ) {
    onUpdateHackathon(filter: $filter) {
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
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom($filter: ModelSubscriptionRoomFilterInput) {
    onUpdateRoom(filter: $filter) {
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
export const onUpdateScore = /* GraphQL */ `
  subscription OnUpdateScore($filter: ModelSubscriptionScoreFilterInput) {
    onUpdateScore(filter: $filter) {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam($filter: ModelSubscriptionTeamFilterInput) {
    onUpdateTeam(filter: $filter) {
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
export const onUpdateTeamRoom = /* GraphQL */ `
  subscription OnUpdateTeamRoom($filter: ModelSubscriptionTeamRoomFilterInput) {
    onUpdateTeamRoom(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $profileOwner: String
  ) {
    onUpdateUser(filter: $filter, profileOwner: $profileOwner) {
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
export const onUpdateUserFoodEventAttendance = /* GraphQL */ `
  subscription OnUpdateUserFoodEventAttendance(
    $filter: ModelSubscriptionUserFoodEventAttendanceFilterInput
  ) {
    onUpdateUserFoodEventAttendance(filter: $filter) {
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
