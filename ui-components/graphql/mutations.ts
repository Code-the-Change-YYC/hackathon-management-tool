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
export const GetFoodTicket = /* GraphQL */ `
  mutation GetFoodTicket($userID: String) {
    GetFoodTicket(userID: $userID) {
      headers
      statusCode
      value
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
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $condition: ModelTeamConditionInput
    $input: CreateTeamInput!
  ) {
    createTeam(condition: $condition, input: $input) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $condition: ModelUserConditionInput
    $input: CreateUserInput!
  ) {
    createUser(condition: $condition, input: $input) {
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
export const deleteFoodEvent = /* GraphQL */ `
  mutation DeleteFoodEvent(
    $condition: ModelFoodEventConditionInput
    $input: DeleteFoodEventInput!
  ) {
    deleteFoodEvent(condition: $condition, input: $input) {
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
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $condition: ModelTeamConditionInput
    $input: DeleteTeamInput!
  ) {
    deleteTeam(condition: $condition, input: $input) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $condition: ModelUserConditionInput
    $input: DeleteUserInput!
  ) {
    deleteUser(condition: $condition, input: $input) {
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
export const updateFoodEvent = /* GraphQL */ `
  mutation UpdateFoodEvent(
    $condition: ModelFoodEventConditionInput
    $input: UpdateFoodEventInput!
  ) {
    updateFoodEvent(condition: $condition, input: $input) {
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
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $condition: ModelTeamConditionInput
    $input: UpdateTeamInput!
  ) {
    updateTeam(condition: $condition, input: $input) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $condition: ModelUserConditionInput
    $input: UpdateUserInput!
  ) {
    updateUser(condition: $condition, input: $input) {
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
