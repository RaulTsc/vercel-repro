import * as React from "react";

import { Field, FieldProps } from "react-final-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ShowErrorFunc } from "./Util";

export interface CheckboxData {
  label: React.ReactNode;
  value: unknown;
  disabled?: boolean;
}
export interface FormCheckboxProps {
  name: string;
  fullWidth?: boolean;
  disabled?: boolean;
  label: React.ReactNode;
  required?: boolean;
  helperText?: string;
  fieldProps?: Partial<FieldProps<any, any>>;
  showError?: ShowErrorFunc;
}
export const FormCheckbox = (props: FormCheckboxProps) => {
  return (
    <FormControlLabel
      control={
        <Field
          type="checkbox"
          name={props.name}
          render={({
            input: { name, value, onChange, checked, ...restInput },
          }) => (
            <Checkbox
              name={name}
              value={value}
              onChange={onChange}
              checked={checked}
              disabled={props.disabled}
              inputProps={{ required: props.required, ...restInput }}
            />
          )}
        />
      }
      {...props}
    />
  );
};
