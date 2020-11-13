import * as React from "react";
import { Field } from "react-final-form";
import { TextFieldProps } from "@material-ui/core/TextField";
import { NumberTextFieldWrapper } from "./NumberTextFieldWrapper";
import { required as requiredValidator } from "../../../../services/validatorsService";

export interface IFormFieldBase {
  required?: boolean;
  validate?: any[];
}

export type IFormNumberTextField = TextFieldProps &
  IFormFieldBase & {
    id?: string;
    style?: any;
    name: string;
    disabled?: boolean;
    required?: boolean;
    isDouble?: boolean;
    fullWidth?: boolean;
    decimalsAfterComma?: number;
    floatingLabelText?: any;
    errorText?: string;
    validate?: any;
    normalize?: any;
    onBlur?: (event: any) => void;
    onChange?: (...params: any[]) => any;
  };
const FormNumberTextField = (props: IFormNumberTextField) => {
  const { required = false, validate = [], ...rest } = props;
  const newValidate = Array.isArray(validate) ? [...validate] : [];

  if (required) {
    newValidate.push(requiredValidator);
  }

  return (
    <Field
      {...rest}
      id={rest.id || rest.name}
      required={required}
      component={NumberTextFieldWrapper as any}
      validate={required ? requiredValidator : undefined}
    />
  );
};
(FormNumberTextField as React.StatelessComponent).displayName =
  "FormNumberTextField";

export default FormNumberTextField;
