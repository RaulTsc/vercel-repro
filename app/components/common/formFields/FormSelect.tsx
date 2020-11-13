import React, { ReactNode } from "react";
import {
  required as requiredValidator,
  composeValidators,
} from "../../../services/validatorsService";

import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  FormControl,
  FormControlProps,
  FormHelperTextProps,
  InputLabel,
  InputLabelProps,
  MenuItem,
  MenuItemProps,
} from "@material-ui/core";

import { Field, FieldProps } from "react-final-form";
import {
  ErrorMessage,
  showErrorOnChange,
  useFieldForErrors,
  ShowErrorFunc,
} from "./Util";

export interface SelectData {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface FormSelectProps extends Partial<MuiSelectProps> {
  name: string;
  label?: ReactNode;
  required?: boolean;
  multiple?: boolean;
  helperText?: string;
  fieldProps?: Partial<FieldProps<any, any>>;
  formControlProps?: Partial<FormControlProps>;
  inputLabelProps?: Partial<InputLabelProps>;
  formHelperTextProps?: Partial<FormHelperTextProps>;
  showError?: ShowErrorFunc;
  menuItemProps?: Partial<MenuItemProps>;
  data?: SelectData[];
  children?: React.ReactElement | React.ReactElement[];
  validate?: any[];
}

export default function FormSelect(props: FormSelectProps) {
  const {
    name,
    label,
    data,
    children,
    required,
    multiple,
    helperText,
    fieldProps,
    inputLabelProps,
    formControlProps,
    formHelperTextProps,
    menuItemProps,
    labelWidth,
    showError = showErrorOnChange,
    validate,
    onChange: onChangeProps,
    ...restSelectProps
  } = props;

  if (!data && !children) {
    throw new Error("Please specify either children or data as an attribute.");
  }

  // This is for supporting the special case of variant="outlined"
  // Fixes: https://github.com/lookfirst/mui-rff/issues/91
  const { variant } = restSelectProps;
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidthState, setLabelWidthState] = React.useState(0);
  React.useEffect(() => {
    if (label) {
      setLabelWidthState(inputLabel.current!.offsetWidth);
    }
  }, [label]);

  const field = useFieldForErrors(name);
  const isError = showError(field);

  const validators = Array.isArray(validate) ? validate : [];
  if (required) {
    validators.push(requiredValidator);
  }

  return (
    <FormControl
      required={required}
      error={isError}
      fullWidth={true}
      variant={variant}
      style={{ marginTop: 8, ...props.style }}
      {...formControlProps}
    >
      {!!label && (
        <InputLabel ref={inputLabel} htmlFor={name} {...inputLabelProps}>
          {label}
        </InputLabel>
      )}
      <Field
        name={name}
        validate={composeValidators.apply(null, validators)}
        render={({ input: { name, value, onChange, ...restInput } }) => {
          // prevents an error that happens if you don't have initialValues defined in advance
          const finalValue = multiple && !value ? [] : value;

          return (
            <MuiSelect
              name={name}
              value={finalValue}
              aria-label={name}
              onChange={(event, child) => {
                onChange(event, child);
                if (onChangeProps) {
                  onChangeProps(event, child);
                }
              }}
              multiple={multiple}
              label={label}
              labelWidth={
                variant === "outlined" && !!label ? labelWidthState : labelWidth
              }
              inputProps={{ required, ...restInput }}
              {...restSelectProps}
            >
              {data
                ? data.map((item) => {
                    return (
                      <MenuItem
                        value={item.value}
                        key={item.value}
                        disabled={item.disabled}
                        {...(menuItemProps as any)}
                      >
                        {item.label}
                      </MenuItem>
                    );
                  })
                : children}
            </MuiSelect>
          );
        }}
        {...fieldProps}
      />
      <ErrorMessage
        showError={isError}
        meta={field.meta}
        formHelperTextProps={formHelperTextProps}
        helperText={helperText}
      />
    </FormControl>
  );
}
