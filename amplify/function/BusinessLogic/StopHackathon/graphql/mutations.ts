/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten

type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const updateHackathon = /* GraphQL */ `
  mutation UpdateHackathon(
    $input: UpdateHackathonInput!
    $condition: ModelHackathonConditionInput
  ) {
    updateHackathon(input: $input, condition: $condition) {
      id
      startDate
      endDate
      scoringComponents {
        id
        friendlyName
        isSidepot
        __typename
      }
      scoringSidepots {
        id
        friendlyName
        isSidepot
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
