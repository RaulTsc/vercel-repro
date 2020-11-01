import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { HeaderWaves } from "../../../components/HeaderWaves";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#d7f0fa",
    backgroundImage:
      "linear-gradient(0deg, rgb(215, 240, 250) -20%, rgb(255, 255, 255) 85%, rgb(255, 255, 255) 100%)",
    marginBottom: "-4px",
  },
  containerInner: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "80px 0px",
    textAlign: "center",
  },
  title: {
    marginBottom: "30px",
    fontSize: "44px",
  },
  customersTitle: {
    color: theme.palette.grey.A700,
    maxWidth: "150px",
  },
}));

export const CompanyHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.containerInner}>
        <Typography variant="h1" className={classes.title}>
          <FormattedMessage id="App.company.header.title" />
        </Typography>
        <Typography variant="subtitle2">
          <FormattedMessage id="App.company.header.description" />
        </Typography>
      </div>
      <HeaderWaves />
    </div>
  );
};
