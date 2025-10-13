/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";

type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateFoodEvent =
  /* GraphQL */ `subscription OnCreateFoodEvent($filter: ModelSubscriptionFoodEventFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnCreateFoodEventSubscriptionVariables,
    APITypes.OnCreateFoodEventSubscription
  >;
export const onCreateHackathon =
  /* GraphQL */ `subscription OnCreateHackathon($filter: ModelSubscriptionHackathonFilterInput) {
  onCreateHackathon(filter: $filter) {
    createdAt
    endDate
    id
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
` as GeneratedSubscription<
    APITypes.OnCreateHackathonSubscriptionVariables,
    APITypes.OnCreateHackathonSubscription
  >;
export const onCreateRoom =
  /* GraphQL */ `subscription OnCreateRoom($filter: ModelSubscriptionRoomFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnCreateRoomSubscriptionVariables,
    APITypes.OnCreateRoomSubscription
  >;
export const onCreateScore =
  /* GraphQL */ `subscription OnCreateScore($filter: ModelSubscriptionScoreFilterInput) {
  onCreateScore(filter: $filter) {
    createdAt
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
      program
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
` as GeneratedSubscription<
    APITypes.OnCreateScoreSubscriptionVariables,
    APITypes.OnCreateScoreSubscription
  >;
export const onCreateTeam =
  /* GraphQL */ `subscription OnCreateTeam($filter: ModelSubscriptionTeamFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnCreateTeamSubscriptionVariables,
    APITypes.OnCreateTeamSubscription
  >;
export const onCreateTeamRoom =
  /* GraphQL */ `subscription OnCreateTeamRoom($filter: ModelSubscriptionTeamRoomFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnCreateTeamRoomSubscriptionVariables,
    APITypes.OnCreateTeamRoomSubscription
  >;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
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
    program
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onCreateUserFoodEventAttendance =
  /* GraphQL */ `subscription OnCreateUserFoodEventAttendance(
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
      program
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
` as GeneratedSubscription<
    APITypes.OnCreateUserFoodEventAttendanceSubscriptionVariables,
    APITypes.OnCreateUserFoodEventAttendanceSubscription
  >;
export const onDeleteFoodEvent =
  /* GraphQL */ `subscription OnDeleteFoodEvent($filter: ModelSubscriptionFoodEventFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteFoodEventSubscriptionVariables,
    APITypes.OnDeleteFoodEventSubscription
  >;
export const onDeleteHackathon =
  /* GraphQL */ `subscription OnDeleteHackathon($filter: ModelSubscriptionHackathonFilterInput) {
  onDeleteHackathon(filter: $filter) {
    createdAt
    endDate
    id
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
` as GeneratedSubscription<
    APITypes.OnDeleteHackathonSubscriptionVariables,
    APITypes.OnDeleteHackathonSubscription
  >;
export const onDeleteRoom =
  /* GraphQL */ `subscription OnDeleteRoom($filter: ModelSubscriptionRoomFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteRoomSubscriptionVariables,
    APITypes.OnDeleteRoomSubscription
  >;
export const onDeleteScore =
  /* GraphQL */ `subscription OnDeleteScore($filter: ModelSubscriptionScoreFilterInput) {
  onDeleteScore(filter: $filter) {
    createdAt
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
      program
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
` as GeneratedSubscription<
    APITypes.OnDeleteScoreSubscriptionVariables,
    APITypes.OnDeleteScoreSubscription
  >;
export const onDeleteTeam =
  /* GraphQL */ `subscription OnDeleteTeam($filter: ModelSubscriptionTeamFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteTeamSubscriptionVariables,
    APITypes.OnDeleteTeamSubscription
  >;
export const onDeleteTeamRoom =
  /* GraphQL */ `subscription OnDeleteTeamRoom($filter: ModelSubscriptionTeamRoomFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteTeamRoomSubscriptionVariables,
    APITypes.OnDeleteTeamRoomSubscription
  >;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
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
    program
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onDeleteUserFoodEventAttendance =
  /* GraphQL */ `subscription OnDeleteUserFoodEventAttendance(
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
      program
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
` as GeneratedSubscription<
    APITypes.OnDeleteUserFoodEventAttendanceSubscriptionVariables,
    APITypes.OnDeleteUserFoodEventAttendanceSubscription
  >;
export const onUpdateFoodEvent =
  /* GraphQL */ `subscription OnUpdateFoodEvent($filter: ModelSubscriptionFoodEventFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateFoodEventSubscriptionVariables,
    APITypes.OnUpdateFoodEventSubscription
  >;
export const onUpdateHackathon =
  /* GraphQL */ `subscription OnUpdateHackathon($filter: ModelSubscriptionHackathonFilterInput) {
  onUpdateHackathon(filter: $filter) {
    createdAt
    endDate
    id
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
` as GeneratedSubscription<
    APITypes.OnUpdateHackathonSubscriptionVariables,
    APITypes.OnUpdateHackathonSubscription
  >;
export const onUpdateRoom =
  /* GraphQL */ `subscription OnUpdateRoom($filter: ModelSubscriptionRoomFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateRoomSubscriptionVariables,
    APITypes.OnUpdateRoomSubscription
  >;
export const onUpdateScore =
  /* GraphQL */ `subscription OnUpdateScore($filter: ModelSubscriptionScoreFilterInput) {
  onUpdateScore(filter: $filter) {
    createdAt
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
      program
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
` as GeneratedSubscription<
    APITypes.OnUpdateScoreSubscriptionVariables,
    APITypes.OnUpdateScoreSubscription
  >;
export const onUpdateTeam =
  /* GraphQL */ `subscription OnUpdateTeam($filter: ModelSubscriptionTeamFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateTeamSubscriptionVariables,
    APITypes.OnUpdateTeamSubscription
  >;
export const onUpdateTeamRoom =
  /* GraphQL */ `subscription OnUpdateTeamRoom($filter: ModelSubscriptionTeamRoomFilterInput) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateTeamRoomSubscriptionVariables,
    APITypes.OnUpdateTeamRoomSubscription
  >;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
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
    program
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onUpdateUserFoodEventAttendance =
  /* GraphQL */ `subscription OnUpdateUserFoodEventAttendance(
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
      program
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
` as GeneratedSubscription<
    APITypes.OnUpdateUserFoodEventAttendanceSubscriptionVariables,
    APITypes.OnUpdateUserFoodEventAttendanceSubscription
  >;
