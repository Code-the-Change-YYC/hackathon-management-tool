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
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FoodEventCreateFormInputValues = {
    name?: string;
    description?: string;
    start?: string;
    end?: string;
    totalGroupCount?: number;
};
export declare type FoodEventCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    start?: ValidationFunction<string>;
    end?: ValidationFunction<string>;
    totalGroupCount?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FoodEventCreateFormOverridesProps = {
    FoodEventCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    start?: PrimitiveOverrideProps<TextFieldProps>;
    end?: PrimitiveOverrideProps<TextFieldProps>;
    totalGroupCount?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FoodEventCreateFormProps = React.PropsWithChildren<{
    overrides?: FoodEventCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FoodEventCreateFormInputValues) => FoodEventCreateFormInputValues;
    onSuccess?: (fields: FoodEventCreateFormInputValues) => void;
    onError?: (fields: FoodEventCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FoodEventCreateFormInputValues) => FoodEventCreateFormInputValues;
    onValidate?: FoodEventCreateFormValidationValues;
} & React.CSSProperties>;
export default function FoodEventCreateForm(props: FoodEventCreateFormProps): React.ReactElement;
