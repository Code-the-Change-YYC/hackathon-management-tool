/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Team = {
  __typename: "Team";
  createdAt: string;
  id: string;
  members?: ModelUserConnection | null;
  name?: string | null;
  owner?: string | null;
  updatedAt: string;
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items: Array<User | null>;
  nextToken?: string | null;
};

export type User = {
  __typename: "User";
  allergies?: string | null;
  checkedIn?: boolean | null;
  createdAt: string;
  email?: string | null;
  firstName?: string | null;
  id: string;
  institution?: string | null;
  lastName?: string | null;
  meals?: boolean | null;
  owner?: string | null;
  team?: Team | null;
  teamId?: string | null;
  updatedAt: string;
};

export type ModelTeamFilterInput = {
  and?: Array<ModelTeamFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  not?: ModelTeamFilterInput | null;
  or?: Array<ModelTeamFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelStringInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}

export type ModelSizeInput = {
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
};

export type ModelIDInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  size?: ModelSizeInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelTeamConnection = {
  __typename: "ModelTeamConnection";
  items: Array<Team | null>;
  nextToken?: string | null;
};

export type ModelUserFilterInput = {
  allergies?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  checkedIn?: ModelBooleanInput | null;
  createdAt?: ModelStringInput | null;
  email?: ModelStringInput | null;
  firstName?: ModelStringInput | null;
  id?: ModelIDInput | null;
  institution?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  meals?: ModelBooleanInput | null;
  not?: ModelUserFilterInput | null;
  or?: Array<ModelUserFilterInput | null> | null;
  owner?: ModelStringInput | null;
  teamId?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  eq?: boolean | null;
  ne?: boolean | null;
};

export type GenericFunctionResponse = {
  __typename: "GenericFunctionResponse";
  body?: string | null;
  headers?: string | null;
  statusCode?: number | null;
};

