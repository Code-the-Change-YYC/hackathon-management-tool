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
export declare type HackathonCreateFormInputValues = {
    startDate?: string;
    endDate?: string;
};
export declare type HackathonCreateFormValidationValues = {
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HackathonCreateFormOverridesProps = {
    HackathonCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HackathonCreateFormProps = React.PropsWithChildren<{
    overrides?: HackathonCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HackathonCreateFormInputValues) => HackathonCreateFormInputValues;
    onSuccess?: (fields: HackathonCreateFormInputValues) => void;
    onError?: (fields: HackathonCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HackathonCreateFormInputValues) => HackathonCreateFormInputValues;
    onValidate?: HackathonCreateFormValidationValues;
} & React.CSSProperties>;
export default function HackathonCreateForm(props: HackathonCreateFormProps): React.ReactElement;
