import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import CheckIcon from "@material-ui/icons/LabelImportant";
import { makeStyles } from "@material-ui/core/styles";
import LinkButton from "@material-ui/core/Link";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
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
}));

export const DirectBookingTechnology = () => {
  const classes = useStyles();

  return (
    <div style={{ padding: "0px 20px", backgroundColor: "white" }}>
      <Typography variant="h6" className={classes.title}>
        <FormattedMessage id="App.home.directBookingTechnology.title" />
      </Typography>
      <img
        className={classes.image}
        src="/direct_booking_technology.png"
        alt="direct-booking-technology"
      />
      <ul className={classes.list}>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            Direct integration with website
          </Typography>
        </li>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            Booking engine
          </Typography>
        </li>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            Ultra-fast and mobile friendly
          </Typography>
        </li>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            Uses social proof techniques to boost sales
          </Typography>
        </li>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            Easily highlight your promotions
          </Typography>
        </li>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            Connect with Google Hotel Ads
          </Typography>
        </li>
      </ul>
      <Link href="/product">
        <LinkButton
          component="button"
          variant="body1"
          style={{ textDecoration: "underline" }}
        >
          Learn more
        </LinkButton>
      </Link>
    </div>
  );
};
