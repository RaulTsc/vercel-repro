import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import grey from "@material-ui/core/colors/grey";

const ratingColor = "#fabd05";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    fullIcon: (props: IRatingProps) => ({
      color: ratingColor,
      height: props.size || "36px",
      width: props.size || "36px",
      cursor: props.readOnly ? "initial" : "pointer",
    }),
    emptyIcon: (props: IRatingProps) => ({
      color: grey[700],
      height: props.size || "36px",
      width: props.size || "36px",
      cursor: props.readOnly ? "initial" : "pointer",
    }),
  })
);
export type IRatingProps = {
  readOnly?: boolean;
  defaultValue: number;
  size?: string;
  onChange?: (value: number) => void;
};
export const Rating = (props: IRatingProps) => {
  const classes = useStyles(props);
  const [rating, setRating] = React.useState(props.defaultValue);
  const maxValue = 5;
  const values = Array(maxValue)
    .fill(true, 0, rating)
    .fill(false, rating, maxValue);

  return (
    <div className={classes.root}>
      {values.map((value, index) => {
        if (value) {
          return (
            <StarIcon
              className={classes.fullIcon}
              onClick={() => {
                if (props.readOnly) {
                  return;
                }

                setRating(index + 1);
                if (props.onChange) {
                  props.onChange(index + 1);
                }
              }}
            />
          );
        }

        return (
          <StarBorderIcon
            className={classes.emptyIcon}
            onClick={() => {
              if (props.readOnly) {
                return;
              }

              setRating(index + 1);
              if (props.onChange) {
                props.onChange(index + 1);
              }
            }}
          />
        );
      })}
    </div>
  );
};
