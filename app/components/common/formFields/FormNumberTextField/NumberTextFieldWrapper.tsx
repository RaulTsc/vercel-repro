import * as React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { formatDouble } from "@raultom/common-helpers/lib/helpers/formatters";
import {
  formatInputString,
  ensureValueIsNumber,
  removeInvalidCharacters,
  getNumberByDecimalCount,
} from "./NumberTextField.utilities";

export interface IFormFieldWrapperBase {
  input?: {
    name?: string;
    value?: any;
    onChange?: (value?: any) => void;
    onBlur?: (value?: any) => void;
  };
  meta: {
    touched?: boolean;
    error?: string;
    warning?: string;
  };
}

export type INumberTextFieldProps = IFormFieldWrapperBase &
  TextFieldProps & {
    floatingLabelText?: React.ReactNode;
    isDouble?: boolean;
    decimalsAfterComma?: number;
    onBlur?: any;
  };
export class NumberTextFieldWrapper extends React.Component<
  INumberTextFieldProps,
  any
> {
  public state = {
    numberOfDecimals: null,
  };

  public render() {
    const {
      input,
      meta: { touched, error },
      isDouble = false,
      decimalsAfterComma = 2,
      onChange,
      onBlur,
      label,
      floatingLabelText,
      ...restProps
    } = this.props;
    const { numberOfDecimals } = this.state;
    const hasError = touched && !!error;
    const exactDecimalsAfterComma = getExactDecimalsAfterComma({
      numberOfDecimals,
      decimalsAfterComma,
    });
    const roundedDownValue =
      isDouble &&
      typeof input?.value === "number" &&
      getNumberByDecimalCount(input?.value, decimalsAfterComma);
    const value =
      isDouble && typeof input?.value === "number"
        ? formatDouble(roundedDownValue as number, { exactDecimalsAfterComma })
        : input?.value;

    return (
      <TextField
        {...restProps}
        name={input?.name}
        error={hasError}
        value={value}
        helperText={hasError && error}
        label={label || floatingLabelText}
        onChange={this.handleOnChange}
        onBlur={this.handleOnBlur}
      />
    );
  }

  private handleOnChange = (event: any) => {
    const { isDouble = false, input, onChange } = this.props;
    const valueAsString = event.target.value;

    const valueAsStringWithoutInvalidChars = removeInvalidCharacters(
      valueAsString,
      isDouble
    );
    const numberOfDecimals = valueAsStringWithoutInvalidChars.split(".")[1]
      ? valueAsStringWithoutInvalidChars.split(".")[1].length
      : 0;
    this.setState(() => ({
      numberOfDecimals,
    }));

    const value = formatInputString(valueAsString, isDouble);

    if (input && input.onChange && typeof input.onChange === "function") {
      input.onChange(value);
    }

    if (onChange && typeof onChange === "function") {
      event.target.value = value;
      onChange(event);
    }
  };

  private handleOnBlur = (event: any) => {
    const { isDouble = false, input, onBlur } = this.props;

    const valueAsNumber = ensureValueIsNumber(event.target.value, isDouble);

    if (onBlur && typeof onBlur === "function") {
      onBlur(event);
    }

    if (input && input.onBlur && typeof input.onBlur === "function") {
      input.onBlur(valueAsNumber);
    }
  };
}

const getExactDecimalsAfterComma = ({
  numberOfDecimals,
  decimalsAfterComma,
}: any): number => {
  const numberOfDecimalsOrDefault =
    numberOfDecimals === null ? decimalsAfterComma : numberOfDecimals;

  return numberOfDecimalsOrDefault > decimalsAfterComma
    ? decimalsAfterComma
    : numberOfDecimalsOrDefault;
};
