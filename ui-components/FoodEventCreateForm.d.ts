import type * as React from "react";

import type { GridProps, TextFieldProps } from "@aws-amplify/ui-react";

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
export declare type FoodEventCreateFormInputValues = {
  Name?: string;
  Description?: string;
  Start?: string;
  End?: string;
  Groups?: number;
  owner?: string;
};
export declare type FoodEventCreateFormValidationValues = {
  Name?: ValidationFunction<string>;
  Description?: ValidationFunction<string>;
  Start?: ValidationFunction<string>;
  End?: ValidationFunction<string>;
  Groups?: ValidationFunction<number>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type FoodEventCreateFormOverridesProps = {
  FoodEventCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  Name?: PrimitiveOverrideProps<TextFieldProps>;
  Description?: PrimitiveOverrideProps<TextFieldProps>;
  Start?: PrimitiveOverrideProps<TextFieldProps>;
  End?: PrimitiveOverrideProps<TextFieldProps>;
  Groups?: PrimitiveOverrideProps<TextFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FoodEventCreateFormProps = React.PropsWithChildren<
  {
    overrides?: FoodEventCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: FoodEventCreateFormInputValues,
    ) => FoodEventCreateFormInputValues;
    onSuccess?: (fields: FoodEventCreateFormInputValues) => void;
    onError?: (
      fields: FoodEventCreateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: FoodEventCreateFormInputValues,
    ) => FoodEventCreateFormInputValues;
    onValidate?: FoodEventCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function FoodEventCreateForm(
  props: FoodEventCreateFormProps,
): React.ReactElement;
