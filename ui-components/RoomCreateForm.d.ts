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
export declare type RoomCreateFormInputValues = {
  name?: string;
};
export declare type RoomCreateFormValidationValues = {
  name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type RoomCreateFormOverridesProps = {
  RoomCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RoomCreateFormProps = React.PropsWithChildren<
  {
    overrides?: RoomCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RoomCreateFormInputValues) => RoomCreateFormInputValues;
    onSuccess?: (fields: RoomCreateFormInputValues) => void;
    onError?: (fields: RoomCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RoomCreateFormInputValues) => RoomCreateFormInputValues;
    onValidate?: RoomCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function RoomCreateForm(
  props: RoomCreateFormProps,
): React.ReactElement;
