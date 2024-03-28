/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Team = {
  __typename: "Team";
  Code?: string | null;
  Members?: ModelUserConnection | null;
  Name?: string | null;
  createdAt: string;
  id: string;
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
  Allergies?: string | null;
  CheckedIn?: boolean | null;
  Email?: string | null;
  FirstName?: string | null;
  Institution?: string | null;
  LastName?: string | null;
  Meals?: boolean | null;
  Team?: Team | null;
  createdAt: string;
  id: string;
  owner?: string | null;
  teamMembersId?: string | null;
  updatedAt: string;
};

export type ModelTeamFilterInput = {
  Code?: ModelStringInput | null;
  Name?: ModelStringInput | null;
  and?: Array<ModelTeamFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
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
  Allergies?: ModelStringInput | null;
  CheckedIn?: ModelBooleanInput | null;
  Email?: ModelStringInput | null;
  FirstName?: ModelStringInput | null;
  Institution?: ModelStringInput | null;
  LastName?: ModelStringInput | null;
  Meals?: ModelBooleanInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  not?: ModelUserFilterInput | null;
  or?: Array<ModelUserFilterInput | null> | null;
  owner?: ModelStringInput | null;
  teamMembersId?: ModelIDInput | null;
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
  Code?: ModelStringInput | null;
  Name?: ModelStringInput | null;
  and?: Array<ModelTeamConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  not?: ModelTeamConditionInput | null;
  or?: Array<ModelTeamConditionInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateTeamInput = {
  Code?: string | null;
  Name?: string | null;
  createdAt?: string | null;
  id?: string | null;
  owner?: string | null;
  updatedAt?: string | null;
};

export type ModelUserConditionInput = {
  Allergies?: ModelStringInput | null;
  CheckedIn?: ModelBooleanInput | null;
  Email?: ModelStringInput | null;
  FirstName?: ModelStringInput | null;
  Institution?: ModelStringInput | null;
  LastName?: ModelStringInput | null;
  Meals?: ModelBooleanInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  not?: ModelUserConditionInput | null;
  or?: Array<ModelUserConditionInput | null> | null;
  owner?: ModelStringInput | null;
  teamMembersId?: ModelIDInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateUserInput = {
  Allergies?: string | null;
  CheckedIn?: boolean | null;
  Email?: string | null;
  FirstName?: string | null;
  Institution?: string | null;
  LastName?: string | null;
  Meals?: boolean | null;
  createdAt?: string | null;
  id?: string | null;
  owner?: string | null;
  teamMembersId?: string | null;
  updatedAt?: string | null;
};

export type DeleteTeamInput = {
  id: string;
};

export type DeleteUserInput = {
  id: string;
};

export type UpdateTeamInput = {
  Code?: string | null;
  Name?: string | null;
  createdAt?: string | null;
  id: string;
  owner?: string | null;
  updatedAt?: string | null;
};

export type UpdateUserInput = {
  Allergies?: string | null;
  CheckedIn?: boolean | null;
  Email?: string | null;
  FirstName?: string | null;
  Institution?: string | null;
  LastName?: string | null;
  Meals?: boolean | null;
  createdAt?: string | null;
  id: string;
  owner?: string | null;
  teamMembersId?: string | null;
  updatedAt?: string | null;
};

export type ModelSubscriptionTeamFilterInput = {
  Code?: ModelSubscriptionStringInput | null;
  Name?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionTeamFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionTeamFilterInput | null> | null;
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
  Allergies?: ModelSubscriptionStringInput | null;
  CheckedIn?: ModelSubscriptionBooleanInput | null;
  Email?: ModelSubscriptionStringInput | null;
  FirstName?: ModelSubscriptionStringInput | null;
  Institution?: ModelSubscriptionStringInput | null;
  LastName?: ModelSubscriptionStringInput | null;
  Meals?: ModelSubscriptionBooleanInput | null;
  and?: Array<ModelSubscriptionUserFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionUserFilterInput | null> | null;
  teamMembersId?: ModelSubscriptionIDInput | null;
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
    Code?: string | null;
    Members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    Name?: string | null;
    createdAt: string;
    id: string;
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
    Allergies?: string | null;
    CheckedIn?: boolean | null;
    Email?: string | null;
    FirstName?: string | null;
    Institution?: string | null;
    LastName?: string | null;
    Meals?: boolean | null;
    Team?: {
      __typename: "Team";
      Code?: string | null;
      Name?: string | null;
      createdAt: string;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null;
    createdAt: string;
    id: string;
    owner?: string | null;
    teamMembersId?: string | null;
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
      Code?: string | null;
      Name?: string | null;
      createdAt: string;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  id?: string | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListUsersQuery = {
  listUsers?: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      Allergies?: string | null;
      CheckedIn?: boolean | null;
      Email?: string | null;
      FirstName?: string | null;
      Institution?: string | null;
      LastName?: string | null;
      Meals?: boolean | null;
      createdAt: string;
      id: string;
      owner?: string | null;
      teamMembersId?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
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

export type GetFoodTicketMutationVariables = {
  userID?: string | null;
};

export type GetFoodTicketMutation = {
  GetFoodTicket?: {
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
    Code?: string | null;
    Members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    Name?: string | null;
    createdAt: string;
    id: string;
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
    Allergies?: string | null;
    CheckedIn?: boolean | null;
    Email?: string | null;
    FirstName?: string | null;
    Institution?: string | null;
    LastName?: string | null;
    Meals?: boolean | null;
    Team?: {
      __typename: "Team";
      Code?: string | null;
      Name?: string | null;
      createdAt: string;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null;
    createdAt: string;
    id: string;
    owner?: string | null;
    teamMembersId?: string | null;
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
    Code?: string | null;
    Members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    Name?: string | null;
    createdAt: string;
    id: string;
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
    Allergies?: string | null;
    CheckedIn?: boolean | null;
    Email?: string | null;
    FirstName?: string | null;
    Institution?: string | null;
    LastName?: string | null;
    Meals?: boolean | null;
    Team?: {
      __typename: "Team";
      Code?: string | null;
      Name?: string | null;
      createdAt: string;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null;
    createdAt: string;
    id: string;
    owner?: string | null;
    teamMembersId?: string | null;
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
    Code?: string | null;
    Members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    Name?: string | null;
    createdAt: string;
    id: string;
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
    Allergies?: string | null;
    CheckedIn?: boolean | null;
    Email?: string | null;
    FirstName?: string | null;
    Institution?: string | null;
    LastName?: string | null;
    Meals?: boolean | null;
    Team?: {
      __typename: "Team";
      Code?: string | null;
      Name?: string | null;
      createdAt: string;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null;
    createdAt: string;
    id: string;
    owner?: string | null;
    teamMembersId?: string | null;
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
    Code?: string | null;
    Members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    Name?: string | null;
    createdAt: string;
    id: string;
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
    Allergies?: string | null;
    CheckedIn?: boolean | null;
    Email?: string | null;
    FirstName?: string | null;
    Institution?: string | null;
    LastName?: string | null;
    Meals?: boolean | null;
    Team?: {
      __typename: "Team";
      Code?: string | null;
      Name?: string | null;
      createdAt: string;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null;
    createdAt: string;
    id: string;
    owner?: string | null;
    teamMembersId?: string | null;
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
    Code?: string | null;
    Members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    Name?: string | null;
    createdAt: string;
    id: string;
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
    Allergies?: string | null;
    CheckedIn?: boolean | null;
    Email?: string | null;
    FirstName?: string | null;
    Institution?: string | null;
    LastName?: string | null;
    Meals?: boolean | null;
    Team?: {
      __typename: "Team";
      Code?: string | null;
      Name?: string | null;
      createdAt: string;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null;
    createdAt: string;
    id: string;
    owner?: string | null;
    teamMembersId?: string | null;
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
    Code?: string | null;
    Members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    Name?: string | null;
    createdAt: string;
    id: string;
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
    Allergies?: string | null;
    CheckedIn?: boolean | null;
    Email?: string | null;
    FirstName?: string | null;
    Institution?: string | null;
    LastName?: string | null;
    Meals?: boolean | null;
    Team?: {
      __typename: "Team";
      Code?: string | null;
      Name?: string | null;
      createdAt: string;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null;
    createdAt: string;
    id: string;
    owner?: string | null;
    teamMembersId?: string | null;
    updatedAt: string;
  } | null;
};
