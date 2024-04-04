/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
import * as APITypes from "./API";

type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateFoodEvent = /* GraphQL */ `subscription OnCreateFoodEvent(
  $filter: ModelSubscriptionFoodEventFilterInput
  $owner: String
) {
  onCreateFoodEvent(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFoodEventSubscriptionVariables,
  APITypes.OnCreateFoodEventSubscription
>;
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onDeleteFoodEvent = /* GraphQL */ `subscription OnDeleteFoodEvent(
  $filter: ModelSubscriptionFoodEventFilterInput
  $owner: String
) {
  onDeleteFoodEvent(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFoodEventSubscriptionVariables,
  APITypes.OnDeleteFoodEventSubscription
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onUpdateFoodEvent = /* GraphQL */ `subscription OnUpdateFoodEvent(
  $filter: ModelSubscriptionFoodEventFilterInput
  $owner: String
) {
  onUpdateFoodEvent(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFoodEventSubscriptionVariables,
  APITypes.OnUpdateFoodEventSubscription
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
