import type * as React from "react";

import type {
  GridProps,
  SwitchFieldProps,
  TextFieldProps,
} from "@aws-amplify/ui-react";

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
export declare type UserCreateFormInputValues = {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Institution?: string;
  Allergies?: string;
  CheckedIn?: boolean;
  owner?: string;
};
export declare type UserCreateFormValidationValues = {
  FirstName?: ValidationFunction<string>;
  LastName?: ValidationFunction<string>;
  Email?: ValidationFunction<string>;
  Institution?: ValidationFunction<string>;
  Allergies?: ValidationFunction<string>;
  CheckedIn?: ValidationFunction<boolean>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type UserCreateFormOverridesProps = {
  UserCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  FirstName?: PrimitiveOverrideProps<TextFieldProps>;
  LastName?: PrimitiveOverrideProps<TextFieldProps>;
  Email?: PrimitiveOverrideProps<TextFieldProps>;
  Institution?: PrimitiveOverrideProps<TextFieldProps>;
  Allergies?: PrimitiveOverrideProps<TextFieldProps>;
  CheckedIn?: PrimitiveOverrideProps<SwitchFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCreateFormProps = React.PropsWithChildren<
  {
    overrides?: UserCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onSuccess?: (fields: UserCreateFormInputValues) => void;
    onError?: (fields: UserCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onValidate?: UserCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function UserCreateForm(
  props: UserCreateFormProps,
): React.ReactElement;