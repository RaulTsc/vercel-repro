import React from "react";
import { connect, ConnectedProps } from "react-redux";
import FormDialog from "../common/FormDialog/FormDialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "react-intl";
import { FormProps } from "react-final-form";
import { RootState } from "../../store";
import { useIntl } from "react-intl";

import FormTextField from "../common/formFields/FormTextField";
import FormNumberTextField from "../common/formFields/FormNumberTextField/FormNumberTextField";
import { ALL_CURRENCY, CURRENCY, ICompany } from "../../interfaces";
import FormTimePicker from "../common/formFields/FormTimePicker";
import FormSelect from "../common/formFields/FormSelect";

export const ADD_COMPANY_FORM_DIALOG = "ADD_COMPANY_FORM_DIALOG";

type PropsFromRedux = ConnectedProps<typeof connector>;
export type AddCompanyFormDialogProps = PropsFromRedux &
  FormProps<ICompany> & {
    loading: boolean;
  };
export const _AddCompanyFormDialog = (props: AddCompanyFormDialogProps) => {
  const intl = useIntl();

  return (
    <FormDialog<ICompany>
      name={ADD_COMPANY_FORM_DIALOG}
      title={<FormattedMessage id="App.settings.companies.addCompany" />}
      confirmLabel={<FormattedMessage id="App.common.add" />}
      {...props}
    >
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <FormTextField
            fullWidth
            required
            disabled={props.loading}
            name="name"
            margin="dense"
            label={<FormattedMessage id="App.common.company.name" />}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <FormSelect
            fullWidth
            name="currency"
            margin="dense"
            disabled={props.loading}
            data={ALL_CURRENCY.map((currency: CURRENCY) => ({
              value: currency,
              label: intl.formatMessage({
                id: `App.common.currencies.${currency}`,
              }),
            }))}
            label={<FormattedMessage id="App.common.currency" />}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <FormNumberTextField
            fullWidth
            disabled={props.loading}
            name="stars"
            margin="dense"
            label={<FormattedMessage id="App.common.company.stars" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            style={{ marginBottom: "-8px", marginTop: "8px", fontWeight: 600 }}
          >
            <FormattedMessage id="App.common.company.address" />
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            required
            disabled={props.loading}
            name="address.streetName"
            margin="dense"
            label={
              <FormattedMessage id="App.common.company.address.streetName" />
            }
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            required
            disabled={props.loading}
            name="address.streetNumber"
            margin="dense"
            label={
              <FormattedMessage id="App.common.company.address.streetNumber" />
            }
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            required
            disabled={props.loading}
            name="address.zipCode"
            margin="dense"
            label={<FormattedMessage id="App.common.company.address.zipCode" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            required
            disabled={props.loading}
            name="address.city"
            margin="dense"
            label={<FormattedMessage id="App.common.company.address.city" />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            fullWidth
            required
            disabled={props.loading}
            name="address.country"
            margin="dense"
            label={<FormattedMessage id="App.common.company.address.country" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            style={{ marginBottom: "-8px", marginTop: "8px", fontWeight: 600 }}
          >
            <FormattedMessage id="App.settings.company.bookings" />
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTimePicker
            fullWidth
            disabled={props.loading}
            name="bookings.checkoutTime"
            margin="dense"
            label={<FormattedMessage id="App.settings.checkoutTime" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTimePicker
            fullWidth
            disabled={props.loading}
            name="bookings.checkinTime"
            margin="dense"
            label={<FormattedMessage id="App.settings.checkinTime" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            style={{ marginBottom: "-8px", marginTop: "8px", fontWeight: 600 }}
          >
            <FormattedMessage id="App.settings.company.google" />
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            disabled={props.loading}
            name="google.name"
            margin="dense"
            label={<FormattedMessage id="App.settings.company.google.name" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            disabled={props.loading}
            name="google.mapsId"
            margin="dense"
            label={<FormattedMessage id="App.settings.company.google.mapsId" />}
          />
        </Grid>
      </Grid>
    </FormDialog>
  );
};

const connector = connect((state: RootState) => ({}), {});
export const AddCompanyFormDialog = connector(_AddCompanyFormDialog);
