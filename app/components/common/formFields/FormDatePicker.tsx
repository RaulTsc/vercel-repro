import React from "react";
import {
  required as requiredValidator,
  composeValidators,
} from "../../../services/validatorsService";

import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@material-ui/pickers";

import { Field, FieldProps, FieldRenderProps } from "react-final-form";

import { ShowErrorFunc, showErrorOnChange } from "./Util";
import pickerProviderWrapper from "./PickerProvider";

interface DatePickerWrapperProps
  extends FieldRenderProps<MuiDatePickerProps, HTMLElement> {
  dateFunsUtils?: any;
  locale?: any;
}

function DatePickerWrapper(props: DatePickerWrapperProps) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    dateFunsUtils,
    locale,
    showError = showErrorOnChange,
    ...rest
  } = props;

  const { error, submitError } = meta;
  const isError = showError({ meta });

  const { helperText, ...lessrest } = rest;

  return pickerProviderWrapper(
    dateFunsUtils,
    <MuiDatePicker
      fullWidth={true}
      autoOk={true}
      helperText={isError ? error || submitError : helperText}
      error={isError}
      name={name}
      value={(value as any) === "" ? null : value}
      {...lessrest}
      onChange={(value) => {
        onChange(value);
        if (lessrest.onChange) {
          lessrest.onChange(value);
        }
      }}
      inputProps={{ ...restInput, ...props.inputProps }}
    />,
    locale
  );
}

export interface FormDatePickerProps
  extends Partial<Omit<MuiDatePickerProps, "onChange">> {
  name: string;
  dateFunsUtils?: any;
  locale?: any;
  fieldProps?: Partial<FieldProps<any, any>>;
  showError?: ShowErrorFunc;
  validate?: any;
  onChange?: any;
}

export default function FormDatePicker(props: FormDatePickerProps) {
  const { name, fieldProps, required, validate, ...rest } = props;
  const validators = Array.isArray(validate) ? validate : [];
  if (required) {
    validators.push(requiredValidator);
  }

  return (
    <Field
      name={name}
      validate={composeValidators.apply(null, validators)}
      render={(fieldRenderProps) => (
        <DatePickerWrapper
          required={required}
          inputProps={{
            "aria-label": name,
          }}
          {...fieldRenderProps}
          {...rest}
        />
      )}
      {...fieldProps}
    />
  );
}
