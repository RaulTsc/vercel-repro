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
    // color: blue[400],
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

export const ReservationSystem = () => {
  const classes = useStyles();

  return (
    <div style={{ padding: "0px 20px", backgroundColor: "white" }}>
      <Typography variant="h6" className={classes.title}>
        <FormattedMessage id="App.home.reservationSystem.title" />
      </Typography>
      <img
        className={classes.image}
        src="/reservation_system.png"
        alt="reservation-system"
      />
      <ul className={classes.list}>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            A dashboard providing everything you need
          </Typography>
        </li>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            Easily add your reservations and blocked periods
          </Typography>
        </li>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            All bookings in one place
          </Typography>
        </li>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            Reporting on occupancy and revenue
          </Typography>
        </li>
        <li style={{ display: "flex", padding: "4px 0px" }}>
          <CheckIcon className={classes.icon} />
          <Typography variant="subtitle2" className={classes.listItemText}>
            Customer history
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
