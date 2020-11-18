import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
  inner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "160px 0px 80px 0px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  title: {
    marginBottom: "20px",
  },
  description: {
    color: theme.palette.grey.A700,
  },
  columnTitle: {
    fontWeight: 600,
    marginBottom: "20px",
    marginTop: "50px",
    color: theme.palette.grey.A700,
  },
  columnDescription: {
    color: theme.palette.grey.A700,
  },
  columnsContainer: {
    marginTop: "80px",
  },
}));

export const ProblemStart = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <Typography variant="h1" className={classes.title}>
          <FormattedMessage id="App.company.problemStart.title" />
        </Typography>
        <Typography variant="subtitle2" className={classes.description}>
          <FormattedMessage id="App.company.problemStart.description" />
        </Typography>
        <Grid container spacing={2} className={classes.columnsContainer}>
          <Grid item sm={6} xs={12}>
            <img
              src="https://images.ctfassets.net/fo9twyrwpveg/1fSDzLn3K5fLEE5z94Oyhn/2e4d28ee151048cc0cc24a355e34db1a/ForDevelopersByDevelopers.svg"
              alt="for-humans-by-humans"
              style={{ maxWidth: "240px" }}
            />
            <Typography variant="h3" className={classes.columnTitle}>
              <FormattedMessage id="App.company.problemStart.forHumansByHumans.title" />
            </Typography>
            <Typography
              variant="subtitle2"
              className={classes.columnDescription}
            >
              <FormattedMessage id="App.company.problemStart.forHumansByHumans.description" />
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <img
              src="https://images.ctfassets.net/fo9twyrwpveg/4LbsV0Z2MLuQ1qww17klMp/53254250917149c1966e3d18e67a2b0e/NewDigitalExperiences.svg"
              alt="better-digital-experience"
              style={{ maxWidth: "240px" }}
            />
            <Typography variant="h3" className={classes.columnTitle}>
              <FormattedMessage id="App.company.problemStart.betterDigitalExperience.title" />
            </Typography>
            <Typography
              variant="subtitle2"
              className={classes.columnDescription}
            >
              <FormattedMessage id="App.company.problemStart.betterDigitalExperience.description" />
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
