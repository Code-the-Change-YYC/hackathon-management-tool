/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
import * as APITypes from "./API";

type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const DemoFunction =
  /* GraphQL */ `mutation DemoFunction($content: String) {
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
export const GetFoodTicket =
  /* GraphQL */ `mutation GetFoodTicket($userID: String) {
  GetFoodTicket(userID: $userID) {
    body
    headers
    statusCode
    __typename
  }
}
` as GeneratedMutation<
    APITypes.GetFoodTicketMutationVariables,
    APITypes.GetFoodTicketMutation
  >;
export const createTeam = /* GraphQL */ `mutation CreateTeam(
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
` as GeneratedMutation<
  APITypes.CreateTeamMutationVariables,
  APITypes.CreateTeamMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
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
    Meals
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteTeam = /* GraphQL */ `mutation DeleteTeam(
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
` as GeneratedMutation<
  APITypes.DeleteTeamMutationVariables,
  APITypes.DeleteTeamMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
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
    Meals
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateTeam = /* GraphQL */ `mutation UpdateTeam(
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
` as GeneratedMutation<
  APITypes.UpdateTeamMutationVariables,
  APITypes.UpdateTeamMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
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
    Meals
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
