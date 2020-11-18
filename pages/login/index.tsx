import React from "react";
import Paper from "@material-ui/core/Paper";
import { connect, ConnectedProps } from "react-redux";
import Grid from "@material-ui/core/Grid";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Nav from "../../app/components/common/Nav/Nav";
import Page from "../../app/components/common/Page/Page";
import { PageContainer } from "../../app/components/common/PageContainer/PageContainer";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import FormTextField from "../../app/components/common/formFields/FormTextField";
import LinkButton from "@material-ui/core/Link";
import Head from "next/head";
import { email } from "../../app/services/validatorsService";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";
import { signup, resetPassword } from "../../app/helpers/navigation";
import Link from "next/link";
import { RootState } from "../../app/store";
import { login } from "../../app/slices/authSlice";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: grey[700],
  },
  paper: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "24px 20px 20px 20px",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
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

type PropsFromRedux = ConnectedProps<typeof connector>;
export type ISignInProps = PropsFromRedux & {
  loading?: boolean;
};
function _SigninPage(props: ISignInProps) {
  const classes = useStyles();
  const intl = useIntl();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <PageContainer>
      <Head>
        <title key="title">
          {intl.formatMessage({ id: "App.login.title" })}
        </title>
      </Head>
      <Nav hideMobileMenu hideRightButtons />
      <div style={{ paddingTop: "160px" }}>
        <Paper elevation={0} className={classes.paper}>
          <Form
            onSubmit={async (credentials: any) => {
              await props.login(credentials);
            }}
            render={({ handleSubmit }: any) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormTextField
                        fullWidth
                        required
                        name="email"
                        variant="outlined"
                        disabled={props.loading}
                        label={<FormattedMessage id="App.common.email" />}
                        validate={[email]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon className={classes.icon} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        fullWidth
                        required
                        name="password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        disabled={props.loading}
                        label={<FormattedMessage id="App.common.password" />}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon className={classes.icon} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <Visibility className={classes.icon} />
                                ) : (
                                  <VisibilityOff className={classes.icon} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ position: "relative", width: "100%" }}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={props.loading}
                        >
                          <FormattedMessage id="App.common.login" />
                        </Button>
                        {props.loading && (
                          <CircularProgress
                            size={20}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link href={signup()}>
                        <LinkButton
                          type="button"
                          component="button"
                          variant="body1"
                        >
                          <FormattedMessage id="App.common.signup" />
                        </LinkButton>
                      </Link>
                      <Link href={resetPassword()}>
                        <LinkButton
                          type="button"
                          component="button"
                          variant="body1"
                        >
                          <FormattedMessage id="App.common.resetPassword" />
                        </LinkButton>
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          />
        </Paper>
      </div>
    </PageContainer>
  );
}

_SigninPage.getInitialProps = async (context) => {
  return {};
};

const connector = connect((state: RootState) => ({}), { login });
const SigninPage = connector(_SigninPage);
export default SigninPage;
