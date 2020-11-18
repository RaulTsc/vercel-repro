import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles(() =>
  createStyles({
    label: (props: ICardItemProps) => ({
      fontSize: 13,
      marginBottom: 4,
    }),
    labelSpan: (props: ICardItemProps) => ({
      background: props.loading ? grey[200] : "initial",
      color: props.loading ? grey[200] : grey[600],
      borderRadius: props.loading ? 2 : 0,
    }),
    text: (props: ICardItemProps) => ({
      fontSize: 16,
      width: "100%",
      background: props.loading ? grey[300] : "initial",
      color: props.loading ? grey[300] : grey[900],
      borderRadius: props.loading ? 2 : 0,
    }),
  })
);

export interface ICardItemProps {
  className?: string;
  loading?: boolean;
  label?: React.ReactNode;
  text?: React.ReactNode;
  style?: React.CSSProperties;
}
const CardItem = (props: ICardItemProps) => {
  const classes = useStyles(props);

  return (
    <div className={props.className} style={props.style}>
      <div className={classes.label}>
        <span className={classes.labelSpan}>{props.label}</span>
      </div>
      <div className={classes.text}>
        <Typography variant="subtitle2">{props.text}</Typography>
      </div>
    </div>
  );
};

export default CardItem;
