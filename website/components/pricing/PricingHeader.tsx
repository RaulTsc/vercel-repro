import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  container: {},
  containerInner: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "160px 0px 0px 0px",
    textAlign: "center",
  },
  title: {
    marginBottom: "30px",
    fontSize: "44px",
  },
  subtitle: {
    color: theme.palette.grey.A700,
  },
}));

export interface IPricingHeaderProps {}
export const PricingHeader = (props: IPricingHeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.containerInner}>
        <Typography variant="h1" className={classes.title}>
          <FormattedMessage id="App.pricing.header.title" />
        </Typography>
        <Typography variant="h6" className={classes.subtitle}>
          <FormattedMessage id="App.pricing.header.description" />
        </Typography>
      </div>
    </div>
  );
};
