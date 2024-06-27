/* eslint-disable */
"use client";

import { generateClient } from "aws-amplify/api";
import * as React from "react";

import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";

import { updateTeamRoom } from "./graphql/mutations";
import { getTeamRoom } from "./graphql/queries";
import { fetchByPath, getOverrideProps, validateField } from "./utils";

/* eslint-disable */

const client = generateClient();
export default function TeamRoomUpdateForm(props) {
  const {
    id: idProp,
    teamRoom: teamRoomModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    time: "",
    zoomLink: "",
  };
  const [time, setTime] = React.useState(initialValues.time);
  const [zoomLink, setZoomLink] = React.useState(initialValues.zoomLink);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = teamRoomRecord
      ? { ...initialValues, ...teamRoomRecord }
      : initialValues;
    setTime(cleanValues.time);
    setZoomLink(cleanValues.zoomLink);
    setErrors({});
  };
  const [teamRoomRecord, setTeamRoomRecord] = React.useState(teamRoomModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTeamRoom.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTeamRoom
        : teamRoomModelProp;
      setTeamRoomRecord(record);
    };
    queryData();
  }, [idProp, teamRoomModelProp]);
  React.useEffect(resetStateValues, [teamRoomRecord]);
  const validations = {
    time: [{ type: "Required" }],
    zoomLink: [{ type: "Required" }],
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
          time,
          zoomLink,
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
            query: updateTeamRoom.replaceAll("__typename", ""),
            variables: {
              input: {
                id: teamRoomRecord.id,
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
      {...getOverrideProps(overrides, "TeamRoomUpdateForm")}
      {...rest}
    >
      <TextField
        label="Time"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={time && convertToLocal(new Date(time))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              time: value,
              zoomLink,
            };
            const result = onChange(modelFields);
            value = result?.time ?? value;
          }
          if (errors.time?.hasError) {
            runValidationTasks("time", value);
          }
          setTime(value);
        }}
        onBlur={() => runValidationTasks("time", time)}
        errorMessage={errors.time?.errorMessage}
        hasError={errors.time?.hasError}
        {...getOverrideProps(overrides, "time")}
      ></TextField>
      <TextField
        label="Zoom link"
        isRequired={true}
        isReadOnly={false}
        value={zoomLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              time,
              zoomLink: value,
            };
            const result = onChange(modelFields);
            value = result?.zoomLink ?? value;
          }
          if (errors.zoomLink?.hasError) {
            runValidationTasks("zoomLink", value);
          }
          setZoomLink(value);
        }}
        onBlur={() => runValidationTasks("zoomLink", zoomLink)}
        errorMessage={errors.zoomLink?.errorMessage}
        hasError={errors.zoomLink?.hasError}
        {...getOverrideProps(overrides, "zoomLink")}
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
          isDisabled={!(idProp || teamRoomModelProp)}
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
              !(idProp || teamRoomModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
