import * as React from "react";

import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";

import { TeamRoom } from "./graphql/types";

export declare type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
  [key: string]: string;
};
export declare type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse,
) => ValidationResponse | Promise<ValidationResponse>;
export declare type TeamRoomUpdateFormInputValues = {
  time?: string;
  zoomLink?: string;
};
export declare type TeamRoomUpdateFormValidationValues = {
  time?: ValidationFunction<string>;
  zoomLink?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type TeamRoomUpdateFormOverridesProps = {
  TeamRoomUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  time?: PrimitiveOverrideProps<TextFieldProps>;
  zoomLink?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeamRoomUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: TeamRoomUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    teamRoom?: TeamRoom;
    onSubmit?: (
      fields: TeamRoomUpdateFormInputValues,
    ) => TeamRoomUpdateFormInputValues;
    onSuccess?: (fields: TeamRoomUpdateFormInputValues) => void;
    onError?: (
      fields: TeamRoomUpdateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: TeamRoomUpdateFormInputValues,
    ) => TeamRoomUpdateFormInputValues;
    onValidate?: TeamRoomUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function TeamRoomUpdateForm(
  props: TeamRoomUpdateFormProps,
): React.ReactElement;
