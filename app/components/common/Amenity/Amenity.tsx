import React from "react";
import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "react-intl";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { IRoomTypeAmenity, ICompanyAmenity } from "../../../interfaces";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 20,
    color: grey[700],
    marginRight: 12,
  },
}));

type ICompanyAmenityProps = {
  amenity: ICompanyAmenity | IRoomTypeAmenity;
};
export const Amenity = (props: ICompanyAmenityProps) => {
  const classes = useStyles();
  const showLocale =
    !Boolean(props.amenity.text) && Boolean(props.amenity.locale);
  const isPetsForbidden =
    props.amenity.locale === "App.common.amenities.petsNotAccepted";

  return (
    <div style={{ display: "flex" }}>
      {isPetsForbidden && <CloseIcon className={classes.icon} />}
      {!isPetsForbidden && <CheckIcon className={classes.icon} />}
      <Typography variant="body1">
        {props.amenity.text && <span>{props.amenity.text}</span>}
        {showLocale && <FormattedMessage id={props.amenity.locale as string} />}
      </Typography>
    </div>
  );
};
