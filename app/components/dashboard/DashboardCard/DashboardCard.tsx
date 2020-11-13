import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: (props: IDashboardCardProps) => ({
      backgroundColor: "white",
      padding: "20px",
      boxShadow: "0 0 14px 0 rgba(53,64,82,.05)",
      borderRadius: "4px",
      cursor: props.raiseOnHover ? "pointer" : "initial",

      "&:hover": {
        boxShadow: props.raiseOnHover
          ? "1px 3px 6px rgba(0, 0, 0, 0.15), 2px 3px 4px rgba(0, 0, 0, 0.15) !important"
          : "initial",
      },
    }),
    title: {
      marginBottom: "10px",
    },
  })
);

export interface IDashboardCardProps {
  raiseOnHover?: boolean;
  title?: React.ReactNode;
  label?: React.ReactNode;
  onClick?: () => void;
}
function DashboardCard(props: IDashboardCardProps) {
  const classes = useStyles(props);

  return (
    <Paper elevation={0} className={classes.root} onClick={props.onClick}>
      <Typography variant="subtitle2" className={classes.title}>
        {props.title}
      </Typography>
      <Typography variant="h6">{props.label}</Typography>
    </Paper>
  );
}

export default DashboardCard;
