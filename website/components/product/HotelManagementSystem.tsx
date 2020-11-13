import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import SyncIcon from "@material-ui/icons/Sync";
import PeopleIcon from "@material-ui/icons/People";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "0 auto",
    },
  },
  container: {
    maxWidth: "1080px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    fontWeight: 600,
    color: theme.palette.grey.A100,
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

interface IHotelManagementSystemInfoBoxProps {
  image: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}
const HotelManagementSystemInfoBox = (
  props: IHotelManagementSystemInfoBoxProps
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

export const HotelManagementSystem = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h1" className={classes.title}>
          <FormattedMessage id="App.product.hotelManagementSystem.title" />
        </Typography>
        <Grid container spacing={2} className={classes.boxesContainer}>
          <Grid item sm={6} xs={12}>
            <HotelManagementSystemInfoBox
              image={
                <CalendarTodayIcon
                  style={{ fontSize: "32px", color: theme.palette.grey.A100 }}
                />
              }
              title={
                <Typography variant="subtitle2" className={classes.boxTitle}>
                  <FormattedMessage id="App.product.hotelManagementSystem.featureRichCalendar.title" />
                </Typography>
              }
              description={
                <Typography
                  variant="subtitle2"
                  className={classes.boxDescription}
                >
                  <FormattedMessage id="App.product.hotelManagementSystem.featureRichCalendar.description" />
                </Typography>
              }
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <HotelManagementSystemInfoBox
              image={
                <RecordVoiceOverIcon
                  style={{ fontSize: "32px", color: theme.palette.grey.A100 }}
                />
              }
              title={
                <Typography variant="subtitle2" className={classes.boxTitle}>
                  <FormattedMessage id="App.product.hotelManagementSystem.yourVoice.title" />
                </Typography>
              }
              description={
                <Typography
                  variant="subtitle2"
                  className={classes.boxDescription}
                >
                  <FormattedMessage id="App.product.hotelManagementSystem.yourVoice.description" />
                </Typography>
              }
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <HotelManagementSystemInfoBox
              image={
                <SyncIcon
                  style={{ fontSize: "32px", color: theme.palette.grey.A100 }}
                />
              }
              title={
                <Typography variant="subtitle2" className={classes.boxTitle}>
                  <FormattedMessage id="App.product.hotelManagementSystem.automaticSynchronisation.title" />
                </Typography>
              }
              description={
                <Typography
                  variant="subtitle2"
                  className={classes.boxDescription}
                >
                  <FormattedMessage id="App.product.hotelManagementSystem.automaticSynchronisation.description" />
                </Typography>
              }
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <HotelManagementSystemInfoBox
              image={
                <PeopleIcon
                  style={{ fontSize: "32px", color: theme.palette.grey.A100 }}
                />
              }
              title={
                <Typography variant="subtitle2" className={classes.boxTitle}>
                  <FormattedMessage id="App.product.hotelManagementSystem.guestManagement.title" />
                </Typography>
              }
              description={
                <Typography
                  variant="subtitle2"
                  className={classes.boxDescription}
                >
                  <FormattedMessage id="App.product.hotelManagementSystem.guestManagement.description" />
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
