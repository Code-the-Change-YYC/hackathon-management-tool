/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
import * as APITypes from "./API";

type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTeam = /* GraphQL */ `subscription OnCreateTeam(
  $filter: ModelSubscriptionTeamFilterInput
  $owner: String
) {
  onCreateTeam(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTeamSubscriptionVariables,
  APITypes.OnCreateTeamSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onDeleteTeam = /* GraphQL */ `subscription OnDeleteTeam(
  $filter: ModelSubscriptionTeamFilterInput
  $owner: String
) {
  onDeleteTeam(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTeamSubscriptionVariables,
  APITypes.OnDeleteTeamSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onUpdateTeam = /* GraphQL */ `subscription OnUpdateTeam(
  $filter: ModelSubscriptionTeamFilterInput
  $owner: String
) {
  onUpdateTeam(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTeamSubscriptionVariables,
  APITypes.OnUpdateTeamSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
