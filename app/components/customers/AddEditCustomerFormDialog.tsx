import React from "react";
import FormDialog from "../common/FormDialog/FormDialog";
import Grid from "@material-ui/core/Grid";
import FormTextField from "../common//formFields/FormTextField";
import { FormattedMessage } from "react-intl";
import { FormProps } from "react-final-form";

export const ADD_EDIT_CUSTOMER_FORM_DIALOG = "ADD_EDIT_CUSTOMER_FORM_DIALOG";
export type AddEditCustomerFormDialogFormProps = FormProps<any>;
export type AddEditCustomerFormDialogProps = AddEditCustomerFormDialogFormProps & {
  loading?: boolean;
};
export default function AddEditCustomerFormDialog(
  props: AddEditCustomerFormDialogProps
) {
  const isEdit = Boolean(props.initialValues?.id);

  return (
    <FormDialog<any>
      {...props}
      name={ADD_EDIT_CUSTOMER_FORM_DIALOG}
      title={
        <FormattedMessage
          id={
            isEdit
              ? "App.customers.customer.editCustomer"
              : "App.customers.customer.addCustomer"
          }
        />
      }
      confirmLabel={isEdit ? <FormattedMessage id="App.common.edit" /> : null}
    >
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            required
            name="firstName"
            margin="dense"
            label={<FormattedMessage id="App.customers.customer.firstName" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            required
            name="lastName"
            margin="dense"
            label={<FormattedMessage id="App.customers.customer.lastName" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            name="phoneNumber"
            margin="dense"
            label={<FormattedMessage id="App.customers.customer.phoneNumber" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            name="email"
            margin="dense"
            label={<FormattedMessage id="App.customers.customer.email" />}
          />
        </Grid>
      </Grid>
    </FormDialog>
  );
}
