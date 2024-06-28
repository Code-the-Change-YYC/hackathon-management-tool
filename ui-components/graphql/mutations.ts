/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const AssignUsersToTeams = /* GraphQL */ `
  mutation AssignUsersToTeams($teamId: String!, $userId: String!) {
    AssignUsersToTeams(teamId: $teamId, userId: $userId) {
      body
      headers
      statusCode
      __typename
    }
  }
`;
export const CreateTeamWithCode = /* GraphQL */ `
  mutation CreateTeamWithCode($addCallerToTeam: Boolean!, $teamName: String!) {
    CreateTeamWithCode(addCallerToTeam: $addCallerToTeam, teamName: $teamName) {
      body
      headers
      statusCode
      __typename
    }
  }
`;
export const DemoFunction = /* GraphQL */ `
  mutation DemoFunction($content: String) {
    DemoFunction(content: $content) {
      body
      headers
      statusCode
      __typename
    }
  }
`;
export const createFoodEvent = /* GraphQL */ `
  mutation CreateFoodEvent(
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
`;
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
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
      owner
      updatedAt
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $condition: ModelUserConditionInput
    $input: CreateUserInput!
  ) {
    createUser(condition: $condition, input: $input) {
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
export const createUserFoodEventAttendance = /* GraphQL */ `
  mutation CreateUserFoodEventAttendance(
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
export const deleteFoodEvent = /* GraphQL */ `
  mutation DeleteFoodEvent(
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
`;
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
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
      owner
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $condition: ModelUserConditionInput
    $input: DeleteUserInput!
  ) {
    deleteUser(condition: $condition, input: $input) {
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
export const deleteUserFoodEventAttendance = /* GraphQL */ `
  mutation DeleteUserFoodEventAttendance(
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
export const updateFoodEvent = /* GraphQL */ `
  mutation UpdateFoodEvent(
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
`;
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
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
      owner
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $condition: ModelUserConditionInput
    $input: UpdateUserInput!
  ) {
    updateUser(condition: $condition, input: $input) {
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
export const updateUserFoodEventAttendance = /* GraphQL */ `
  mutation UpdateUserFoodEventAttendance(
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
