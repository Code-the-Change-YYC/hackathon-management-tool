import * as React from "react";

import { GridProps, TextAreaFieldProps } from "@aws-amplify/ui-react";

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
export declare type ScoreCreateFormInputValues = {
  score?: string;
};
export declare type ScoreCreateFormValidationValues = {
  score?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type ScoreCreateFormOverridesProps = {
  ScoreCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  score?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ScoreCreateFormProps = React.PropsWithChildren<
  {
    overrides?: ScoreCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: ScoreCreateFormInputValues,
    ) => ScoreCreateFormInputValues;
    onSuccess?: (fields: ScoreCreateFormInputValues) => void;
    onError?: (
      fields: ScoreCreateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: ScoreCreateFormInputValues,
    ) => ScoreCreateFormInputValues;
    onValidate?: ScoreCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function ScoreCreateForm(
  props: ScoreCreateFormProps,
): React.ReactElement;
