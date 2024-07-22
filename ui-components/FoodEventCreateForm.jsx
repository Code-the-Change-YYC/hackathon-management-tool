/* eslint-disable */
"use client";

import { generateClient } from "aws-amplify/api";
import * as React from "react";

import {
  Button,
  Flex,
  Grid,
  TextField,
  Theme,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { createFoodEvent } from "./graphql/mutations";
import "./styles.css";
import { fetchByPath, getOverrideProps, validateField } from "./utils";

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

const client = generateClient();
export default function FoodEventCreateForm(props) {
  const theme = {
    name: "create-food-ticket-theme",
    tokens: {
      components: {
        button: {
          primary: {
            backgroundColor: { value: "#A689FF" },
            _hover: {
              backgroundColor: { value: "#7055FD" },
            },
          },
        },
        // textfield: {
        //   borderColor: { value: "#A689FF" },
        //   _focus: {
        //     borderColor: { value: "#7055FD" },
        //   },
        // },
      },
    },
  };

  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    description: "",
    start: "",
    end: "",
    totalGroupCount: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description,
  );
  const [start, setStart] = React.useState(initialValues.start);
  const [end, setEnd] = React.useState(initialValues.end);
  const [totalGroupCount, setTotalGroupCount] = React.useState(
    initialValues.totalGroupCount,
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setDescription(initialValues.description);
    setStart(initialValues.start);
    setEnd(initialValues.end);
    setTotalGroupCount(initialValues.totalGroupCount);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    description: [{ type: "Required" }],
    start: [{ type: "Required" }],
    end: [{ type: "Required" }],
    totalGroupCount: [{ type: "Required" }],
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
    <ThemeProvider theme={theme}>
      <Grid
        as="form"
        rowGap="15px"
        columnGap="15px"
        padding="20px"
        onSubmit={async (event) => {
          event.preventDefault();
          let modelFields = {
            name,
            description,
            start,
            end,
            totalGroupCount,
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
              query: createFoodEvent.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFields,
                },
              },
            });
            if (onSuccess) {
              onSuccess(modelFields);
            }
            if (clearOnSuccess) {
              resetStateValues();
            }
          } catch (err) {
            if (onError) {
              const messages = err.errors.map((e) => e.message).join("\n");
              onError(modelFields, messages);
            }
          }
        }}
        {...getOverrideProps(overrides, "FoodEventCreateForm")}
        {...rest}
      >
        <TextField
          label="Name"
          fontWeight="bold"
          inputStyles={{
            borderWidth: "medium",
            borderColor: "#A689FF",
            _focus: "#7055FD",
          }}
          isRequired={true}
          isReadOnly={false}
          value={name}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                name: value,
                description,
                start,
                end,
                totalGroupCount,
              };
              const result = onChange(modelFields);
              value = result?.name ?? value;
            }
            if (errors.name?.hasError) {
              runValidationTasks("name", value);
            }
            setName(value);
          }}
          onBlur={() => runValidationTasks("name", name)}
          errorMessage={errors.name?.errorMessage}
          hasError={errors.name?.hasError}
          {...getOverrideProps(overrides, "name")}
        ></TextField>
        <TextField
          label="Description"
          fontWeight="bold"
          inputStyles={{
            borderWidth: "medium",
            borderColor: "#A689FF",
            _focus: "#7055FD",
          }}
          isRequired={true}
          isReadOnly={false}
          value={description}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                name,
                description: value,
                start,
                end,
                totalGroupCount,
              };
              const result = onChange(modelFields);
              value = result?.description ?? value;
            }
            if (errors.description?.hasError) {
              runValidationTasks("description", value);
            }
            setDescription(value);
          }}
          onBlur={() => runValidationTasks("description", description)}
          errorMessage={errors.description?.errorMessage}
          hasError={errors.description?.hasError}
          {...getOverrideProps(overrides, "description")}
        ></TextField>
        <TextField
          label="Start"
          fontWeight="bold"
          inputStyles={{
            borderWidth: "medium",
            borderColor: "#A689FF",
            _focus: "#7055FD",
          }}
          isRequired={true}
          isReadOnly={false}
          type="datetime-local"
          value={start && convertToLocal(new Date(start))}
          onChange={(e) => {
            let value =
              e.target.value === ""
                ? ""
                : new Date(e.target.value).toISOString();
            if (onChange) {
              const modelFields = {
                name,
                description,
                start: value,
                end,
                totalGroupCount,
              };
              const result = onChange(modelFields);
              value = result?.start ?? value;
            }
            if (errors.start?.hasError) {
              runValidationTasks("start", value);
            }
            setStart(value);
          }}
          onBlur={() => runValidationTasks("start", start)}
          errorMessage={errors.start?.errorMessage}
          hasError={errors.start?.hasError}
          {...getOverrideProps(overrides, "start")}
        ></TextField>
        <TextField
          label="End"
          fontWeight="bold"
          inputStyles={{
            borderWidth: "medium",
            borderColor: "#A689FF",
            _focus: "#7055FD",
          }}
          isRequired={true}
          isReadOnly={false}
          type="datetime-local"
          value={end && convertToLocal(new Date(end))}
          onChange={(e) => {
            let value =
              e.target.value === ""
                ? ""
                : new Date(e.target.value).toISOString();
            if (onChange) {
              const modelFields = {
                name,
                description,
                start,
                end: value,
                totalGroupCount,
              };
              const result = onChange(modelFields);
              value = result?.end ?? value;
            }
            if (errors.end?.hasError) {
              runValidationTasks("end", value);
            }
            setEnd(value);
          }}
          onBlur={() => runValidationTasks("end", end)}
          errorMessage={errors.end?.errorMessage}
          hasError={errors.end?.hasError}
          {...getOverrideProps(overrides, "end")}
        ></TextField>
        <TextField
          label="Total group count"
          fontWeight="bold"
          inputStyles={{
            borderWidth: "medium",
            borderColor: "#A689FF",
            _focus: "#7055FD",
          }}
          isRequired={true}
          isReadOnly={false}
          type="number"
          step="any"
          value={totalGroupCount}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (onChange) {
              const modelFields = {
                name,
                description,
                start,
                end,
                totalGroupCount: value,
              };
              const result = onChange(modelFields);
              value = result?.totalGroupCount ?? value;
            }
            if (errors.totalGroupCount?.hasError) {
              runValidationTasks("totalGroupCount", value);
            }
            setTotalGroupCount(value);
          }}
          onBlur={() => runValidationTasks("totalGroupCount", totalGroupCount)}
          errorMessage={errors.totalGroupCount?.errorMessage}
          hasError={errors.totalGroupCount?.hasError}
          {...getOverrideProps(overrides, "totalGroupCount")}
        ></TextField>
        <Flex
          justifyContent="space-between"
          {...getOverrideProps(overrides, "CTAFlex")}
        >
          <Button
            children="Clear"
            type="reset"
            className="clear-button"
            onClick={(event) => {
              event.preventDefault();
              resetStateValues();
            }}
            {...getOverrideProps(overrides, "ClearButton")}
          ></Button>
          <Flex
            gap="15px"
            {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
          >
            <Button
              children="Submit"
              type="submit"
              variation="primary"
              isDisabled={Object.values(errors).some((e) => e?.hasError)}
              {...getOverrideProps(overrides, "SubmitButton")}
            ></Button>
          </Flex>
        </Flex>
      </Grid>
    </ThemeProvider>
  );
}
