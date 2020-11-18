import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import CheckIcon from "@material-ui/icons/LabelImportant";
import { makeStyles } from "@material-ui/core/styles";
import LinkButton from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import { productUrl } from "../../../app/helpers/navigation";
import { useRouter } from "next/router";
import * as languageService from "../../../app/services/languageService";
import { LANGUAGE } from "../../../app/interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
  inner: {
    padding: "0px 20px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    paddingTop: "40px",
    fontWeight: 600,
  },
  icon: {
    marginRight: "6px",
    fontSize: "20px",
    color: theme.palette.primary.light,
  },
  listItemText: {
    fontSize: "0.9375rem",
  },
  list: {
    listStyleType: "none",
    padding: "0px",
    margin: "30px 0px 10px 0px",
  },
  image: { maxWidth: "100%", marginTop: "30px" },
  descriptionContainer: {
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      paddingLeft: "200px",
    },
  },
}));

export const ChannelManager = () => {
  const classes = useStyles();
  const router = useRouter();
  const language: LANGUAGE = languageService.getLanguageByPathname(
    router.pathname
  );

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <Typography variant="h6" className={classes.title}>
          <FormattedMessage id="App.home.channelManager.title" />
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <img
              className={classes.image}
              src="/channel-manager.png"
              alt="channel-manager"
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.descriptionContainer}>
            <ul className={classes.list}>
              <li style={{ display: "flex", padding: "4px 0px" }}>
                <CheckIcon className={classes.icon} />
                <Typography
                  variant="subtitle2"
                  className={classes.listItemText}
                >
                  <FormattedMessage id="Website.home.channelManager.connectBookingAirbnb" />
                </Typography>
              </li>
              <li style={{ display: "flex", padding: "4px 0px" }}>
                <CheckIcon className={classes.icon} />
                <Typography
                  variant="subtitle2"
                  className={classes.listItemText}
                >
                  <FormattedMessage id="Website.home.channelManager.automaticSynchronization" />
                </Typography>
              </li>
              <li style={{ display: "flex", padding: "4px 0px" }}>
                <CheckIcon className={classes.icon} />
                <Typography
                  variant="subtitle2"
                  className={classes.listItemText}
                >
                  <FormattedMessage id="Website.home.channelManager.avoidDoubleBookings" />
                </Typography>
              </li>
              <li style={{ display: "flex", padding: "4px 0px" }}>
                <CheckIcon className={classes.icon} />
                <Typography
                  variant="subtitle2"
                  className={classes.listItemText}
                >
                  <FormattedMessage id="Website.home.channelManager.increaseOccupancy" />
                </Typography>
              </li>
              <li style={{ display: "flex", padding: "4px 0px" }}>
                <CheckIcon className={classes.icon} />
                <Typography
                  variant="subtitle2"
                  className={classes.listItemText}
                >
                  <FormattedMessage id="Website.home.channelManager.integrateOwnWebsite" />
                </Typography>
              </li>
              <li style={{ display: "flex", padding: "4px 0px" }}>
                <CheckIcon className={classes.icon} />
                <Typography
                  variant="subtitle2"
                  className={classes.listItemText}
                >
                  <FormattedMessage id="Website.home.channelManager.noExtraFees" />
                </Typography>
              </li>
            </ul>
            <div>
              <Link href={productUrl(language)}>
                <LinkButton
                  component="button"
                  variant="body1"
                  style={{ textDecoration: "underline" }}
                >
                  <FormattedMessage id="Website.home.learnMore" />
                </LinkButton>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
