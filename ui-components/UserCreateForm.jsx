/* eslint-disable */
"use client";

import { generateClient } from "aws-amplify/api";
import * as React from "react";

import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";

import { createUser } from "./graphql/mutations";
import { fetchByPath, getOverrideProps, validateField } from "./utils";

/* eslint-disable */

/* eslint-disable */

const client = generateClient();
export default function UserCreateForm(props) {
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
    firstName: "",
    lastName: "",
    email: "",
    meals: false,
    institution: "",
    allergies: "",
    checkedIn: false,
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [meals, setMeals] = React.useState(initialValues.meals);
  const [institution, setInstitution] = React.useState(
    initialValues.institution,
  );
  const [allergies, setAllergies] = React.useState(initialValues.allergies);
  const [checkedIn, setCheckedIn] = React.useState(initialValues.checkedIn);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setEmail(initialValues.email);
    setMeals(initialValues.meals);
    setInstitution(initialValues.institution);
    setAllergies(initialValues.allergies);
    setCheckedIn(initialValues.checkedIn);
    setErrors({});
  };
  const validations = {
    firstName: [],
    lastName: [],
    email: [],
    meals: [],
    institution: [],
    allergies: [],
    checkedIn: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          firstName,
          lastName,
          email,
          meals,
          institution,
          allergies,
          checkedIn,
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
            query: createUser.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              email,
              meals,
              institution,
              allergies,
              checkedIn,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              email,
              meals,
              institution,
              allergies,
              checkedIn,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email: value,
              meals,
              institution,
              allergies,
              checkedIn,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <SwitchField
        label="Meals"
        defaultChecked={false}
        isDisabled={false}
        isChecked={meals}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              meals: value,
              institution,
              allergies,
              checkedIn,
            };
            const result = onChange(modelFields);
            value = result?.meals ?? value;
          }
          if (errors.meals?.hasError) {
            runValidationTasks("meals", value);
          }
          setMeals(value);
        }}
        onBlur={() => runValidationTasks("meals", meals)}
        errorMessage={errors.meals?.errorMessage}
        hasError={errors.meals?.hasError}
        {...getOverrideProps(overrides, "meals")}
      ></SwitchField>
      <TextField
        label="Institution"
        isRequired={false}
        isReadOnly={false}
        value={institution}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              meals,
              institution: value,
              allergies,
              checkedIn,
            };
            const result = onChange(modelFields);
            value = result?.institution ?? value;
          }
          if (errors.institution?.hasError) {
            runValidationTasks("institution", value);
          }
          setInstitution(value);
        }}
        onBlur={() => runValidationTasks("institution", institution)}
        errorMessage={errors.institution?.errorMessage}
        hasError={errors.institution?.hasError}
        {...getOverrideProps(overrides, "institution")}
      ></TextField>
      <TextField
        label="Allergies"
        isRequired={false}
        isReadOnly={false}
        value={allergies}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              meals,
              institution,
              allergies: value,
              checkedIn,
            };
            const result = onChange(modelFields);
            value = result?.allergies ?? value;
          }
          if (errors.allergies?.hasError) {
            runValidationTasks("allergies", value);
          }
          setAllergies(value);
        }}
        onBlur={() => runValidationTasks("allergies", allergies)}
        errorMessage={errors.allergies?.errorMessage}
        hasError={errors.allergies?.hasError}
        {...getOverrideProps(overrides, "allergies")}
      ></TextField>
      <SwitchField
        label="Checked in"
        defaultChecked={false}
        isDisabled={false}
        isChecked={checkedIn}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              meals,
              institution,
              allergies,
              checkedIn: value,
            };
            const result = onChange(modelFields);
            value = result?.checkedIn ?? value;
          }
          if (errors.checkedIn?.hasError) {
            runValidationTasks("checkedIn", value);
          }
          setCheckedIn(value);
        }}
        onBlur={() => runValidationTasks("checkedIn", checkedIn)}
        errorMessage={errors.checkedIn?.errorMessage}
        hasError={errors.checkedIn?.hasError}
        {...getOverrideProps(overrides, "checkedIn")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
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
  );
}
