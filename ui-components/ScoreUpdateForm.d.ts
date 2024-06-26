import * as React from "react";
import { GridProps, TextAreaFieldProps } from "@aws-amplify/ui-react";
import { Score } from "./graphql/types";
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
export declare type ScoreUpdateFormInputValues = {
    score?: string;
};
export declare type ScoreUpdateFormValidationValues = {
    score?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScoreUpdateFormOverridesProps = {
    ScoreUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    score?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ScoreUpdateFormProps = React.PropsWithChildren<{
    overrides?: ScoreUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    score?: Score;
    onSubmit?: (fields: ScoreUpdateFormInputValues) => ScoreUpdateFormInputValues;
    onSuccess?: (fields: ScoreUpdateFormInputValues) => void;
    onError?: (fields: ScoreUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScoreUpdateFormInputValues) => ScoreUpdateFormInputValues;
    onValidate?: ScoreUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ScoreUpdateForm(props: ScoreUpdateFormProps): React.ReactElement;
