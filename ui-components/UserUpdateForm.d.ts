import type * as React from "react";

import type {
  GridProps,
  SwitchFieldProps,
  TextFieldProps,
} from "@aws-amplify/ui-react";

import type { User } from "./graphql/types";

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
export declare type UserUpdateFormInputValues = {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Institution?: string;
  Allergies?: string;
  CheckedIn?: boolean;
  owner?: string;
};
export declare type UserUpdateFormValidationValues = {
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
export declare type UserUpdateFormOverridesProps = {
  UserUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  FirstName?: PrimitiveOverrideProps<TextFieldProps>;
  LastName?: PrimitiveOverrideProps<TextFieldProps>;
  Email?: PrimitiveOverrideProps<TextFieldProps>;
  Institution?: PrimitiveOverrideProps<TextFieldProps>;
  Allergies?: PrimitiveOverrideProps<TextFieldProps>;
  CheckedIn?: PrimitiveOverrideProps<SwitchFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: UserUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    user?: User;
    onSubmit?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onSuccess?: (fields: UserUpdateFormInputValues) => void;
    onError?: (fields: UserUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onValidate?: UserUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function UserUpdateForm(
  props: UserUpdateFormProps,
): React.ReactElement;
