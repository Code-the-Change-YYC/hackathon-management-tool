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

import { updateUser } from "./graphql/mutations";
import { getUser } from "./graphql/queries";
import { fetchByPath, getOverrideProps, validateField } from "./utils";

/* eslint-disable */

/* eslint-disable */

const client = generateClient();
export default function UserUpdateForm(props) {
  const {
    id: idProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    FirstName: "",
    LastName: "",
    Email: "",
    Institution: "",
    Allergies: "",
    CheckedIn: false,
    owner: "",
  };
  const [FirstName, setFirstName] = React.useState(initialValues.FirstName);
  const [LastName, setLastName] = React.useState(initialValues.LastName);
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [Institution, setInstitution] = React.useState(
    initialValues.Institution,
  );
  const [Allergies, setAllergies] = React.useState(initialValues.Allergies);
  const [CheckedIn, setCheckedIn] = React.useState(initialValues.CheckedIn);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setFirstName(cleanValues.FirstName);
    setLastName(cleanValues.LastName);
    setEmail(cleanValues.Email);
    setInstitution(cleanValues.Institution);
    setAllergies(cleanValues.Allergies);
    setCheckedIn(cleanValues.CheckedIn);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUser.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUser
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const validations = {
    FirstName: [],
    LastName: [],
    Email: [],
    Institution: [],
    Allergies: [],
    CheckedIn: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          FirstName: FirstName ?? null,
          LastName: LastName ?? null,
          Email: Email ?? null,
          Institution: Institution ?? null,
          Allergies: Allergies ?? null,
          CheckedIn: CheckedIn ?? null,
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
            query: updateUser.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userRecord.id,
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
      {...getOverrideProps(overrides, "UserUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={FirstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              FirstName: value,
              LastName,
              Email,
              Institution,
              Allergies,
              CheckedIn,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.FirstName ?? value;
          }
          if (errors.FirstName?.hasError) {
            runValidationTasks("FirstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("FirstName", FirstName)}
        errorMessage={errors.FirstName?.errorMessage}
        hasError={errors.FirstName?.hasError}
        {...getOverrideProps(overrides, "FirstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={LastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              FirstName,
              LastName: value,
              Email,
              Institution,
              Allergies,
              CheckedIn,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.LastName ?? value;
          }
          if (errors.LastName?.hasError) {
            runValidationTasks("LastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("LastName", LastName)}
        errorMessage={errors.LastName?.errorMessage}
        hasError={errors.LastName?.hasError}
        {...getOverrideProps(overrides, "LastName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={Email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              FirstName,
              LastName,
              Email: value,
              Institution,
              Allergies,
              CheckedIn,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.Email ?? value;
          }
          if (errors.Email?.hasError) {
            runValidationTasks("Email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("Email", Email)}
        errorMessage={errors.Email?.errorMessage}
        hasError={errors.Email?.hasError}
        {...getOverrideProps(overrides, "Email")}
      ></TextField>
      <TextField
        label="Institution"
        isRequired={false}
        isReadOnly={false}
        value={Institution}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              FirstName,
              LastName,
              Email,
              Institution: value,
              Allergies,
              CheckedIn,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.Institution ?? value;
          }
          if (errors.Institution?.hasError) {
            runValidationTasks("Institution", value);
          }
          setInstitution(value);
        }}
        onBlur={() => runValidationTasks("Institution", Institution)}
        errorMessage={errors.Institution?.errorMessage}
        hasError={errors.Institution?.hasError}
        {...getOverrideProps(overrides, "Institution")}
      ></TextField>
      <TextField
        label="Allergies"
        isRequired={false}
        isReadOnly={false}
        value={Allergies}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              FirstName,
              LastName,
              Email,
              Institution,
              Allergies: value,
              CheckedIn,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.Allergies ?? value;
          }
          if (errors.Allergies?.hasError) {
            runValidationTasks("Allergies", value);
          }
          setAllergies(value);
        }}
        onBlur={() => runValidationTasks("Allergies", Allergies)}
        errorMessage={errors.Allergies?.errorMessage}
        hasError={errors.Allergies?.hasError}
        {...getOverrideProps(overrides, "Allergies")}
      ></TextField>
      <SwitchField
        label="Checked in"
        defaultChecked={false}
        isDisabled={false}
        isChecked={CheckedIn}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              FirstName,
              LastName,
              Email,
              Institution,
              Allergies,
              CheckedIn: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.CheckedIn ?? value;
          }
          if (errors.CheckedIn?.hasError) {
            runValidationTasks("CheckedIn", value);
          }
          setCheckedIn(value);
        }}
        onBlur={() => runValidationTasks("CheckedIn", CheckedIn)}
        errorMessage={errors.CheckedIn?.errorMessage}
        hasError={errors.CheckedIn?.hasError}
        {...getOverrideProps(overrides, "CheckedIn")}
      ></SwitchField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              FirstName,
              LastName,
              Email,
              Institution,
              Allergies,
              CheckedIn,
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
          isDisabled={!(idProp || userModelProp)}
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
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
