/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type GenericFunctionResponse = {
  __typename: "GenericFunctionResponse";
  body?: string | null;
  headers?: string | null;
  statusCode?: number | null;
};

export type StatusCodeFunctionResponse = {
  __typename: "StatusCodeFunctionResponse";
  headers?: string | null;
  statusCode?: number | null;
};

export type FoodEvent = {
  __typename: "FoodEvent";
  attended?: ModelUserFoodEventAttendanceConnection | null;
  createdAt: string;
  description: string;
  end: string;
  id: string;
  name: string;
  start: string;
  totalGroupCount: number;
  updatedAt: string;
};

export type ModelUserFoodEventAttendanceConnection = {
  __typename: "ModelUserFoodEventAttendanceConnection";
  items: Array<UserFoodEventAttendance | null>;
  nextToken?: string | null;
};

export type UserFoodEventAttendance = {
  __typename: "UserFoodEventAttendance";
  createdAt: string;
  foodEvent?: FoodEvent | null;
  foodEventId?: string | null;
  id: string;
  updatedAt: string;
  user?: User | null;
  userId?: string | null;
};

export type User = {
  __typename: "User";
  JUDGE_givenScores?: ModelScoreConnection | null;
  JUDGE_room?: Room | null;
  JUDGE_roomId?: string | null;
  allergies?: string | null;
  attendedEvents?: ModelUserFoodEventAttendanceConnection | null;
  checkedIn?: boolean | null;
  completedRegistration?: boolean | null;
  createdAt: string;
  email?: string | null;
  firstName?: string | null;
  id: string;
  institution?: string | null;
  lastName?: string | null;
  profileOwner?: string | null;
  program?: string | null;
  role?: string | null;
  team?: Team | null;
  teamId?: string | null;
  updatedAt: string;
  willEatMeals?: boolean | null;
};

export type ModelScoreConnection = {
  __typename: "ModelScoreConnection";
  items: Array<Score | null>;
  nextToken?: string | null;
};

export type Score = {
  __typename: "Score";
  createdAt: string;
  id?: string | null;
  judge?: User | null;
  judgeId: string;
  score: string;
  team?: Team | null;
  teamId: string;
  updatedAt: string;
};

export type Team = {
  __typename: "Team";
  approved?: boolean | null;
  createdAt: string;
  id: string;
  members?: ModelUserConnection | null;
  name: string;
  scores?: ModelScoreConnection | null;
  teamRooms?: ModelTeamRoomConnection | null;
  updatedAt: string;
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items: Array<User | null>;
  nextToken?: string | null;
};

export type ModelTeamRoomConnection = {
  __typename: "ModelTeamRoomConnection";
  items: Array<TeamRoom | null>;
  nextToken?: string | null;
};

export type TeamRoom = {
  __typename: "TeamRoom";
  createdAt: string;
  id: string;
  room?: Room | null;
  roomId: string;
  team?: Team | null;
  teamId: string;
  time: string;
  updatedAt: string;
  zoomLink: string;
};

export type Room = {
  __typename: "Room";
  createdAt: string;
  id: string;
  judges?: ModelUserConnection | null;
  name: string;
  teamRoom?: ModelTeamRoomConnection | null;
  updatedAt: string;
};

export type Hackathon = {
  __typename: "Hackathon";
  createdAt: string;
  endDate: string;
  id: string;
  scoringComponents: Array<ScoreComponentType>;
  scoringSidepots: Array<ScoreComponentType>;
  startDate: string;
  updatedAt: string;
};

export type ScoreComponentType = {
  __typename: "ScoreComponentType";
  friendlyName: string;
  id: string;
  isSidepot: boolean;
};

