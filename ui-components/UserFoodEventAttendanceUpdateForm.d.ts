import * as React from "react";

import { GridProps } from "@aws-amplify/ui-react";

import { UserFoodEventAttendance } from "./graphql/types";

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
export declare type UserFoodEventAttendanceUpdateFormInputValues = {};
export declare type UserFoodEventAttendanceUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type UserFoodEventAttendanceUpdateFormOverridesProps = {
  UserFoodEventAttendanceUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type UserFoodEventAttendanceUpdateFormProps =
  React.PropsWithChildren<
    {
      overrides?:
        | UserFoodEventAttendanceUpdateFormOverridesProps
        | undefined
        | null;
    } & {
      id?: string;
      userFoodEventAttendance?: UserFoodEventAttendance;
      onSubmit?: (
        fields: UserFoodEventAttendanceUpdateFormInputValues,
      ) => UserFoodEventAttendanceUpdateFormInputValues;
      onSuccess?: (
        fields: UserFoodEventAttendanceUpdateFormInputValues,
      ) => void;
      onError?: (
        fields: UserFoodEventAttendanceUpdateFormInputValues,
        errorMessage: string,
      ) => void;
      onChange?: (
        fields: UserFoodEventAttendanceUpdateFormInputValues,
      ) => UserFoodEventAttendanceUpdateFormInputValues;
      onValidate?: UserFoodEventAttendanceUpdateFormValidationValues;
    } & React.CSSProperties
  >;
export default function UserFoodEventAttendanceUpdateForm(
  props: UserFoodEventAttendanceUpdateFormProps,
): React.ReactElement;
