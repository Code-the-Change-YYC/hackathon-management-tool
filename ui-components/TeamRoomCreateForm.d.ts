import * as React from "react";

import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";

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
export declare type TeamRoomCreateFormInputValues = {
  time?: string;
  zoomLink?: string;
};
export declare type TeamRoomCreateFormValidationValues = {
  time?: ValidationFunction<string>;
  zoomLink?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type TeamRoomCreateFormOverridesProps = {
  TeamRoomCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  time?: PrimitiveOverrideProps<TextFieldProps>;
  zoomLink?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeamRoomCreateFormProps = React.PropsWithChildren<
  {
    overrides?: TeamRoomCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: TeamRoomCreateFormInputValues,
    ) => TeamRoomCreateFormInputValues;
    onSuccess?: (fields: TeamRoomCreateFormInputValues) => void;
    onError?: (
      fields: TeamRoomCreateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: TeamRoomCreateFormInputValues,
    ) => TeamRoomCreateFormInputValues;
    onValidate?: TeamRoomCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function TeamRoomCreateForm(
  props: TeamRoomCreateFormProps,
): React.ReactElement;
