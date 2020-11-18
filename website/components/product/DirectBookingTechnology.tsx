import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import FacebookIcon from "@material-ui/icons/Facebook";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import SyncIcon from "@material-ui/icons/Sync";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "0 auto",
    },
  },
  container: {
    maxWidth: "1400px",
    margin: "120px auto 0px auto",
  },
  title: {
    textAlign: "center",
    fontWeight: 600,
    color: theme.palette.grey.A100,
  },
  description: {
    textAlign: "center",
    color: theme.palette.grey.A100,
    marginTop: "20px",
  },
  boxesContainer: {
    marginTop: "40px",
  },
  boxTitle: {
    fontWeight: 700,
    color: theme.palette.grey.A700,
  },
  boxDescription: {
    color: theme.palette.grey.A700,
  },
}));

const useInfoBoxStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  imageContainer: {
    height: "64px",
    width: "64px",
    backgroundColor: "#d7f0fa",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "24px",
  },
  title: {
    marginBottom: "8px",
  },
}));

interface IDirectBookingTechnologyInfoBoxProps {
  image: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}
const DirectBookingTechnologyInfoBox = (
  props: IDirectBookingTechnologyInfoBoxProps
) => {
  const classes = useInfoBoxStyles();

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.imageContainer}>{props.image}</div>
      </div>
      <div>
        <div className={classes.title}>{props.title}</div>
        <div>{props.description}</div>
      </div>
    </div>
  );
};

const GoogleSvg = (props: any) => (
  <svg
    width="2443"
    height="2500"
    viewBox="0 0 256 262"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    style={props.style}
  >
    <path
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      fill={props.fill}
    />
    <path
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      fill={props.fill}
    />
    <path
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      fill={props.fill}
    />
    <path
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      fill={props.fill}
    />
  </svg>
);

export const DirectBookingTechnology = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h1" className={classes.title}>
          <FormattedMessage id="App.product.directBookingTechnology.title" />
        </Typography>
        <Typography variant="subtitle2" className={classes.description}>
          <FormattedMessage id="App.product.directBookingTechnology.description" />
        </Typography>
        <Grid container spacing={2} className={classes.boxesContainer}>
          <Grid item sm={6} xs={12}>
            <DirectBookingTechnologyInfoBox
              image={
                <AttachMoneyIcon
                  style={{ fontSize: "32px", color: theme.palette.grey.A100 }}
                />
              }
              title={
                <Typography variant="subtitle2" className={classes.boxTitle}>
                  <FormattedMessage id="App.product.directBookingTechnology.directBookings.title" />
                </Typography>
              }
              description={
                <Typography
                  variant="subtitle2"
                  className={classes.boxDescription}
                >
                  <FormattedMessage id="App.product.directBookingTechnology.directBookings.description" />
                </Typography>
              }
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <DirectBookingTechnologyInfoBox
              image={
                <FacebookIcon
                  style={{ fontSize: "32px", color: theme.palette.grey.A100 }}
                />
              }
              title={
                <Typography variant="subtitle2" className={classes.boxTitle}>
                  <FormattedMessage id="App.product.hotelManagementSystem.facebook.title" />
                </Typography>
              }
              description={
                <Typography
                  variant="subtitle2"
                  className={classes.boxDescription}
                >
                  <FormattedMessage id="App.product.hotelManagementSystem.facebook.description" />
                </Typography>
              }
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <DirectBookingTechnologyInfoBox
              image={
                <GoogleSvg
                  style={{
                    height: "32px",
                    width: "32px",
                    fill: theme.palette.grey.A700,
                  }}
                />
              }
              title={
                <Typography variant="subtitle2" className={classes.boxTitle}>
                  <FormattedMessage id="App.product.hotelManagementSystem.google.title" />
                </Typography>
              }
              description={
                <Typography
                  variant="subtitle2"
                  className={classes.boxDescription}
                >
                  <FormattedMessage id="App.product.hotelManagementSystem.google.description" />
                </Typography>
              }
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <DirectBookingTechnologyInfoBox
              image={
                <LocalOfferIcon
                  style={{ fontSize: "32px", color: theme.palette.grey.A100 }}
                />
              }
              title={
                <Typography variant="subtitle2" className={classes.boxTitle}>
                  <FormattedMessage id="App.product.hotelManagementSystem.specialOffers.title" />
                </Typography>
              }
              description={
                <Typography
                  variant="subtitle2"
                  className={classes.boxDescription}
                >
                  <FormattedMessage id="App.product.hotelManagementSystem.specialOffers.description" />
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
