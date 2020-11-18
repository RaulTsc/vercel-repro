import * as React from "react";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { IBooking } from "../../interfaces";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { getFullName, getNameInitials } from "../../services/commonService";

const useStyles = makeStyles((theme) =>
  createStyles({
    large: (props: BookingDetailsHeaderProps) => ({
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: props.loading ? grey[200] : grey[50],
      backgroundColor: props.loading ? grey[200] : undefined,
    }),
    personalInfoContainer: {
      display: "flex",
    },
    fullName: (props: BookingDetailsHeaderProps) => ({
      margin: 0,
      fontSize: 18,
      color: props.loading ? grey[300] : undefined,
      backgroundColor: props.loading ? grey[300] : undefined,
    }),
    phoneNumberEmail: (props: BookingDetailsHeaderProps) => ({
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      marginTop: 8,
      color: props.loading ? grey[200] : undefined,
      backgroundColor: props.loading ? grey[200] : undefined,
      wordBreak: "break-word",
    }),
    nameEmailContainer: {
      marginLeft: 16,
    },
    personalInfoIcons: (props: BookingDetailsHeaderProps) => ({
      marginRight: 8,
      color: props.loading ? grey[200] : grey[600],
      backgroundColor: props.loading ? grey[200] : undefined,
    }),
  })
);

type BookingDetailsHeaderProps = {
  loading: boolean;
  booking: IBooking | null;
};
const BookingDetailsHeader = (props: BookingDetailsHeaderProps) => {
  const classes = useStyles(props);

  return (
    <Paper elevation={0} style={{ padding: "20px" }}>
      <div className={classes.personalInfoContainer}>
        <Avatar aria-label="customer-details" className={classes.large}>
          {getNameInitials(props.booking?.customer)}
        </Avatar>
        <div className={classes.nameEmailContainer}>
          <h4 className={classes.fullName}>
            {getFullName(props.booking?.customer)}
          </h4>
          {props.booking?.customer?.phoneNumber && (
            <div className={classes.phoneNumberEmail}>
              <PhoneIphoneIcon className={classes.personalInfoIcons} />{" "}
              {props.booking?.customer?.phoneNumber}
            </div>
          )}
          {props.booking?.customer?.email && (
            <div className={classes.phoneNumberEmail}>
              <EmailIcon className={classes.personalInfoIcons} />
              <div style={{ lineHeight: "14px" }}>
                {props.booking?.customer?.email}
              </div>
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
};

export default BookingDetailsHeader;
