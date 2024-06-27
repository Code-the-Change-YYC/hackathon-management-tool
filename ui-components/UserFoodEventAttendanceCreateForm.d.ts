import * as React from "react";

import { GridProps } from "@aws-amplify/ui-react";

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
export declare type UserFoodEventAttendanceCreateFormInputValues = {};
export declare type UserFoodEventAttendanceCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type UserFoodEventAttendanceCreateFormOverridesProps = {
  UserFoodEventAttendanceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type UserFoodEventAttendanceCreateFormProps =
  React.PropsWithChildren<
    {
      overrides?:
        | UserFoodEventAttendanceCreateFormOverridesProps
        | undefined
        | null;
    } & {
      clearOnSuccess?: boolean;
      onSubmit?: (
        fields: UserFoodEventAttendanceCreateFormInputValues,
      ) => UserFoodEventAttendanceCreateFormInputValues;
      onSuccess?: (
        fields: UserFoodEventAttendanceCreateFormInputValues,
      ) => void;
      onError?: (
        fields: UserFoodEventAttendanceCreateFormInputValues,
        errorMessage: string,
      ) => void;
      onChange?: (
        fields: UserFoodEventAttendanceCreateFormInputValues,
      ) => UserFoodEventAttendanceCreateFormInputValues;
      onValidate?: UserFoodEventAttendanceCreateFormValidationValues;
    } & React.CSSProperties
  >;
export default function UserFoodEventAttendanceCreateForm(
  props: UserFoodEventAttendanceCreateFormProps,
): React.ReactElement;
