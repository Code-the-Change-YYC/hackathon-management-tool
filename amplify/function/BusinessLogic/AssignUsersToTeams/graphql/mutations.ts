/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const AddUserToGroup = /* GraphQL */ `mutation AddUserToGroup($groupName: String!, $userId: String!) {
  AddUserToGroup(groupName: $groupName, userId: $userId) {
    body
    headers
    statusCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AddUserToGroupMutationVariables,
  APITypes.AddUserToGroupMutation
>;
export const AssignUsersToTeams = /* GraphQL */ `mutation AssignUsersToTeams($teamId: String!, $userId: String!) {
  AssignUsersToTeams(teamId: $teamId, userId: $userId) {
    body
    headers
    statusCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AssignUsersToTeamsMutationVariables,
  APITypes.AssignUsersToTeamsMutation
>;
export const CreateTeamWithCode = /* GraphQL */ `mutation CreateTeamWithCode($addCallerToTeam: Boolean!, $teamName: String!) {
  CreateTeamWithCode(addCallerToTeam: $addCallerToTeam, teamName: $teamName) {
    body
    headers
    statusCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTeamWithCodeMutationVariables,
  APITypes.CreateTeamWithCodeMutation
>;
export const DemoFunction = /* GraphQL */ `mutation DemoFunction($content: String) {
  DemoFunction(content: $content) {
    body
    headers
    statusCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DemoFunctionMutationVariables,
  APITypes.DemoFunctionMutation
>;
export const ResetHackathon = /* GraphQL */ `mutation ResetHackathon(
  $endDate: AWSDate!
  $resetRooms: Boolean!
  $resetScores: Boolean!
  $resetTeams: Boolean!
  $resetUsers: Boolean!
  $safetyCheck: String!
  $scoreComponents: AWSJSON!
  $scoringSidepots: AWSJSON!
  $startDate: AWSDate!
) {
  ResetHackathon(
    endDate: $endDate
    resetRooms: $resetRooms
    resetScores: $resetScores
    resetTeams: $resetTeams
    resetUsers: $resetUsers
    safetyCheck: $safetyCheck
    scoreComponents: $scoreComponents
    scoringSidepots: $scoringSidepots
    startDate: $startDate
  ) {
    headers
    statusCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ResetHackathonMutationVariables,
  APITypes.ResetHackathonMutation
>;
export const SetUserAsCheckedIn = /* GraphQL */ `mutation SetUserAsCheckedIn($userId: String!) {
  SetUserAsCheckedIn(userId: $userId) {
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
` as GeneratedMutation<
  APITypes.SetUserAsCheckedInMutationVariables,
  APITypes.SetUserAsCheckedInMutation
>;
export const createFoodEvent = /* GraphQL */ `mutation CreateFoodEvent(
  $condition: ModelFoodEventConditionInput
  $input: CreateFoodEventInput!
) {
  createFoodEvent(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateFoodEventMutationVariables,
  APITypes.CreateFoodEventMutation
>;
export const createHackathon = /* GraphQL */ `mutation CreateHackathon(
  $condition: ModelHackathonConditionInput
  $input: CreateHackathonInput!
) {
  createHackathon(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateHackathonMutationVariables,
  APITypes.CreateHackathonMutation
>;
export const createRoom = /* GraphQL */ `mutation CreateRoom(
  $condition: ModelRoomConditionInput
  $input: CreateRoomInput!
) {
  createRoom(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateRoomMutationVariables,
  APITypes.CreateRoomMutation
>;
export const createScore = /* GraphQL */ `mutation CreateScore(
  $condition: ModelScoreConditionInput
  $input: CreateScoreInput!
) {
  createScore(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateScoreMutationVariables,
  APITypes.CreateScoreMutation
>;
export const createTeam = /* GraphQL */ `mutation CreateTeam(
  $condition: ModelTeamConditionInput
  $input: CreateTeamInput!
) {
  createTeam(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateTeamMutationVariables,
  APITypes.CreateTeamMutation
>;
export const createTeamRoom = /* GraphQL */ `mutation CreateTeamRoom(
  $condition: ModelTeamRoomConditionInput
  $input: CreateTeamRoomInput!
) {
  createTeamRoom(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateTeamRoomMutationVariables,
  APITypes.CreateTeamRoomMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const createUserFoodEventAttendance = /* GraphQL */ `mutation CreateUserFoodEventAttendance(
  $condition: ModelUserFoodEventAttendanceConditionInput
  $input: CreateUserFoodEventAttendanceInput!
) {
  createUserFoodEventAttendance(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserFoodEventAttendanceMutationVariables,
  APITypes.CreateUserFoodEventAttendanceMutation
>;
export const deleteFoodEvent = /* GraphQL */ `mutation DeleteFoodEvent(
  $condition: ModelFoodEventConditionInput
  $input: DeleteFoodEventInput!
) {
  deleteFoodEvent(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteFoodEventMutationVariables,
  APITypes.DeleteFoodEventMutation
>;
export const deleteHackathon = /* GraphQL */ `mutation DeleteHackathon(
  $condition: ModelHackathonConditionInput
  $input: DeleteHackathonInput!
) {
  deleteHackathon(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteHackathonMutationVariables,
  APITypes.DeleteHackathonMutation
>;
export const deleteRoom = /* GraphQL */ `mutation DeleteRoom(
  $condition: ModelRoomConditionInput
  $input: DeleteRoomInput!
) {
  deleteRoom(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteRoomMutationVariables,
  APITypes.DeleteRoomMutation
>;
export const deleteScore = /* GraphQL */ `mutation DeleteScore(
  $condition: ModelScoreConditionInput
  $input: DeleteScoreInput!
) {
  deleteScore(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteScoreMutationVariables,
  APITypes.DeleteScoreMutation
>;
export const deleteTeam = /* GraphQL */ `mutation DeleteTeam(
  $condition: ModelTeamConditionInput
  $input: DeleteTeamInput!
) {
  deleteTeam(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteTeamMutationVariables,
  APITypes.DeleteTeamMutation
>;
export const deleteTeamRoom = /* GraphQL */ `mutation DeleteTeamRoom(
  $condition: ModelTeamRoomConditionInput
  $input: DeleteTeamRoomInput!
) {
  deleteTeamRoom(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteTeamRoomMutationVariables,
  APITypes.DeleteTeamRoomMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const deleteUserFoodEventAttendance = /* GraphQL */ `mutation DeleteUserFoodEventAttendance(
  $condition: ModelUserFoodEventAttendanceConditionInput
  $input: DeleteUserFoodEventAttendanceInput!
) {
  deleteUserFoodEventAttendance(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserFoodEventAttendanceMutationVariables,
  APITypes.DeleteUserFoodEventAttendanceMutation
>;
export const updateFoodEvent = /* GraphQL */ `mutation UpdateFoodEvent(
  $condition: ModelFoodEventConditionInput
  $input: UpdateFoodEventInput!
) {
  updateFoodEvent(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateFoodEventMutationVariables,
  APITypes.UpdateFoodEventMutation
>;
export const updateHackathon = /* GraphQL */ `mutation UpdateHackathon(
  $condition: ModelHackathonConditionInput
  $input: UpdateHackathonInput!
) {
  updateHackathon(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateHackathonMutationVariables,
  APITypes.UpdateHackathonMutation
>;
export const updateRoom = /* GraphQL */ `mutation UpdateRoom(
  $condition: ModelRoomConditionInput
  $input: UpdateRoomInput!
) {
  updateRoom(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateRoomMutationVariables,
  APITypes.UpdateRoomMutation
>;
export const updateScore = /* GraphQL */ `mutation UpdateScore(
  $condition: ModelScoreConditionInput
  $input: UpdateScoreInput!
) {
  updateScore(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateScoreMutationVariables,
  APITypes.UpdateScoreMutation
>;
export const updateTeam = /* GraphQL */ `mutation UpdateTeam(
  $condition: ModelTeamConditionInput
  $input: UpdateTeamInput!
) {
  updateTeam(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateTeamMutationVariables,
  APITypes.UpdateTeamMutation
>;
export const updateTeamRoom = /* GraphQL */ `mutation UpdateTeamRoom(
  $condition: ModelTeamRoomConditionInput
  $input: UpdateTeamRoomInput!
) {
  updateTeamRoom(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateTeamRoomMutationVariables,
  APITypes.UpdateTeamRoomMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const updateUserFoodEventAttendance = /* GraphQL */ `mutation UpdateUserFoodEventAttendance(
  $condition: ModelUserFoodEventAttendanceConditionInput
  $input: UpdateUserFoodEventAttendanceInput!
) {
  updateUserFoodEventAttendance(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserFoodEventAttendanceMutationVariables,
  APITypes.UpdateUserFoodEventAttendanceMutation
>;
