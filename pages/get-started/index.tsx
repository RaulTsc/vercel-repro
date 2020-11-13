import React from "react";
import { Footer } from "../../website/components/Footer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage, useIntl } from "react-intl";
import Link from "next/link";
import { Nav } from "../../website/components/Nav";

const useStyles = makeStyles((theme) => ({
  inner: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "160px 0px 80px 0px",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  getInTouch: {
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    fontWeight: 700,
    color: theme.palette.grey.A400,
  },
  title: {
    fontSize: "44px",
    color: theme.palette.grey.A700,
    fontWeight: 600,
    marginTop: "30px",
  },
  description: {
    color: theme.palette.grey.A400,
    marginTop: "30px",
  },
  letsTalk: {
    textAlign: "center",
    fontWeight: 600,
    color: theme.palette.grey.A700,
  },
  rightColumn: {
    flex: 5,
    padding: "0px 40px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "40px",
    },
  },
}));

export default function GetStarted() {
  const classes = useStyles();
  const theme = useTheme();
  const intl = useIntl();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [hotelDescription, setHotelDescription] = React.useState("");

  return (
    <div>
      <Nav />
      <div className={classes.inner}>
        <div style={{ flex: 5, padding: "0px 40px" }}>
          <Typography variant="body1" className={classes.getInTouch}>
            <FormattedMessage id="App.getStarted.getInTouch" />
          </Typography>
          <Typography variant="h1" className={classes.title}>
            <FormattedMessage id="App.getStarted.title" />
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
            <FormattedMessage id="App.getStarted.description" />
          </Typography>
        </div>
        <div className={classes.rightColumn}>
          <Paper elevation={6} style={{ padding: "32px" }}>
            <Typography variant="h2" className={classes.letsTalk}>
              <FormattedMessage id="App.getStarted.letsTalk" />
            </Typography>

            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  value={firstName}
                  label={<FormattedMessage id="App.common.firstName" />}
                  onChange={(event) => {
                    const value = event.target.value;
                    setFirstName(value);
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  value={lastName}
                  label={<FormattedMessage id="App.common.lastName" />}
                  onChange={(event) => {
                    const value = event.target.value;
                    setLastName(value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={email}
                  label={<FormattedMessage id="App.common.email" />}
                  onChange={(event) => {
                    const value = event.target.value;
                    setEmail(value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={phoneNumber}
                  label={<FormattedMessage id="App.common.phoneNumber" />}
                  onChange={(event) => {
                    const value = event.target.value;
                    setPhoneNumber(value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  rowsMax={10}
                  value={hotelDescription}
                  label={<FormattedMessage id="App.common.hotelDescription" />}
                  onChange={(event) => {
                    const value = event.target.value;
                    setHotelDescription(value);
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    await fetch("/api/contact", {
                      method: "post",
                      body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        hotelDescription,
                      }),
                    });
                  }}
                >
                  <FormattedMessage id="App.common.submit" />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  style={{
                    color: theme.palette.grey.A700,
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  <FormattedMessage
                    id="App.getStarted.submit.acceptTos"
                    values={{
                      termsOfService: (
                        <Link href="/tos">
                          <a style={{ color: theme.palette.primary.main }}>
                            {intl.formatMessage({
                              id:
                                "App.getStarted.submit.acceptTos.termsOfService",
                            })}
                          </a>
                        </Link>
                      ),
                      privacyPolicy: (
                        <Link href="/privacy">
                          <a style={{ color: theme.palette.primary.main }}>
                            {intl.formatMessage({
                              id:
                                "App.getStarted.submit.acceptTos.privacyPolicy",
                            })}
                          </a>
                        </Link>
                      ),
                    }}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
      <div style={{ height: "500px" }}></div>
      <Footer
        hideWaves
        titleLocale="App.pricing.footer.title"
        buttonLocale="App.company.footer.button"
      />
    </div>
  );
}