export type ModelFoodEventFilterInput = {
  and?: Array<ModelFoodEventFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  end?: ModelStringInput | null;
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  not?: ModelFoodEventFilterInput | null;
  or?: Array<ModelFoodEventFilterInput | null> | null;
  start?: ModelStringInput | null;
  totalGroupCount?: ModelIntInput | null;
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

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelFoodEventConnection = {
  __typename: "ModelFoodEventConnection";
  items: Array<FoodEvent | null>;
  nextToken?: string | null;
};

export type ModelHackathonFilterInput = {
  and?: Array<ModelHackathonFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  endDate?: ModelStringInput | null;
  id?: ModelIDInput | null;
  not?: ModelHackathonFilterInput | null;
  or?: Array<ModelHackathonFilterInput | null> | null;
  startDate?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelHackathonConnection = {
  __typename: "ModelHackathonConnection";
  items: Array<Hackathon | null>;
  nextToken?: string | null;
};

export type ModelRoomFilterInput = {
  and?: Array<ModelRoomFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  not?: ModelRoomFilterInput | null;
  or?: Array<ModelRoomFilterInput | null> | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelRoomConnection = {
  __typename: "ModelRoomConnection";
  items: Array<Room | null>;
  nextToken?: string | null;
};

export type ModelScoreFilterInput = {
  and?: Array<ModelScoreFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  judgeId?: ModelIDInput | null;
  not?: ModelScoreFilterInput | null;
  or?: Array<ModelScoreFilterInput | null> | null;
  score?: ModelStringInput | null;
  teamId?: ModelIDInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelIDKeyConditionInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
};

export type ModelTeamRoomFilterInput = {
  and?: Array<ModelTeamRoomFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  not?: ModelTeamRoomFilterInput | null;
  or?: Array<ModelTeamRoomFilterInput | null> | null;
  roomId?: ModelIDInput | null;
  teamId?: ModelIDInput | null;
  time?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  zoomLink?: ModelStringInput | null;
};

export type ModelTeamFilterInput = {
  and?: Array<ModelTeamFilterInput | null> | null;
  approved?: ModelBooleanInput | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  not?: ModelTeamFilterInput | null;
  or?: Array<ModelTeamFilterInput | null> | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  eq?: boolean | null;
  ne?: boolean | null;
};

export type ModelTeamConnection = {
  __typename: "ModelTeamConnection";
  items: Array<Team | null>;
  nextToken?: string | null;
};

export type ModelUserFoodEventAttendanceFilterInput = {
  and?: Array<ModelUserFoodEventAttendanceFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  foodEventId?: ModelIDInput | null;
  id?: ModelIDInput | null;
  not?: ModelUserFoodEventAttendanceFilterInput | null;
  or?: Array<ModelUserFoodEventAttendanceFilterInput | null> | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelIDInput | null;
};

export type ModelUserFilterInput = {
  JUDGE_roomId?: ModelIDInput | null;
  allergies?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  checkedIn?: ModelBooleanInput | null;
  completedRegistration?: ModelBooleanInput | null;
  createdAt?: ModelStringInput | null;
  email?: ModelStringInput | null;
  firstName?: ModelStringInput | null;
  id?: ModelIDInput | null;
  institution?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  not?: ModelUserFilterInput | null;
  or?: Array<ModelUserFilterInput | null> | null;
  profileOwner?: ModelStringInput | null;
  program?: ModelStringInput | null;
  role?: ModelStringInput | null;
  teamId?: ModelIDInput | null;
  updatedAt?: ModelStringInput | null;
  willEatMeals?: ModelBooleanInput | null;
};

export type AddUserToGroupResponse = {
  __typename: "AddUserToGroupResponse";
  body?: string | null;
  headers?: string | null;
  statusCode?: number | null;
};

export type ScheduleTeamsAndJudgesResponse = {
  __typename: "ScheduleTeamsAndJudgesResponse";
  body?: string | null;
  headers?: string | null;
  statusCode?: number | null;
};

export type ModelFoodEventConditionInput = {
  and?: Array<ModelFoodEventConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  end?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelFoodEventConditionInput | null;
  or?: Array<ModelFoodEventConditionInput | null> | null;
  start?: ModelStringInput | null;
  totalGroupCount?: ModelIntInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateFoodEventInput = {
  description: string;
  end: string;
  id?: string | null;
  name: string;
  start: string;
  totalGroupCount: number;
};

export type ModelHackathonConditionInput = {
  and?: Array<ModelHackathonConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  endDate?: ModelStringInput | null;
  not?: ModelHackathonConditionInput | null;
  or?: Array<ModelHackathonConditionInput | null> | null;
  startDate?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateHackathonInput = {
  endDate: string;
  id?: string | null;
  scoringComponents: Array<ScoreComponentTypeInput>;
  scoringSidepots: Array<ScoreComponentTypeInput>;
  startDate: string;
};

export type ScoreComponentTypeInput = {
  friendlyName: string;
  id: string;
  isSidepot: boolean;
};

export type ModelRoomConditionInput = {
  and?: Array<ModelRoomConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelRoomConditionInput | null;
  or?: Array<ModelRoomConditionInput | null> | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateRoomInput = {
  id?: string | null;
  name: string;
};

export type ModelScoreConditionInput = {
  and?: Array<ModelScoreConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  not?: ModelScoreConditionInput | null;
  or?: Array<ModelScoreConditionInput | null> | null;
  score?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateScoreInput = {
  id?: string | null;
  judgeId: string;
  score: string;
  teamId: string;
};

export type ModelTeamConditionInput = {
  and?: Array<ModelTeamConditionInput | null> | null;
  approved?: ModelBooleanInput | null;
  createdAt?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelTeamConditionInput | null;
  or?: Array<ModelTeamConditionInput | null> | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateTeamInput = {
  approved?: boolean | null;
  id?: string | null;
  name: string;
};

export type ModelTeamRoomConditionInput = {
  and?: Array<ModelTeamRoomConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  not?: ModelTeamRoomConditionInput | null;
  or?: Array<ModelTeamRoomConditionInput | null> | null;
  roomId?: ModelIDInput | null;
  teamId?: ModelIDInput | null;
  time?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  zoomLink?: ModelStringInput | null;
};

export type CreateTeamRoomInput = {
  id?: string | null;
  roomId: string;
  teamId: string;
  time: string;
  zoomLink: string;
};

export type ModelUserConditionInput = {
  JUDGE_roomId?: ModelIDInput | null;
  allergies?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  checkedIn?: ModelBooleanInput | null;
  completedRegistration?: ModelBooleanInput | null;
  createdAt?: ModelStringInput | null;
  email?: ModelStringInput | null;
  firstName?: ModelStringInput | null;
  institution?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  not?: ModelUserConditionInput | null;
  or?: Array<ModelUserConditionInput | null> | null;
  profileOwner?: ModelStringInput | null;
  program?: ModelStringInput | null;
  role?: ModelStringInput | null;
  teamId?: ModelIDInput | null;
  updatedAt?: ModelStringInput | null;
  willEatMeals?: ModelBooleanInput | null;
};

export type CreateUserInput = {
  JUDGE_roomId?: string | null;
  allergies?: string | null;
  checkedIn?: boolean | null;
  completedRegistration?: boolean | null;
  email?: string | null;
  firstName?: string | null;
  id?: string | null;
  institution?: string | null;
  lastName?: string | null;
  profileOwner?: string | null;
  program?: string | null;
  role?: string | null;
  teamId?: string | null;
  willEatMeals?: boolean | null;
};

export type ModelUserFoodEventAttendanceConditionInput = {
  and?: Array<ModelUserFoodEventAttendanceConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  foodEventId?: ModelIDInput | null;
  not?: ModelUserFoodEventAttendanceConditionInput | null;
  or?: Array<ModelUserFoodEventAttendanceConditionInput | null> | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelIDInput | null;
};

export type CreateUserFoodEventAttendanceInput = {
  foodEventId?: string | null;
  id?: string | null;
  userId?: string | null;
};

export type DeleteFoodEventInput = {
  id: string;
};

export type DeleteHackathonInput = {
  id: string;
};

export type DeleteRoomInput = {
  id: string;
};

export type DeleteScoreInput = {
  judgeId: string;
  teamId: string;
};

export type DeleteTeamInput = {
  id: string;
};

export type DeleteTeamRoomInput = {
  id: string;
};

export type DeleteUserInput = {
  id: string;
};

export type DeleteUserFoodEventAttendanceInput = {
  id: string;
};

export type UpdateFoodEventInput = {
  description?: string | null;
  end?: string | null;
  id: string;
  name?: string | null;
  start?: string | null;
  totalGroupCount?: number | null;
};

export type UpdateHackathonInput = {
  endDate?: string | null;
  id: string;
  scoringComponents?: Array<ScoreComponentTypeInput> | null;
  scoringSidepots?: Array<ScoreComponentTypeInput> | null;
  startDate?: string | null;
};

export type UpdateRoomInput = {
  id: string;
  name?: string | null;
};

export type UpdateScoreInput = {
  id?: string | null;
  judgeId: string;
  score?: string | null;
  teamId: string;
};

export type UpdateTeamInput = {
  approved?: boolean | null;
  id: string;
  name?: string | null;
};

export type UpdateTeamRoomInput = {
  id: string;
  roomId?: string | null;
  teamId?: string | null;
  time?: string | null;
  zoomLink?: string | null;
};

export type UpdateUserInput = {
  JUDGE_roomId?: string | null;
  allergies?: string | null;
  checkedIn?: boolean | null;
  completedRegistration?: boolean | null;
  email?: string | null;
  firstName?: string | null;
  id: string;
  institution?: string | null;
  lastName?: string | null;
  profileOwner?: string | null;
  program?: string | null;
  role?: string | null;
  teamId?: string | null;
  willEatMeals?: boolean | null;
};

export type UpdateUserFoodEventAttendanceInput = {
  foodEventId?: string | null;
  id: string;
  userId?: string | null;
};

export type ModelSubscriptionFoodEventFilterInput = {
  and?: Array<ModelSubscriptionFoodEventFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  end?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionFoodEventFilterInput | null> | null;
  start?: ModelSubscriptionStringInput | null;
  totalGroupCount?: ModelSubscriptionIntInput | null;
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

export type ModelSubscriptionHackathonFilterInput = {
  and?: Array<ModelSubscriptionHackathonFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  endDate?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionHackathonFilterInput | null> | null;
  startDate?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionRoomFilterInput = {
  and?: Array<ModelSubscriptionRoomFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionRoomFilterInput | null> | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionScoreFilterInput = {
  and?: Array<ModelSubscriptionScoreFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  judgeId?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionScoreFilterInput | null> | null;
  score?: ModelSubscriptionStringInput | null;
  teamId?: ModelSubscriptionIDInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionTeamFilterInput = {
  and?: Array<ModelSubscriptionTeamFilterInput | null> | null;
  approved?: ModelSubscriptionBooleanInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionTeamFilterInput | null> | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null;
  ne?: boolean | null;
};

export type ModelSubscriptionTeamRoomFilterInput = {
  and?: Array<ModelSubscriptionTeamRoomFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionTeamRoomFilterInput | null> | null;
  roomId?: ModelSubscriptionIDInput | null;
  teamId?: ModelSubscriptionIDInput | null;
  time?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  zoomLink?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionUserFilterInput = {
  JUDGE_roomId?: ModelSubscriptionIDInput | null;
  allergies?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUserFilterInput | null> | null;
  checkedIn?: ModelSubscriptionBooleanInput | null;
  completedRegistration?: ModelSubscriptionBooleanInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  email?: ModelSubscriptionStringInput | null;
  firstName?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  institution?: ModelSubscriptionStringInput | null;
  lastName?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionUserFilterInput | null> | null;
  profileOwner?: ModelStringInput | null;
  program?: ModelSubscriptionStringInput | null;
  role?: ModelSubscriptionStringInput | null;
  teamId?: ModelSubscriptionIDInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  willEatMeals?: ModelSubscriptionBooleanInput | null;
};

export type ModelSubscriptionUserFoodEventAttendanceFilterInput = {
  and?: Array<ModelSubscriptionUserFoodEventAttendanceFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  foodEventId?: ModelSubscriptionIDInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionUserFoodEventAttendanceFilterInput | null> | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  userId?: ModelSubscriptionIDInput | null;
};

export type GetUserMessageCodeQueryVariables = {
  userMessage?: string | null;
};

export type GetUserMessageCodeQuery = {
  GetUserMessageCode?: {
    __typename: "GenericFunctionResponse";
    body?: string | null;
    headers?: string | null;
    statusCode?: number | null;
  } | null;
};

export type VerifyUserMessageQueryVariables = {
  userCode?: string | null;
};

export type VerifyUserMessageQuery = {
  VerifyUserMessage?: {
    __typename: "StatusCodeFunctionResponse";
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
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description: string;
    end: string;
    id: string;
    name: string;
    start: string;
    totalGroupCount: number;
    updatedAt: string;
  } | null;
};

export type GetHackathonQueryVariables = {
  id: string;
};

export type GetHackathonQuery = {
  getHackathon?: {
    __typename: "Hackathon";
    createdAt: string;
    endDate: string;
    id: string;
    scoringComponents: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    scoringSidepots: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    startDate: string;
    updatedAt: string;
  } | null;
};

export type GetRoomQueryVariables = {
  id: string;
};

export type GetRoomQuery = {
  getRoom?: {
    __typename: "Room";
    createdAt: string;
    id: string;
    judges?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    teamRoom?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type GetScoreQueryVariables = {
  judgeId: string;
  teamId: string;
};

export type GetScoreQuery = {
  getScore?: {
    __typename: "Score";
    createdAt: string;
    id?: string | null;
    judge?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    judgeId: string;
    score: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    updatedAt: string;
  } | null;
};

export type GetTeamQueryVariables = {
  id: string;
};

export type GetTeamQuery = {
  getTeam?: {
    __typename: "Team";
    approved?: boolean | null;
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    scores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    teamRooms?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type GetTeamRoomQueryVariables = {
  id: string;
};

export type GetTeamRoomQuery = {
  getTeamRoom?: {
    __typename: "TeamRoom";
    createdAt: string;
    id: string;
    room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    roomId: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    time: string;
    updatedAt: string;
    zoomLink: string;
  } | null;
};

export type GetUserQueryVariables = {
  id: string;
};

export type GetUserQuery = {
  getUser?: {
    __typename: "User";
    JUDGE_givenScores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    JUDGE_room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    JUDGE_roomId?: string | null;
    allergies?: string | null;
    attendedEvents?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    checkedIn?: boolean | null;
    completedRegistration?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    profileOwner?: string | null;
    program?: string | null;
    role?: string | null;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
    willEatMeals?: boolean | null;
  } | null;
};

export type GetUserFoodEventAttendanceQueryVariables = {
  id: string;
};

export type GetUserFoodEventAttendanceQuery = {
  getUserFoodEventAttendance?: {
    __typename: "UserFoodEventAttendance";
    createdAt: string;
    foodEvent?: {
      __typename: "FoodEvent";
      createdAt: string;
      description: string;
      end: string;
      id: string;
      name: string;
      start: string;
      totalGroupCount: number;
      updatedAt: string;
    } | null;
    foodEventId?: string | null;
    id: string;
    updatedAt: string;
    user?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    userId?: string | null;
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
      description: string;
      end: string;
      id: string;
      name: string;
      start: string;
      totalGroupCount: number;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListHackathonsQueryVariables = {
  filter?: ModelHackathonFilterInput | null;
  id?: string | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListHackathonsQuery = {
  listHackathons?: {
    __typename: "ModelHackathonConnection";
    items: Array<{
      __typename: "Hackathon";
      createdAt: string;
      endDate: string;
      id: string;
      startDate: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListRoomsQueryVariables = {
  filter?: ModelRoomFilterInput | null;
  id?: string | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListRoomsQuery = {
  listRooms?: {
    __typename: "ModelRoomConnection";
    items: Array<{
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListScoresQueryVariables = {
  filter?: ModelScoreFilterInput | null;
  judgeId?: ModelIDKeyConditionInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
  teamId?: string | null;
};

export type ListScoresQuery = {
  listScores?: {
    __typename: "ModelScoreConnection";
    items: Array<{
      __typename: "Score";
      createdAt: string;
      id?: string | null;
      judgeId: string;
      score: string;
      teamId: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListTeamRoomsQueryVariables = {
  filter?: ModelTeamRoomFilterInput | null;
  id?: string | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListTeamRoomsQuery = {
  listTeamRooms?: {
    __typename: "ModelTeamRoomConnection";
    items: Array<{
      __typename: "TeamRoom";
      createdAt: string;
      id: string;
      roomId: string;
      teamId: string;
      time: string;
      updatedAt: string;
      zoomLink: string;
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
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListUserFoodEventAttendancesQueryVariables = {
  filter?: ModelUserFoodEventAttendanceFilterInput | null;
  id?: string | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListUserFoodEventAttendancesQuery = {
  listUserFoodEventAttendances?: {
    __typename: "ModelUserFoodEventAttendanceConnection";
    items: Array<{
      __typename: "UserFoodEventAttendance";
      createdAt: string;
      foodEventId?: string | null;
      id: string;
      updatedAt: string;
      userId?: string | null;
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
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type AddUserToGroupMutationVariables = {
  groupName: string;
  userId: string;
};

export type AddUserToGroupMutation = {
  AddUserToGroup?: {
    __typename: "AddUserToGroupResponse";
    body?: string | null;
    headers?: string | null;
    statusCode?: number | null;
  } | null;
};

export type AssignUsersToTeamsMutationVariables = {
  teamId: string;
  userId: string;
};

export type AssignUsersToTeamsMutation = {
  AssignUsersToTeams?: {
    __typename: "GenericFunctionResponse";
    body?: string | null;
    headers?: string | null;
    statusCode?: number | null;
  } | null;
};

export type CreateTeamWithCodeMutationVariables = {
  addCallerToTeam: boolean;
  teamName: string;
};

export type CreateTeamWithCodeMutation = {
  CreateTeamWithCode?: {
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

export type ResetHackathonMutationVariables = {
  endDate: string;
  resetRooms: boolean;
  resetScores: boolean;
  resetTeams: boolean;
  resetUsers: boolean;
  safetyCheck: string;
  scoringComponents: string;
  scoringSidepots: string;
  startDate: string;
};

export type ResetHackathonMutation = {
  ResetHackathon?: {
    __typename: "StatusCodeFunctionResponse";
    headers?: string | null;
    statusCode?: number | null;
  } | null;
};

export type StartHackathonMutationVariables = {
  startDate: string;
  endDate: string;
};

export type StartHackathonMutation = {
  StartHackathon?: {
    __typename: "StatusCodeFunctionResponse";
    headers?: string | null;
    statusCode?: number | null;
  } | null;
};

export type ScheduleTeamsAndJudgesMutationVariables = {
  judgingSessionsPerTeam: number;
  numOfJudgingRooms: number;
  presentationDuration: number;
  startDateAndTime: string;
};

export type ScheduleTeamsAndJudgesMutation = {
  ScheduleTeamsAndJudges?: {
    __typename: "ScheduleTeamsAndJudgesResponse";
    body?: string | null;
    headers?: string | null;
    statusCode?: number | null;
  } | null;
};

export type SetUserAsCheckedInMutationVariables = {
  userId: string;
};

export type SetUserAsCheckedInMutation = {
  SetUserAsCheckedIn?: {
    __typename: "User";
    JUDGE_givenScores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    JUDGE_room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    JUDGE_roomId?: string | null;
    allergies?: string | null;
    attendedEvents?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    checkedIn?: boolean | null;
    completedRegistration?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    profileOwner?: string | null;
    program?: string | null;
    role?: string | null;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
    willEatMeals?: boolean | null;
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
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description: string;
    end: string;
    id: string;
    name: string;
    start: string;
    totalGroupCount: number;
    updatedAt: string;
  } | null;
};

export type CreateHackathonMutationVariables = {
  condition?: ModelHackathonConditionInput | null;
  input: CreateHackathonInput;
};

export type CreateHackathonMutation = {
  createHackathon?: {
    __typename: "Hackathon";
    createdAt: string;
    endDate: string;
    id: string;
    scoringComponents: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    scoringSidepots: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    startDate: string;
    updatedAt: string;
  } | null;
};

export type CreateRoomMutationVariables = {
  condition?: ModelRoomConditionInput | null;
  input: CreateRoomInput;
};

export type CreateRoomMutation = {
  createRoom?: {
    __typename: "Room";
    createdAt: string;
    id: string;
    judges?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    teamRoom?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type CreateScoreMutationVariables = {
  condition?: ModelScoreConditionInput | null;
  input: CreateScoreInput;
};

export type CreateScoreMutation = {
  createScore?: {
    __typename: "Score";
    createdAt: string;
    id?: string | null;
    judge?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    judgeId: string;
    score: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
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
    approved?: boolean | null;
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    scores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    teamRooms?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type CreateTeamRoomMutationVariables = {
  condition?: ModelTeamRoomConditionInput | null;
  input: CreateTeamRoomInput;
};

export type CreateTeamRoomMutation = {
  createTeamRoom?: {
    __typename: "TeamRoom";
    createdAt: string;
    id: string;
    room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    roomId: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    time: string;
    updatedAt: string;
    zoomLink: string;
  } | null;
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null;
  input: CreateUserInput;
};

export type CreateUserMutation = {
  createUser?: {
    __typename: "User";
    JUDGE_givenScores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    JUDGE_room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    JUDGE_roomId?: string | null;
    allergies?: string | null;
    attendedEvents?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    checkedIn?: boolean | null;
    completedRegistration?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    profileOwner?: string | null;
    program?: string | null;
    role?: string | null;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
    willEatMeals?: boolean | null;
  } | null;
};

export type CreateUserFoodEventAttendanceMutationVariables = {
  condition?: ModelUserFoodEventAttendanceConditionInput | null;
  input: CreateUserFoodEventAttendanceInput;
};

export type CreateUserFoodEventAttendanceMutation = {
  createUserFoodEventAttendance?: {
    __typename: "UserFoodEventAttendance";
    createdAt: string;
    foodEvent?: {
      __typename: "FoodEvent";
      createdAt: string;
      description: string;
      end: string;
      id: string;
      name: string;
      start: string;
      totalGroupCount: number;
      updatedAt: string;
    } | null;
    foodEventId?: string | null;
    id: string;
    updatedAt: string;
    user?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    userId?: string | null;
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
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description: string;
    end: string;
    id: string;
    name: string;
    start: string;
    totalGroupCount: number;
    updatedAt: string;
  } | null;
};

export type DeleteHackathonMutationVariables = {
  condition?: ModelHackathonConditionInput | null;
  input: DeleteHackathonInput;
};

export type DeleteHackathonMutation = {
  deleteHackathon?: {
    __typename: "Hackathon";
    createdAt: string;
    endDate: string;
    id: string;
    scoringComponents: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    scoringSidepots: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    startDate: string;
    updatedAt: string;
  } | null;
};

export type DeleteRoomMutationVariables = {
  condition?: ModelRoomConditionInput | null;
  input: DeleteRoomInput;
};

export type DeleteRoomMutation = {
  deleteRoom?: {
    __typename: "Room";
    createdAt: string;
    id: string;
    judges?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    teamRoom?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type DeleteScoreMutationVariables = {
  condition?: ModelScoreConditionInput | null;
  input: DeleteScoreInput;
};

export type DeleteScoreMutation = {
  deleteScore?: {
    __typename: "Score";
    createdAt: string;
    id?: string | null;
    judge?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    judgeId: string;
    score: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
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
    approved?: boolean | null;
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    scores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    teamRooms?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type DeleteTeamRoomMutationVariables = {
  condition?: ModelTeamRoomConditionInput | null;
  input: DeleteTeamRoomInput;
};

export type DeleteTeamRoomMutation = {
  deleteTeamRoom?: {
    __typename: "TeamRoom";
    createdAt: string;
    id: string;
    room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    roomId: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    time: string;
    updatedAt: string;
    zoomLink: string;
  } | null;
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null;
  input: DeleteUserInput;
};

export type DeleteUserMutation = {
  deleteUser?: {
    __typename: "User";
    JUDGE_givenScores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    JUDGE_room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    JUDGE_roomId?: string | null;
    allergies?: string | null;
    attendedEvents?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    checkedIn?: boolean | null;
    completedRegistration?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    profileOwner?: string | null;
    program?: string | null;
    role?: string | null;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
    willEatMeals?: boolean | null;
  } | null;
};

export type DeleteUserFoodEventAttendanceMutationVariables = {
  condition?: ModelUserFoodEventAttendanceConditionInput | null;
  input: DeleteUserFoodEventAttendanceInput;
};

export type DeleteUserFoodEventAttendanceMutation = {
  deleteUserFoodEventAttendance?: {
    __typename: "UserFoodEventAttendance";
    createdAt: string;
    foodEvent?: {
      __typename: "FoodEvent";
      createdAt: string;
      description: string;
      end: string;
      id: string;
      name: string;
      start: string;
      totalGroupCount: number;
      updatedAt: string;
    } | null;
    foodEventId?: string | null;
    id: string;
    updatedAt: string;
    user?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    userId?: string | null;
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
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description: string;
    end: string;
    id: string;
    name: string;
    start: string;
    totalGroupCount: number;
    updatedAt: string;
  } | null;
};

export type UpdateHackathonMutationVariables = {
  condition?: ModelHackathonConditionInput | null;
  input: UpdateHackathonInput;
};

export type UpdateHackathonMutation = {
  updateHackathon?: {
    __typename: "Hackathon";
    createdAt: string;
    endDate: string;
    id: string;
    scoringComponents: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    scoringSidepots: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    startDate: string;
    updatedAt: string;
  } | null;
};

export type UpdateRoomMutationVariables = {
  condition?: ModelRoomConditionInput | null;
  input: UpdateRoomInput;
};

export type UpdateRoomMutation = {
  updateRoom?: {
    __typename: "Room";
    createdAt: string;
    id: string;
    judges?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    teamRoom?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type UpdateScoreMutationVariables = {
  condition?: ModelScoreConditionInput | null;
  input: UpdateScoreInput;
};

export type UpdateScoreMutation = {
  updateScore?: {
    __typename: "Score";
    createdAt: string;
    id?: string | null;
    judge?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    judgeId: string;
    score: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
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
    approved?: boolean | null;
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    scores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    teamRooms?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type UpdateTeamRoomMutationVariables = {
  condition?: ModelTeamRoomConditionInput | null;
  input: UpdateTeamRoomInput;
};

export type UpdateTeamRoomMutation = {
  updateTeamRoom?: {
    __typename: "TeamRoom";
    createdAt: string;
    id: string;
    room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    roomId: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    time: string;
    updatedAt: string;
    zoomLink: string;
  } | null;
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null;
  input: UpdateUserInput;
};

export type UpdateUserMutation = {
  updateUser?: {
    __typename: "User";
    JUDGE_givenScores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    JUDGE_room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    JUDGE_roomId?: string | null;
    allergies?: string | null;
    attendedEvents?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    checkedIn?: boolean | null;
    completedRegistration?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    profileOwner?: string | null;
    program?: string | null;
    role?: string | null;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
    willEatMeals?: boolean | null;
  } | null;
};

export type UpdateUserFoodEventAttendanceMutationVariables = {
  condition?: ModelUserFoodEventAttendanceConditionInput | null;
  input: UpdateUserFoodEventAttendanceInput;
};

export type UpdateUserFoodEventAttendanceMutation = {
  updateUserFoodEventAttendance?: {
    __typename: "UserFoodEventAttendance";
    createdAt: string;
    foodEvent?: {
      __typename: "FoodEvent";
      createdAt: string;
      description: string;
      end: string;
      id: string;
      name: string;
      start: string;
      totalGroupCount: number;
      updatedAt: string;
    } | null;
    foodEventId?: string | null;
    id: string;
    updatedAt: string;
    user?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    userId?: string | null;
  } | null;
};

export type OnCreateFoodEventSubscriptionVariables = {
  filter?: ModelSubscriptionFoodEventFilterInput | null;
};

export type OnCreateFoodEventSubscription = {
  onCreateFoodEvent?: {
    __typename: "FoodEvent";
    attended?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description: string;
    end: string;
    id: string;
    name: string;
    start: string;
    totalGroupCount: number;
    updatedAt: string;
  } | null;
};

export type OnCreateHackathonSubscriptionVariables = {
  filter?: ModelSubscriptionHackathonFilterInput | null;
};

export type OnCreateHackathonSubscription = {
  onCreateHackathon?: {
    __typename: "Hackathon";
    createdAt: string;
    endDate: string;
    id: string;
    scoringComponents: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    scoringSidepots: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    startDate: string;
    updatedAt: string;
  } | null;
};

export type OnCreateRoomSubscriptionVariables = {
  filter?: ModelSubscriptionRoomFilterInput | null;
};

export type OnCreateRoomSubscription = {
  onCreateRoom?: {
    __typename: "Room";
    createdAt: string;
    id: string;
    judges?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    teamRoom?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type OnCreateScoreSubscriptionVariables = {
  filter?: ModelSubscriptionScoreFilterInput | null;
};

export type OnCreateScoreSubscription = {
  onCreateScore?: {
    __typename: "Score";
    createdAt: string;
    id?: string | null;
    judge?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    judgeId: string;
    score: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    updatedAt: string;
  } | null;
};

export type OnCreateTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null;
};

export type OnCreateTeamSubscription = {
  onCreateTeam?: {
    __typename: "Team";
    approved?: boolean | null;
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    scores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    teamRooms?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type OnCreateTeamRoomSubscriptionVariables = {
  filter?: ModelSubscriptionTeamRoomFilterInput | null;
};

export type OnCreateTeamRoomSubscription = {
  onCreateTeamRoom?: {
    __typename: "TeamRoom";
    createdAt: string;
    id: string;
    room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    roomId: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    time: string;
    updatedAt: string;
    zoomLink: string;
  } | null;
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  profileOwner?: string | null;
};

export type OnCreateUserSubscription = {
  onCreateUser?: {
    __typename: "User";
    JUDGE_givenScores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    JUDGE_room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    JUDGE_roomId?: string | null;
    allergies?: string | null;
    attendedEvents?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    checkedIn?: boolean | null;
    completedRegistration?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    profileOwner?: string | null;
    program?: string | null;
    role?: string | null;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
    willEatMeals?: boolean | null;
  } | null;
};

export type OnCreateUserFoodEventAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionUserFoodEventAttendanceFilterInput | null;
};

export type OnCreateUserFoodEventAttendanceSubscription = {
  onCreateUserFoodEventAttendance?: {
    __typename: "UserFoodEventAttendance";
    createdAt: string;
    foodEvent?: {
      __typename: "FoodEvent";
      createdAt: string;
      description: string;
      end: string;
      id: string;
      name: string;
      start: string;
      totalGroupCount: number;
      updatedAt: string;
    } | null;
    foodEventId?: string | null;
    id: string;
    updatedAt: string;
    user?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    userId?: string | null;
  } | null;
};

export type OnDeleteFoodEventSubscriptionVariables = {
  filter?: ModelSubscriptionFoodEventFilterInput | null;
};

export type OnDeleteFoodEventSubscription = {
  onDeleteFoodEvent?: {
    __typename: "FoodEvent";
    attended?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description: string;
    end: string;
    id: string;
    name: string;
    start: string;
    totalGroupCount: number;
    updatedAt: string;
  } | null;
};

export type OnDeleteHackathonSubscriptionVariables = {
  filter?: ModelSubscriptionHackathonFilterInput | null;
};

export type OnDeleteHackathonSubscription = {
  onDeleteHackathon?: {
    __typename: "Hackathon";
    createdAt: string;
    endDate: string;
    id: string;
    scoringComponents: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    scoringSidepots: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    startDate: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteRoomSubscriptionVariables = {
  filter?: ModelSubscriptionRoomFilterInput | null;
};

export type OnDeleteRoomSubscription = {
  onDeleteRoom?: {
    __typename: "Room";
    createdAt: string;
    id: string;
    judges?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    teamRoom?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteScoreSubscriptionVariables = {
  filter?: ModelSubscriptionScoreFilterInput | null;
};

export type OnDeleteScoreSubscription = {
  onDeleteScore?: {
    __typename: "Score";
    createdAt: string;
    id?: string | null;
    judge?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    judgeId: string;
    score: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null;
};

export type OnDeleteTeamSubscription = {
  onDeleteTeam?: {
    __typename: "Team";
    approved?: boolean | null;
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    scores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    teamRooms?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteTeamRoomSubscriptionVariables = {
  filter?: ModelSubscriptionTeamRoomFilterInput | null;
};

export type OnDeleteTeamRoomSubscription = {
  onDeleteTeamRoom?: {
    __typename: "TeamRoom";
    createdAt: string;
    id: string;
    room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    roomId: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    time: string;
    updatedAt: string;
    zoomLink: string;
  } | null;
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  profileOwner?: string | null;
};

export type OnDeleteUserSubscription = {
  onDeleteUser?: {
    __typename: "User";
    JUDGE_givenScores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    JUDGE_room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    JUDGE_roomId?: string | null;
    allergies?: string | null;
    attendedEvents?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    checkedIn?: boolean | null;
    completedRegistration?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    profileOwner?: string | null;
    program?: string | null;
    role?: string | null;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
    willEatMeals?: boolean | null;
  } | null;
};

export type OnDeleteUserFoodEventAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionUserFoodEventAttendanceFilterInput | null;
};

export type OnDeleteUserFoodEventAttendanceSubscription = {
  onDeleteUserFoodEventAttendance?: {
    __typename: "UserFoodEventAttendance";
    createdAt: string;
    foodEvent?: {
      __typename: "FoodEvent";
      createdAt: string;
      description: string;
      end: string;
      id: string;
      name: string;
      start: string;
      totalGroupCount: number;
      updatedAt: string;
    } | null;
    foodEventId?: string | null;
    id: string;
    updatedAt: string;
    user?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    userId?: string | null;
  } | null;
};

export type OnUpdateFoodEventSubscriptionVariables = {
  filter?: ModelSubscriptionFoodEventFilterInput | null;
};

export type OnUpdateFoodEventSubscription = {
  onUpdateFoodEvent?: {
    __typename: "FoodEvent";
    attended?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    description: string;
    end: string;
    id: string;
    name: string;
    start: string;
    totalGroupCount: number;
    updatedAt: string;
  } | null;
};

export type OnUpdateHackathonSubscriptionVariables = {
  filter?: ModelSubscriptionHackathonFilterInput | null;
};

export type OnUpdateHackathonSubscription = {
  onUpdateHackathon?: {
    __typename: "Hackathon";
    createdAt: string;
    endDate: string;
    id: string;
    scoringComponents: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    scoringSidepots: Array<{
      __typename: "ScoreComponentType";
      friendlyName: string;
      id: string;
      isSidepot: boolean;
    }>;
    startDate: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateRoomSubscriptionVariables = {
  filter?: ModelSubscriptionRoomFilterInput | null;
};

export type OnUpdateRoomSubscription = {
  onUpdateRoom?: {
    __typename: "Room";
    createdAt: string;
    id: string;
    judges?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    teamRoom?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateScoreSubscriptionVariables = {
  filter?: ModelSubscriptionScoreFilterInput | null;
};

export type OnUpdateScoreSubscription = {
  onUpdateScore?: {
    __typename: "Score";
    createdAt: string;
    id?: string | null;
    judge?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    judgeId: string;
    score: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null;
};

export type OnUpdateTeamSubscription = {
  onUpdateTeam?: {
    __typename: "Team";
    approved?: boolean | null;
    createdAt: string;
    id: string;
    members?: {
      __typename: "ModelUserConnection";
      nextToken?: string | null;
    } | null;
    name: string;
    scores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    teamRooms?: {
      __typename: "ModelTeamRoomConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateTeamRoomSubscriptionVariables = {
  filter?: ModelSubscriptionTeamRoomFilterInput | null;
};

export type OnUpdateTeamRoomSubscription = {
  onUpdateTeamRoom?: {
    __typename: "TeamRoom";
    createdAt: string;
    id: string;
    room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    roomId: string;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId: string;
    time: string;
    updatedAt: string;
    zoomLink: string;
  } | null;
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  profileOwner?: string | null;
};

export type OnUpdateUserSubscription = {
  onUpdateUser?: {
    __typename: "User";
    JUDGE_givenScores?: {
      __typename: "ModelScoreConnection";
      nextToken?: string | null;
    } | null;
    JUDGE_room?: {
      __typename: "Room";
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    JUDGE_roomId?: string | null;
    allergies?: string | null;
    attendedEvents?: {
      __typename: "ModelUserFoodEventAttendanceConnection";
      nextToken?: string | null;
    } | null;
    checkedIn?: boolean | null;
    completedRegistration?: boolean | null;
    createdAt: string;
    email?: string | null;
    firstName?: string | null;
    id: string;
    institution?: string | null;
    lastName?: string | null;
    profileOwner?: string | null;
    program?: string | null;
    role?: string | null;
    team?: {
      __typename: "Team";
      approved?: boolean | null;
      createdAt: string;
      id: string;
      name: string;
      updatedAt: string;
    } | null;
    teamId?: string | null;
    updatedAt: string;
    willEatMeals?: boolean | null;
  } | null;
};

export type OnUpdateUserFoodEventAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionUserFoodEventAttendanceFilterInput | null;
};

export type OnUpdateUserFoodEventAttendanceSubscription = {
  onUpdateUserFoodEventAttendance?: {
    __typename: "UserFoodEventAttendance";
    createdAt: string;
    foodEvent?: {
      __typename: "FoodEvent";
      createdAt: string;
      description: string;
      end: string;
      id: string;
      name: string;
      start: string;
      totalGroupCount: number;
      updatedAt: string;
    } | null;
    foodEventId?: string | null;
    id: string;
    updatedAt: string;
    user?: {
      __typename: "User";
      JUDGE_roomId?: string | null;
      allergies?: string | null;
      checkedIn?: boolean | null;
      completedRegistration?: boolean | null;
      createdAt: string;
      email?: string | null;
      firstName?: string | null;
      id: string;
      institution?: string | null;
      lastName?: string | null;
      profileOwner?: string | null;
      program?: string | null;
      role?: string | null;
      teamId?: string | null;
      updatedAt: string;
      willEatMeals?: boolean | null;
    } | null;
    userId?: string | null;
  } | null;
};
