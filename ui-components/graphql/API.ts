/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type GenericFunctionResponse = {
  __typename: "GenericFunctionResponse";
  body?: string | null;
  headers?: string | null;
  statusCode?: number | null;
};

export type FoodEvent = {
  __typename: "FoodEvent";
  attended?: ModelUserConnection | null;
  createdAt: string;
  description?: string | null;
  end?: string | null;
  groups?: number | null;
  id: string;
  name?: string | null;
  owner?: string | null;
  start?: string | null;
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
  meal?: FoodEvent | null;
  mealId?: string | null;
  meals?: boolean | null;
  owner?: string | null;
  team?: Team | null;
  teamId?: string | null;
  updatedAt: string;
};

export type Team = {
  __typename: "Team";
  createdAt: string;
  id: string;
  members?: ModelUserConnection | null;
  name?: string | null;
  owner?: string | null;
  updatedAt: string;
};

export type ModelFoodEventFilterInput = {
  and?: Array<ModelFoodEventFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  end?: ModelStringInput | null;
  groups?: ModelIntInput | null;
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  not?: ModelFoodEventFilterInput | null;
  or?: Array<ModelFoodEventFilterInput | null> | null;
  owner?: ModelStringInput | null;
  start?: ModelStringInput | null;
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

export type ModelIntInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
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

export type ModelFoodEventConnection = {
  __typename: "ModelFoodEventConnection";
  items: Array<FoodEvent | null>;
  nextToken?: string | null;
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
  mealId?: ModelIDInput | null;
  meals?: ModelBooleanInput | null;
  not?: ModelUserFilterInput | null;
  or?: Array<ModelUserFilterInput | null> | null;
  owner?: ModelStringInput | null;
  teamId?: ModelIDInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  eq?: boolean | null;
  ne?: boolean | null;
};

export type ModelFoodEventConditionInput = {
  and?: Array<ModelFoodEventConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  end?: ModelStringInput | null;
  groups?: ModelIntInput | null;
  name?: ModelStringInput | null;
  not?: ModelFoodEventConditionInput | null;
  or?: Array<ModelFoodEventConditionInput | null> | null;
  owner?: ModelStringInput | null;
  start?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateFoodEventInput = {
  description?: string | null;
  end?: string | null;
  groups?: number | null;
  id?: string | null;
  name?: string | null;
  start?: string | null;
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
  mealId?: ModelIDInput | null;
  meals?: ModelBooleanInput | null;
  not?: ModelUserConditionInput | null;
  or?: Array<ModelUserConditionInput | null> | null;
  owner?: ModelStringInput | null;
  teamId?: ModelIDInput | null;
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
  mealId?: string | null;
  meals?: boolean | null;
  teamId?: string | null;
};

export type DeleteFoodEventInput = {
  id: string;
};

export type DeleteTeamInput = {
  id: string;
};

export type DeleteUserInput = {
  id: string;
};

export type UpdateFoodEventInput = {
  description?: string | null;
  end?: string | null;
  groups?: number | null;
  id: string;
  name?: string | null;
  start?: string | null;
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
  mealId?: string | null;
  meals?: boolean | null;
  teamId?: string | null;
};

export type ModelSubscriptionFoodEventFilterInput = {
  and?: Array<ModelSubscriptionFoodEventFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  end?: ModelSubscriptionStringInput | null;
  groups?: ModelSubscriptionIntInput | null;
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionFoodEventFilterInput | null> | null;
  owner?: ModelStringInput | null;
  start?: ModelSubscriptionStringInput | null;
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

export type ModelSubscriptionIntInput = {
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  in?: Array<number | null> | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
  notIn?: Array<number | null> | null;
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

export type ModelSubscriptionTeamFilterInput = {
  and?: Array<ModelSubscriptionTeamFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionTeamFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
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
  mealId?: ModelSubscriptionIDInput | null;
  meals?: ModelSubscriptionBooleanInput | null;
  or?: Array<ModelSubscriptionUserFilterInput | null> | null;
  owner?: ModelStringInput | null;
  teamId?: ModelSubscriptionIDInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null;
  ne?: boolean | null;
};

export type VerifyUserCodeQueryVariables = {
  userCode?: string | null;
};

export type VerifyUserCodeQuery = {
  VerifyUserCode?: {
    __typename: "GenericFunctionResponse";
    body?: string | null;
    headers?: string | null;
    statusCode?: number | null;
  } | null;
};

export type GetFoodEventQueryVariables = {
  id: string;
};

export type GetFoodEventQuery = {
  getFoodEvent?: {
    __typename: "FoodEvent";
    attended?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description?: string | null;
    end?: string | null;
    groups?: number | null;
    id: string;
    name?: string | null;
    owner?: string | null;
    start?: string | null;
    updatedAt: string;
  } | null;
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
    meal?: {
      __typename: "FoodEvent";
      createdAt: string;
      description?: string | null;
      end?: string | null;
      groups?: number | null;
      id: string;
      name?: string | null;
      owner?: string | null;
      start?: string | null;
      updatedAt: string;
    } | null;
    mealId?: string | null;
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

export type ListFoodEventsQueryVariables = {
  filter?: ModelFoodEventFilterInput | null;
  id?: string | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListFoodEventsQuery = {
  listFoodEvents?: {
    __typename: "ModelFoodEventConnection";
    items: Array<{
      __typename: "FoodEvent";
      createdAt: string;
      description?: string | null;
      end?: string | null;
      groups?: number | null;
      id: string;
      name?: string | null;
      owner?: string | null;
      start?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
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
      mealId?: string | null;
      meals?: boolean | null;
      owner?: string | null;
      teamId?: string | null;
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

export type CreateFoodEventMutationVariables = {
  condition?: ModelFoodEventConditionInput | null;
  input: CreateFoodEventInput;
};

export type CreateFoodEventMutation = {
  createFoodEvent?: {
    __typename: "FoodEvent";
    attended?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description?: string | null;
    end?: string | null;
    groups?: number | null;
    id: string;
    name?: string | null;
    owner?: string | null;
    start?: string | null;
    updatedAt: string;
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
    meal?: {
      __typename: "FoodEvent";
      createdAt: string;
      description?: string | null;
      end?: string | null;
      groups?: number | null;
      id: string;
      name?: string | null;
      owner?: string | null;
      start?: string | null;
      updatedAt: string;
    } | null;
    mealId?: string | null;
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

export type DeleteFoodEventMutationVariables = {
  condition?: ModelFoodEventConditionInput | null;
  input: DeleteFoodEventInput;
};

export type DeleteFoodEventMutation = {
  deleteFoodEvent?: {
    __typename: "FoodEvent";
    attended?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description?: string | null;
    end?: string | null;
    groups?: number | null;
    id: string;
    name?: string | null;
    owner?: string | null;
    start?: string | null;
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
    meal?: {
      __typename: "FoodEvent";
      createdAt: string;
      description?: string | null;
      end?: string | null;
      groups?: number | null;
      id: string;
      name?: string | null;
      owner?: string | null;
      start?: string | null;
      updatedAt: string;
    } | null;
    mealId?: string | null;
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

export type GetUserVerificationCodeMutationVariables = {
  userId?: string | null;
};

export type GetUserVerificationCodeMutation = {
  getUserVerificationCode?: {
    __typename: "GenericFunctionResponse";
    body?: string | null;
    headers?: string | null;
    statusCode?: number | null;
  } | null;
};

export type UpdateFoodEventMutationVariables = {
  condition?: ModelFoodEventConditionInput | null;
  input: UpdateFoodEventInput;
};

export type UpdateFoodEventMutation = {
  updateFoodEvent?: {
    __typename: "FoodEvent";
    attended?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description?: string | null;
    end?: string | null;
    groups?: number | null;
    id: string;
    name?: string | null;
    owner?: string | null;
    start?: string | null;
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
    meal?: {
      __typename: "FoodEvent";
      createdAt: string;
      description?: string | null;
      end?: string | null;
      groups?: number | null;
      id: string;
      name?: string | null;
      owner?: string | null;
      start?: string | null;
      updatedAt: string;
    } | null;
    mealId?: string | null;
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

export type OnCreateFoodEventSubscriptionVariables = {
  filter?: ModelSubscriptionFoodEventFilterInput | null;
  owner?: string | null;
};

export type OnCreateFoodEventSubscription = {
  onCreateFoodEvent?: {
    __typename: "FoodEvent";
    attended?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description?: string | null;
    end?: string | null;
    groups?: number | null;
    id: string;
    name?: string | null;
    owner?: string | null;
    start?: string | null;
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
    meal?: {
      __typename: "FoodEvent";
      createdAt: string;
      description?: string | null;
      end?: string | null;
      groups?: number | null;
      id: string;
      name?: string | null;
      owner?: string | null;
      start?: string | null;
      updatedAt: string;
    } | null;
    mealId?: string | null;
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

export type OnDeleteFoodEventSubscriptionVariables = {
  filter?: ModelSubscriptionFoodEventFilterInput | null;
  owner?: string | null;
};

export type OnDeleteFoodEventSubscription = {
  onDeleteFoodEvent?: {
    __typename: "FoodEvent";
    attended?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description?: string | null;
    end?: string | null;
    groups?: number | null;
    id: string;
    name?: string | null;
    owner?: string | null;
    start?: string | null;
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
    meal?: {
      __typename: "FoodEvent";
      createdAt: string;
      description?: string | null;
      end?: string | null;
      groups?: number | null;
      id: string;
      name?: string | null;
      owner?: string | null;
      start?: string | null;
      updatedAt: string;
    } | null;
    mealId?: string | null;
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

export type OnUpdateFoodEventSubscriptionVariables = {
  filter?: ModelSubscriptionFoodEventFilterInput | null;
  owner?: string | null;
};

export type OnUpdateFoodEventSubscription = {
  onUpdateFoodEvent?: {
    __typename: "FoodEvent";
    attended?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description?: string | null;
    end?: string | null;
    groups?: number | null;
    id: string;
    name?: string | null;
    owner?: string | null;
    start?: string | null;
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
    meal?: {
      __typename: "FoodEvent";
      createdAt: string;
      description?: string | null;
      end?: string | null;
      groups?: number | null;
      id: string;
      name?: string | null;
      owner?: string | null;
      start?: string | null;
      updatedAt: string;
    } | null;
    mealId?: string | null;
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
