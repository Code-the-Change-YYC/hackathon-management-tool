import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Hackathon } from "./graphql/types";
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
export declare type HackathonUpdateFormInputValues = {
    startDate?: string;
    endDate?: string;
};
export declare type HackathonUpdateFormValidationValues = {
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HackathonUpdateFormOverridesProps = {
    HackathonUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HackathonUpdateFormProps = React.PropsWithChildren<{
    overrides?: HackathonUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    hackathon?: Hackathon;
    onSubmit?: (fields: HackathonUpdateFormInputValues) => HackathonUpdateFormInputValues;
    onSuccess?: (fields: HackathonUpdateFormInputValues) => void;
    onError?: (fields: HackathonUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HackathonUpdateFormInputValues) => HackathonUpdateFormInputValues;
    onValidate?: HackathonUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HackathonUpdateForm(props: HackathonUpdateFormProps): React.ReactElement;
