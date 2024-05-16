/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $condition: ModelTeamConditionInput
    $input: CreateTeamInput!
  ) {
    createTeam(condition: $condition, input: $input) {
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
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $condition: ModelTeamConditionInput
    $input: DeleteTeamInput!
  ) {
    deleteTeam(condition: $condition, input: $input) {
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
`;
export const getUserVerifcationCode = /* GraphQL */ `
  mutation GetUserVerifcationCode($userId: String) {
    getUserVerifcationCode(userId: $userId) {
      body
      headers
      statusCode
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
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $condition: ModelTeamConditionInput
    $input: UpdateTeamInput!
  ) {
    updateTeam(condition: $condition, input: $input) {
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
`;
export const verifyUserVerifcationCode = /* GraphQL */ `
  mutation VerifyUserVerifcationCode($eventID: String, $userCode: String) {
    verifyUserVerifcationCode(eventID: $eventID, userCode: $userCode) {
      body
      headers
      statusCode
      __typename
    }
  }
`;
