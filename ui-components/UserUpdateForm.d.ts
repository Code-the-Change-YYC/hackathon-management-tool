import * as React from "react";

import {
  GridProps,
  SwitchFieldProps,
  TextFieldProps,
} from "@aws-amplify/ui-react";

import { User } from "./graphql/types";

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
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
  institution?: string;
  completedRegistration?: boolean;
  allergies?: string;
  willEatMeals?: boolean;
  checkedIn?: boolean;
  profileOwner?: string;
};
export declare type UserUpdateFormValidationValues = {
  firstName?: ValidationFunction<string>;
  lastName?: ValidationFunction<string>;
  role?: ValidationFunction<string>;
  email?: ValidationFunction<string>;
  institution?: ValidationFunction<string>;
  completedRegistration?: ValidationFunction<boolean>;
  allergies?: ValidationFunction<string>;
  willEatMeals?: ValidationFunction<boolean>;
  checkedIn?: ValidationFunction<boolean>;
  profileOwner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type UserUpdateFormOverridesProps = {
  UserUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  firstName?: PrimitiveOverrideProps<TextFieldProps>;
  lastName?: PrimitiveOverrideProps<TextFieldProps>;
  role?: PrimitiveOverrideProps<TextFieldProps>;
  email?: PrimitiveOverrideProps<TextFieldProps>;
  institution?: PrimitiveOverrideProps<TextFieldProps>;
  completedRegistration?: PrimitiveOverrideProps<SwitchFieldProps>;
  allergies?: PrimitiveOverrideProps<TextFieldProps>;
  willEatMeals?: PrimitiveOverrideProps<SwitchFieldProps>;
  checkedIn?: PrimitiveOverrideProps<SwitchFieldProps>;
  profileOwner?: PrimitiveOverrideProps<TextFieldProps>;
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