export type ModelTeamConditionInput = {
  and?: Array<ModelTeamConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelTeamConditionInput | null;
  or?: Array<ModelTeamConditionInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateTeamInput = {
  id?: string | null;
  name?: string | null;
};

export type ModelUserConditionInput = {
  allergies?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  checkedIn?: ModelBooleanInput | null;
  createdAt?: ModelStringInput | null;
  email?: ModelStringInput | null;
  firstName?: ModelStringInput | null;
  institution?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  meals?: ModelBooleanInput | null;
  not?: ModelUserConditionInput | null;
  or?: Array<ModelUserConditionInput | null> | null;
  owner?: ModelStringInput | null;
  teamId?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateUserInput = {
  allergies?: string | null;
  checkedIn?: boolean | null;
  email?: string | null;
  firstName?: string | null;
  id?: string | null;
  institution?: string | null;
  lastName?: string | null;
  meals?: boolean | null;
  teamId?: string | null;
};

export type DeleteTeamInput = {
  id: string;
};

export type DeleteUserInput = {
  id: string;
};

export type UpdateTeamInput = {
  id: string;
  name?: string | null;
};

export type UpdateUserInput = {
  allergies?: string | null;
  checkedIn?: boolean | null;
  email?: string | null;
  firstName?: string | null;
  id: string;
  institution?: string | null;
  lastName?: string | null;
  meals?: boolean | null;
  teamId?: string | null;
};

export type ModelSubscriptionTeamFilterInput = {
  and?: Array<ModelSubscriptionTeamFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionTeamFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  in?: Array<string | null> | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  in?: Array<string | null> | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionUserFilterInput = {
  allergies?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUserFilterInput | null> | null;
  checkedIn?: ModelSubscriptionBooleanInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  email?: ModelSubscriptionStringInput | null;
  firstName?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  institution?: ModelSubscriptionStringInput | null;
  lastName?: ModelSubscriptionStringInput | null;
  meals?: ModelSubscriptionBooleanInput | null;
  or?: Array<ModelSubscriptionUserFilterInput | null> | null;
  owner?: ModelStringInput | null;
  teamId?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null;
  ne?: boolean | null;
};

export type GetTeamQueryVariables = {
  id: string;
};

export type GetTeamQuery = {
  getTeam?: {
    __typename: "Team";
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name?: string | null;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type GetUserQueryVariables = {
  id: string;
};

export type GetUserQuery = {
  getUser?: {
    __typename: "User";
    allergies?: string | null;
    checkedIn?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    meals?: boolean | null;
    owner?: string | null;
    team?: {
      __typename: "Team";
      createdAt: string;
      id: string;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
  } | null;
};

export type ListTeamsQueryVariables = {
  filter?: ModelTeamFilterInput | null;
  id?: string | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListTeamsQuery = {
  listTeams?: {
    __typename: "ModelTeamConnection";
    items: Array<{
      __typename: "Team";
      createdAt: string;
      id: string;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUsersQuery = {
  listUsers?: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      allergies?: string | null;
      checkedIn?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      meals?: boolean | null;
      owner?: string | null;
      teamId?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type AssignUsersToTeamsMutationVariables = {
  teamId?: string | null;
  userId?: string | null;
};

export type AssignUsersToTeamsMutation = {
  AssignUsersToTeams?: {
    __typename: "GenericFunctionResponse";
    body?: string | null;
    headers?: string | null;
    statusCode?: number | null;
  } | null;
};

export type DemoFunctionMutationVariables = {
  content?: string | null;
};

export type DemoFunctionMutation = {
  DemoFunction?: {
    __typename: "GenericFunctionResponse";
    body?: string | null;
    headers?: string | null;
    statusCode?: number | null;
  } | null;
};

export type CreateTeamMutationVariables = {
  condition?: ModelTeamConditionInput | null;
  input: CreateTeamInput;
};

export type CreateTeamMutation = {
  createTeam?: {
    __typename: "Team";
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name?: string | null;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null;
  input: CreateUserInput;
};

export type CreateUserMutation = {
  createUser?: {
    __typename: "User";
    allergies?: string | null;
    checkedIn?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    meals?: boolean | null;
    owner?: string | null;
    team?: {
      __typename: "Team";
      createdAt: string;
      id: string;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
  } | null;
};

export type DeleteTeamMutationVariables = {
  condition?: ModelTeamConditionInput | null;
  input: DeleteTeamInput;
};

export type DeleteTeamMutation = {
  deleteTeam?: {
    __typename: "Team";
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name?: string | null;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null;
  input: DeleteUserInput;
};

export type DeleteUserMutation = {
  deleteUser?: {
    __typename: "User";
    allergies?: string | null;
    checkedIn?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    meals?: boolean | null;
    owner?: string | null;
    team?: {
      __typename: "Team";
      createdAt: string;
      id: string;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
  } | null;
};

export type UpdateTeamMutationVariables = {
  condition?: ModelTeamConditionInput | null;
  input: UpdateTeamInput;
};

export type UpdateTeamMutation = {
  updateTeam?: {
    __typename: "Team";
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name?: string | null;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null;
  input: UpdateUserInput;
};

export type UpdateUserMutation = {
  updateUser?: {
    __typename: "User";
    allergies?: string | null;
    checkedIn?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    meals?: boolean | null;
    owner?: string | null;
    team?: {
      __typename: "Team";
      createdAt: string;
      id: string;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
  } | null;
};

export type OnCreateTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null;
  owner?: string | null;
};

export type OnCreateTeamSubscription = {
  onCreateTeam?: {
    __typename: "Team";
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name?: string | null;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnCreateUserSubscription = {
  onCreateUser?: {
    __typename: "User";
    allergies?: string | null;
    checkedIn?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    meals?: boolean | null;
    owner?: string | null;
    team?: {
      __typename: "Team";
      createdAt: string;
      id: string;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null;
  owner?: string | null;
};

export type OnDeleteTeamSubscription = {
  onDeleteTeam?: {
    __typename: "Team";
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name?: string | null;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnDeleteUserSubscription = {
  onDeleteUser?: {
    __typename: "User";
    allergies?: string | null;
    checkedIn?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    meals?: boolean | null;
    owner?: string | null;
    team?: {
      __typename: "Team";
      createdAt: string;
      id: string;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null;
  owner?: string | null;
};

export type OnUpdateTeamSubscription = {
  onUpdateTeam?: {
    __typename: "Team";
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name?: string | null;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnUpdateUserSubscription = {
  onUpdateUser?: {
    __typename: "User";
    allergies?: string | null;
    checkedIn?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    meals?: boolean | null;
    owner?: string | null;
    team?: {
      __typename: "Team";
      createdAt: string;
      id: string;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
  } | null;
};
