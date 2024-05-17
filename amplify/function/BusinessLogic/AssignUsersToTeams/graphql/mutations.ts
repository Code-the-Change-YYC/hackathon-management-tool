/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const AssignUsersToTeams = /* GraphQL */ `mutation AssignUsersToTeams($teamId: String, $userId: String) {
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
export const createTeam = /* GraphQL */ `mutation CreateTeam(
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
` as GeneratedMutation<
  APITypes.CreateTeamMutationVariables,
  APITypes.CreateTeamMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteTeam = /* GraphQL */ `mutation DeleteTeam(
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
` as GeneratedMutation<
  APITypes.DeleteTeamMutationVariables,
  APITypes.DeleteTeamMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateTeam = /* GraphQL */ `mutation UpdateTeam(
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
` as GeneratedMutation<
  APITypes.UpdateTeamMutationVariables,
  APITypes.UpdateTeamMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
