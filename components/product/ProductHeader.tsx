import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "0 auto",
    },
  },
  gridContainer: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "80px 0px",
  },
  features: {
    textTransform: "uppercase",
    color: theme.palette.grey.A400,
    fontWeight: 700,
    letterSpacing: "1px",
  },
  featuresTitle: {
    marginTop: "20px",
    fontSize: "44px",
    fontWeight: 600,
    paddingRight: "30px",
    color: theme.palette.grey.A100,
    [theme.breakpoints.down("md")]: {
      fontSize: "36px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px",
    },
  },
  featuresDescription: {
    color: theme.palette.grey.A700,
    marginTop: "30px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
  },
}));

export const ProductHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" className={classes.features}>
            <FormattedMessage id="App.product.header.features" />
          </Typography>
          <Typography variant="h1" className={classes.featuresTitle}>
            <FormattedMessage id="App.product.header.features.title" />
          </Typography>
          <Typography variant="h6" className={classes.featuresDescription}>
            <FormattedMessage id="App.product.header.features.description" />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src="/CloudSystemImage.svg" alt="cloud-system" width="50%" />
        </Grid>
      </Grid>
    </div>
  );
};
