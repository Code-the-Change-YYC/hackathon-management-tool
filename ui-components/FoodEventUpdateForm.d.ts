import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { FoodEvent } from "./graphql/types";
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
export declare type FoodEventUpdateFormInputValues = {
    name?: string;
    description?: string;
    start?: string;
    end?: string;
    groups?: number;
};
export declare type FoodEventUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    start?: ValidationFunction<string>;
    end?: ValidationFunction<string>;
    groups?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FoodEventUpdateFormOverridesProps = {
    FoodEventUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    start?: PrimitiveOverrideProps<TextFieldProps>;
    end?: PrimitiveOverrideProps<TextFieldProps>;
    groups?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FoodEventUpdateFormProps = React.PropsWithChildren<{
    overrides?: FoodEventUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    foodEvent?: FoodEvent;
    onSubmit?: (fields: FoodEventUpdateFormInputValues) => FoodEventUpdateFormInputValues;
    onSuccess?: (fields: FoodEventUpdateFormInputValues) => void;
    onError?: (fields: FoodEventUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FoodEventUpdateFormInputValues) => FoodEventUpdateFormInputValues;
    onValidate?: FoodEventUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FoodEventUpdateForm(props: FoodEventUpdateFormProps): React.ReactElement;
