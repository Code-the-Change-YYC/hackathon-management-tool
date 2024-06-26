import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Room } from "./graphql/types";
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
export declare type RoomUpdateFormInputValues = {
    name?: string;
};
export declare type RoomUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RoomUpdateFormOverridesProps = {
    RoomUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RoomUpdateFormProps = React.PropsWithChildren<{
    overrides?: RoomUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    room?: Room;
    onSubmit?: (fields: RoomUpdateFormInputValues) => RoomUpdateFormInputValues;
    onSuccess?: (fields: RoomUpdateFormInputValues) => void;
    onError?: (fields: RoomUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RoomUpdateFormInputValues) => RoomUpdateFormInputValues;
    onValidate?: RoomUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RoomUpdateForm(props: RoomUpdateFormProps): React.ReactElement;
