/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFoodEvent = /* GraphQL */ `
  subscription OnCreateFoodEvent(
    $filter: ModelSubscriptionFoodEventFilterInput
  ) {
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
`;
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam(
    $filter: ModelSubscriptionTeamFilterInput
    $owner: String
  ) {
    onCreateTeam(filter: $filter, owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $profileOwner: String
  ) {
    onCreateUser(filter: $filter, profileOwner: $profileOwner) {
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
export const onCreateUserFoodEventAttendance = /* GraphQL */ `
  subscription OnCreateUserFoodEventAttendance(
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
export const onDeleteFoodEvent = /* GraphQL */ `
  subscription OnDeleteFoodEvent(
    $filter: ModelSubscriptionFoodEventFilterInput
  ) {
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
`;
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam(
    $filter: ModelSubscriptionTeamFilterInput
    $owner: String
  ) {
    onDeleteTeam(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $profileOwner: String
  ) {
    onDeleteUser(filter: $filter, profileOwner: $profileOwner) {
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
export const onDeleteUserFoodEventAttendance = /* GraphQL */ `
  subscription OnDeleteUserFoodEventAttendance(
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
export const onUpdateFoodEvent = /* GraphQL */ `
  subscription OnUpdateFoodEvent(
    $filter: ModelSubscriptionFoodEventFilterInput
  ) {
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
`;
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam(
    $filter: ModelSubscriptionTeamFilterInput
    $owner: String
  ) {
    onUpdateTeam(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $profileOwner: String
  ) {
    onUpdateUser(filter: $filter, profileOwner: $profileOwner) {
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
export const onUpdateUserFoodEventAttendance = /* GraphQL */ `
  subscription OnUpdateUserFoodEventAttendance(
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
