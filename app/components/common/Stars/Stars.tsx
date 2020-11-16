import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import yellow from "@material-ui/core/colors/yellow";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingRight: 32,
      marginTop: 664,
    },
    value: {
      color: grey[700],
      fontWeight: 600,
    },
    icon: {},
    stars: {
      color: yellow[700],
      alignSelf: "flex-end",
      marginLeft: 4,
    },
  })
);

export interface IStarsProps {
  value: number | undefined;
  showValue?: boolean;
  color?: string;
}
export const Stars = (props: IStarsProps) => {
  const classes = useStyles();
  const showValue = props.showValue ?? true;
  const value: number = props.value || 0;
  const showFirstHalfStar = value < 0.9;
  const showFirstStar = value >= 0.9;
  const showSecondHalfStar = value > 1 && value < 1.9;
  const showSecondStar = value >= 1.9;
  const showThirdHalfStar = value > 2 && value < 2.9;
  const showThirdStar = value >= 2.9;
  const showFourthHalfStar = value > 3 && value < 3.9;
  const showFourthStar = value >= 3.9;
  const showFifthHalfStar = value > 4 && value < 4.9;
  const showFifthStar = value >= 4.9;

  return (
    <div style={{ display: "flex" }}>
      {showValue && (
        <Typography variant="body1" className={classes.value}>
          {props.value}
        </Typography>
      )}
      <div className={classes.stars} style={{ color: props.color }}>
        {showFirstHalfStar && (
          <StarHalfIcon style={{ fontSize: 16 }} className={classes.icon} />
        )}
        {showFirstStar && (
          <StarIcon style={{ fontSize: 16 }} className={classes.icon} />
        )}
        {showSecondHalfStar && (
          <StarHalfIcon style={{ fontSize: 16 }} className={classes.icon} />
        )}
        {showSecondStar && (
          <StarIcon style={{ fontSize: 16 }} className={classes.icon} />
        )}
        {showThirdHalfStar && (
          <StarHalfIcon style={{ fontSize: 16 }} className={classes.icon} />
        )}
        {showThirdStar && (
          <StarIcon style={{ fontSize: 16 }} className={classes.icon} />
        )}
        {showFourthHalfStar && (
          <StarHalfIcon style={{ fontSize: 16 }} className={classes.icon} />
        )}
        {showFourthStar && (
          <StarIcon style={{ fontSize: 16 }} className={classes.icon} />
        )}
        {showFifthHalfStar && (
          <StarHalfIcon style={{ fontSize: 16 }} className={classes.icon} />
        )}
        {showFifthStar && (
          <StarIcon style={{ fontSize: 16 }} className={classes.icon} />
        )}
      </div>
    </div>
  );
};
