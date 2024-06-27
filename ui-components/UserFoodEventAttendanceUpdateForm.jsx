/* eslint-disable */
"use client";

import { generateClient } from "aws-amplify/api";
import * as React from "react";

import { Button, Flex, Grid } from "@aws-amplify/ui-react";

import { updateUserFoodEventAttendance } from "./graphql/mutations";
import { getUserFoodEventAttendance } from "./graphql/queries";
import { fetchByPath, getOverrideProps, validateField } from "./utils";

/* eslint-disable */

const client = generateClient();
export default function UserFoodEventAttendanceUpdateForm(props) {
  const {
    id: idProp,
    userFoodEventAttendance: userFoodEventAttendanceModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {};
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userFoodEventAttendanceRecord
      ? { ...initialValues, ...userFoodEventAttendanceRecord }
      : initialValues;
    setErrors({});
  };
  const [userFoodEventAttendanceRecord, setUserFoodEventAttendanceRecord] =
    React.useState(userFoodEventAttendanceModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUserFoodEventAttendance.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUserFoodEventAttendance
        : userFoodEventAttendanceModelProp;
      setUserFoodEventAttendanceRecord(record);
    };
    queryData();
  }, [idProp, userFoodEventAttendanceModelProp]);
  React.useEffect(resetStateValues, [userFoodEventAttendanceRecord]);
  const validations = {};
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue,
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {};
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item),
                ),
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName]),
            );
            return promises;
          }, []),
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateUserFoodEventAttendance.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userFoodEventAttendanceRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserFoodEventAttendanceUpdateForm")}
      {...rest}
    >
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || userFoodEventAttendanceModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || userFoodEventAttendanceModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
