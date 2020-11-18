import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import { RootState } from "../../store";
import { getNameInitials, getFullName } from "../../services/commonService";
import { ICustomer } from "../../interfaces";
import { makeStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
  personalInfoContainer: {
    display: "flex",
  },
  fullName: {
    margin: 0,
    fontSize: 18,
  },
  phoneNumberEmail: {
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    marginLeft: "-4px",
    marginTop: 4,
    wordBreak: "break-word",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  nameEmailContainer: {
    marginLeft: 16,
  },
  personalInfoIcons: {
    color: grey[600],
    marginRight: 4,
  },
}));

type PropsFromRedux = ConnectedProps<typeof connector>;
export type ICustomerDetailsHeaderProps = PropsFromRedux & {
  customer: ICustomer;
};
export const _CustomerDetailsHeader = (props: ICustomerDetailsHeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.personalInfoContainer}>
      <Avatar aria-label="customer-details" className={classes.large}>
        {getNameInitials(props.customer)}
      </Avatar>
      <div className={classes.nameEmailContainer}>
        <h4 className={classes.fullName}>{getFullName(props.customer)}</h4>
        {props.customer?.phoneNumber && (
          <div className={classes.phoneNumberEmail}>
            <PhoneIphoneIcon className={classes.personalInfoIcons} />{" "}
            {props.customer?.phoneNumber}
          </div>
        )}
        {props.customer?.email && (
          <div className={classes.phoneNumberEmail}>
            <EmailIcon className={classes.personalInfoIcons} />
            {props.customer?.email}
          </div>
        )}
      </div>
    </div>
  );
};

const connector = connect((state: RootState) => ({}));
export const CustomerDetailsHeader = connector(_CustomerDetailsHeader);
