/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFoodEvent = /* GraphQL */ `
  subscription OnCreateFoodEvent(
    $filter: ModelSubscriptionFoodEventFilterInput
    $owner: String
  ) {
    onCreateFoodEvent(filter: $filter, owner: $owner) {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam(
    $filter: ModelSubscriptionTeamFilterInput
    $owner: String
  ) {
    onCreateTeam(filter: $filter, owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onDeleteFoodEvent = /* GraphQL */ `
  subscription OnDeleteFoodEvent(
    $filter: ModelSubscriptionFoodEventFilterInput
    $owner: String
  ) {
    onDeleteFoodEvent(filter: $filter, owner: $owner) {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam(
    $filter: ModelSubscriptionTeamFilterInput
    $owner: String
  ) {
    onDeleteTeam(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onUpdateFoodEvent = /* GraphQL */ `
  subscription OnUpdateFoodEvent(
    $filter: ModelSubscriptionFoodEventFilterInput
    $owner: String
  ) {
    onUpdateFoodEvent(filter: $filter, owner: $owner) {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam(
    $filter: ModelSubscriptionTeamFilterInput
    $owner: String
  ) {
    onUpdateTeam(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
