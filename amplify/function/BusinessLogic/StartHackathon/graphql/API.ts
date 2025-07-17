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

export type ScoreComponentTypeInput = {
  friendlyName: string;
  id: string;
  isSidepot: boolean;
};

export type ModelHackathonFilterInput = {
  and?: Array<ModelHackathonFilterInput | null> | null;
  endDate?: ModelStringInput | null;
  id?: ModelIDInput | null;
  not?: ModelHackathonFilterInput | null;
  or?: Array<ModelHackathonFilterInput | null> | null;
  startDate?: ModelStringInput | null;
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

export type ModelSizeInput = {
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
};

export type CreateHackathonInput = {
  endDate: string;
  id: string;
  scoringComponents: Array<ScoreComponentTypeInput>;
  scoringSidepots: Array<ScoreComponentTypeInput>;
  startDate: string;
};

export type ModelHackathonConditionInput = {
  and?: Array<ModelHackathonConditionInput | null> | null;
  endDate?: ModelStringInput | null;
  not?: ModelHackathonConditionInput | null;
  or?: Array<ModelHackathonConditionInput | null> | null;
  startDate?: ModelStringInput | null;
};

export type UpdateHackathonInput = {
  endDate?: string | null;
  id: string;
  scoringComponents?: Array<ScoreComponentTypeInput> | null;
  scoringSidepots?: Array<ScoreComponentTypeInput> | null;
  startDate?: string | null;
};
