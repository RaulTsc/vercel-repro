import React from "react";
import MuiButton, {
  ButtonProps as MuiButtonProps,
} from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "20px",
    textTransform: "none",
    padding: "6px 24px !important",
    fontSize: "16px",
    fontWeight: 600,
    boxShadow: "none !important",
    height: "40px",
  },
}));

export const Button = (props: MuiButtonProps) => {
  const classes = useStyles();

  return (
    <MuiButton classes={classes} {...props}>
      {props.children}
    </MuiButton>
  );
};
