/* eslint-disable */
"use client";

import { generateClient } from "aws-amplify/api";
import * as React from "react";

import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";

import { updateFoodEvent } from "./graphql/mutations";
import { getFoodEvent } from "./graphql/queries";
import { fetchByPath, getOverrideProps, validateField } from "./utils";

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

const client = generateClient();
export default function FoodEventUpdateForm(props) {
  const {
    id: idProp,
    foodEvent: foodEventModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Name: "",
    Description: "",
    Start: "",
    End: "",
    Groups: "",
    owner: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Description, setDescription] = React.useState(
    initialValues.Description,
  );
  const [Start, setStart] = React.useState(initialValues.Start);
  const [End, setEnd] = React.useState(initialValues.End);
  const [Groups, setGroups] = React.useState(initialValues.Groups);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = foodEventRecord
      ? { ...initialValues, ...foodEventRecord }
      : initialValues;
    setName(cleanValues.Name);
    setDescription(cleanValues.Description);
    setStart(cleanValues.Start);
    setEnd(cleanValues.End);
    setGroups(cleanValues.Groups);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [foodEventRecord, setFoodEventRecord] =
    React.useState(foodEventModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getFoodEvent.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getFoodEvent
        : foodEventModelProp;
      setFoodEventRecord(record);
    };
    queryData();
  }, [idProp, foodEventModelProp]);
  React.useEffect(resetStateValues, [foodEventRecord]);
  const validations = {
    Name: [],
    Description: [],
    Start: [],
    End: [],
    Groups: [],
    owner: [],
  };
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Name: Name ?? null,
          Description: Description ?? null,
          Start: Start ?? null,
          End: End ?? null,
          Groups: Groups ?? null,
          owner: owner ?? null,
        };
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
            query: updateFoodEvent.replaceAll("__typename", ""),
            variables: {
              input: {
                id: foodEventRecord.id,
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
      {...getOverrideProps(overrides, "FoodEventUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name: value,
              Description,
              Start,
              End,
              Groups,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.Name ?? value;
          }
          if (errors.Name?.hasError) {
            runValidationTasks("Name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("Name", Name)}
        errorMessage={errors.Name?.errorMessage}
        hasError={errors.Name?.hasError}
        {...getOverrideProps(overrides, "Name")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={Description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Description: value,
              Start,
              End,
              Groups,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.Description ?? value;
          }
          if (errors.Description?.hasError) {
            runValidationTasks("Description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("Description", Description)}
        errorMessage={errors.Description?.errorMessage}
        hasError={errors.Description?.hasError}
        {...getOverrideProps(overrides, "Description")}
      ></TextField>
      <TextField
        label="Start"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={Start && convertToLocal(new Date(Start))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Start: value,
              End,
              Groups,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.Start ?? value;
          }
          if (errors.Start?.hasError) {
            runValidationTasks("Start", value);
          }
          setStart(value);
        }}
        onBlur={() => runValidationTasks("Start", Start)}
        errorMessage={errors.Start?.errorMessage}
        hasError={errors.Start?.hasError}
        {...getOverrideProps(overrides, "Start")}
      ></TextField>
      <TextField
        label="End"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={End && convertToLocal(new Date(End))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Start,
              End: value,
              Groups,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.End ?? value;
          }
          if (errors.End?.hasError) {
            runValidationTasks("End", value);
          }
          setEnd(value);
        }}
        onBlur={() => runValidationTasks("End", End)}
        errorMessage={errors.End?.errorMessage}
        hasError={errors.End?.hasError}
        {...getOverrideProps(overrides, "End")}
      ></TextField>
      <TextField
        label="Groups"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Groups}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Start,
              End,
              Groups: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.Groups ?? value;
          }
          if (errors.Groups?.hasError) {
            runValidationTasks("Groups", value);
          }
          setGroups(value);
        }}
        onBlur={() => runValidationTasks("Groups", Groups)}
        errorMessage={errors.Groups?.errorMessage}
        hasError={errors.Groups?.hasError}
        {...getOverrideProps(overrides, "Groups")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Start,
              End,
              Groups,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
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
          isDisabled={!(idProp || foodEventModelProp)}
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
              !(idProp || foodEventModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
