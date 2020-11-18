import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Page from "../../../../app/components/common/Page/Page";
import { Form } from "react-final-form";
import FormTextField from "../../../../app/components/common/formFields/FormTextField";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FormSelect from "../../../../app/components/common/formFields/FormSelect";
import { ALL_LANGUAGE, LANGUAGE, IUser } from "../../../../app/interfaces";
import { useIntl } from "react-intl";
import { RootState } from "../../../../app/store";
import { makeStyles } from "@material-ui/core/styles";

import {
  toggleSnackbar,
  selectors as commonSelectors,
} from "../../../../app/slices/commonSlice";

import {
  updateUser,
  selectors as profileSelectors,
} from "../../../../app/slices/adminSlice/profileSlice";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";
import Nav from "../../../../app/components/common/Nav/Nav";

const useStyles = makeStyles((theme) => ({
  confirmWrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

type IUserFormProps = {
  loading: boolean;
  initialValues?: IUser | null;
  updateUser: (user: IUser) => void;
};
const UserForm = (props: IUserFormProps) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={(user: IUser) => props.updateUser(user)}
      render={({ handleSubmit }: any) => {
        return (
          <form onSubmit={handleSubmit}>
            <Paper elevation={0} style={{ padding: "20px" }}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <FormTextField
                    fullWidth
                    name="firstName"
                    margin="dense"
                    disabled={props.loading}
                    label={<FormattedMessage id="App.common.firstName" />}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormTextField
                    fullWidth
                    name="lastName"
                    margin="dense"
                    disabled={props.loading}
                    label={<FormattedMessage id="App.common.lastName" />}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormTextField
                    fullWidth
                    name="phoneNumber"
                    margin="dense"
                    disabled={props.loading}
                    label={<FormattedMessage id="App.common.phoneNumber" />}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormTextField
                    fullWidth
                    disabled
                    name="email"
                    margin="dense"
                    label={<FormattedMessage id="App.common.email" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormSelect
                    fullWidth
                    name="language"
                    margin="dense"
                    disabled={props.loading}
                    data={ALL_LANGUAGE.map((language: LANGUAGE) => ({
                      value: language,
                      label: intl.formatMessage({
                        id: `App.common.languages.${language}`,
                      }),
                    }))}
                    label={<FormattedMessage id="App.common.language" />}
                  />
                </Grid>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "20px -8px -8px 0px",
                }}
              >
                <div style={{ position: "relative" }}>
                  <Button
                    color="primary"
                    type="submit"
                    disabled={props.loading}
                  >
                    <FormattedMessage id="App.common.update" />
                  </Button>
                  {props.loading && (
                    <CircularProgress
                      size={20}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>
            </Paper>
          </form>
        );
      }}
    />
  );
};

export type IProfileProps = ConnectedProps<typeof connector> & {};
function _Profile(props: IProfileProps) {
  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page titleLocale="App.profile.profileTitle">
          {props.user && (
            <UserForm
              initialValues={props.user}
              loading={props.loading}
              updateUser={async (user) => {
                props.toggleSnackbar({
                  isOpen: true,
                  messageLocale: "App.profile.editProfile.success",
                  severity: "success",
                });
                await props.updateUser(user);
              }}
            />
          )}
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    loading: profileSelectors.selectLoading(state),
    user: commonSelectors.selectUser(state),
  }),
  { updateUser, toggleSnackbar }
);
const Profile = connector(_Profile);

export default Profile;
