import type * as React from "react";

import type { GridProps, TextFieldProps } from "@aws-amplify/ui-react";

import type { Team } from "./graphql/types";

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
export declare type TeamUpdateFormInputValues = {
  Name?: string;
  Code?: string;
  owner?: string;
};
export declare type TeamUpdateFormValidationValues = {
  Name?: ValidationFunction<string>;
  Code?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type TeamUpdateFormOverridesProps = {
  TeamUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  Name?: PrimitiveOverrideProps<TextFieldProps>;
  Code?: PrimitiveOverrideProps<TextFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeamUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: TeamUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    team?: Team;
    onSubmit?: (fields: TeamUpdateFormInputValues) => TeamUpdateFormInputValues;
    onSuccess?: (fields: TeamUpdateFormInputValues) => void;
    onError?: (fields: TeamUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeamUpdateFormInputValues) => TeamUpdateFormInputValues;
    onValidate?: TeamUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function TeamUpdateForm(
  props: TeamUpdateFormProps,
): React.ReactElement;
