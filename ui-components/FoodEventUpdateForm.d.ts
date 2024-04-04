import type * as React from "react";

import type { GridProps, TextFieldProps } from "@aws-amplify/ui-react";

import type { FoodEvent } from "./graphql/types";

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
export declare type FoodEventUpdateFormInputValues = {
  Name?: string;
  Description?: string;
  Start?: string;
  End?: string;
  Groups?: number;
  owner?: string;
};
export declare type FoodEventUpdateFormValidationValues = {
  Name?: ValidationFunction<string>;
  Description?: ValidationFunction<string>;
  Start?: ValidationFunction<string>;
  End?: ValidationFunction<string>;
  Groups?: ValidationFunction<number>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type FoodEventUpdateFormOverridesProps = {
  FoodEventUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  Name?: PrimitiveOverrideProps<TextFieldProps>;
  Description?: PrimitiveOverrideProps<TextFieldProps>;
  Start?: PrimitiveOverrideProps<TextFieldProps>;
  End?: PrimitiveOverrideProps<TextFieldProps>;
  Groups?: PrimitiveOverrideProps<TextFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FoodEventUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: FoodEventUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    foodEvent?: FoodEvent;
    onSubmit?: (
      fields: FoodEventUpdateFormInputValues,
    ) => FoodEventUpdateFormInputValues;
    onSuccess?: (fields: FoodEventUpdateFormInputValues) => void;
    onError?: (
      fields: FoodEventUpdateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: FoodEventUpdateFormInputValues,
    ) => FoodEventUpdateFormInputValues;
    onValidate?: FoodEventUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function FoodEventUpdateForm(
  props: FoodEventUpdateFormProps,
): React.ReactElement;
