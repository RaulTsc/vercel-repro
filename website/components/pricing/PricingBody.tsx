import React from "react";
import Slider from "@material-ui/core/Slider";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { FormattedMessage } from "react-intl";
import CheckIcon from "@material-ui/icons/Check";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  container: {},
  containerInner: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "80px 0px",
    textAlign: "center",
  },
  slider: {
    width: "70%",
    height: "10px",
  },
  sliderRail: {
    height: "8px",
    borderRadius: "4px",
  },
  sliderTrack: {
    height: "8px",
    borderRadius: "4px",
  },
  sliderThumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover": {
      boxShadow: "inherit",
    },
  },
  sliderValueLabel: { left: "initial" },
  paper: {
    padding: "30px",
  },
}));

function CustomThumbComponent(props: any) {
  return (
    <div {...props}>
      <div
        style={{
          position: "absolute",
          top: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <KeyboardArrowLeftIcon style={{ fontSize: "20px", color: grey[500] }} />
        <Typography
          variant="body2"
          style={{ fontSize: "12px", color: grey[500] }}
        >
          DRAG
        </Typography>
        <KeyboardArrowRightIcon
          style={{ fontSize: "20px", color: grey[500] }}
        />
      </div>
      {props.children}
    </div>
  );
}

export const PricingBody = () => {
  const classes = useStyles();
  const [price, setPrice] = React.useState(20);

  return (
    <div className={classes.container}>
      <div className={classes.containerInner}>
        <Slider
          defaultValue={5}
          valueLabelFormat={(value) => {
            if (value < 32) {
              return `${value}`;
            }

            return "31+";
          }}
          aria-labelledby="discrete-slider-always"
          step={1}
          max={32}
          valueLabelDisplay="on"
          classes={{
            root: classes.slider,
            rail: classes.sliderRail,
            track: classes.sliderTrack,
            thumb: classes.sliderThumb,
            valueLabel: classes.sliderValueLabel,
          }}
          ThumbComponent={CustomThumbComponent}
          onChange={(_, value: any) => setPrice(value * 4)}
        />
        <Grid container spacing={0} style={{ marginTop: "80px" }}>
          <Grid item sm={6} xs={12}>
            <Paper className={classes.paper} elevation={6}>
              <Typography variant="h3" style={{ fontWeight: 600 }}>
                Visitor
              </Typography>
              <Typography variant="subtitle2" style={{ marginTop: "10px" }}>
                The all-in-one digital solution your hotel needs
              </Typography>
              <Typography
                variant="h1"
                style={{ fontSize: "48px", marginTop: "20px" }}
              >
                ${price}
              </Typography>
              <Typography variant="body1" style={{ marginTop: "-4px" }}>
                /month
              </Typography>
              <Link href="/get-started">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                >
                  <FormattedMessage id="App.common.tryForFree" />
                </Button>
              </Link>
            </Paper>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Paper
              className={classes.paper}
              style={{
                position: "relative",
                top: "30px",
                left: "-40px",
                backgroundColor: grey[200],
                zIndex: -1,
              }}
              elevation={0}
            >
              <ul style={{ listStyleType: "none", margin: "0px" }}>
                <li style={{ display: "flex" }}>
                  <CheckIcon style={{ marginRight: "10px" }} />
                  <Typography variant="body1" style={{ fontWeight: 700 }}>
                    Integration with Booking, Airbnb and Google
                  </Typography>
                </li>
                <li style={{ display: "flex", marginTop: "20px" }}>
                  <CheckIcon style={{ marginRight: "10px" }} />
                  <Typography variant="body1" style={{ fontWeight: 700 }}>
                    Easy to use direct booking technology
                  </Typography>
                </li>
                <li style={{ display: "flex", marginTop: "20px" }}>
                  <CheckIcon style={{ marginRight: "10px" }} />
                  <Typography variant="body1" style={{ fontWeight: 700 }}>
                    Website builder for a world class digital footprint
                  </Typography>
                </li>
                <li style={{ display: "flex", marginTop: "20px" }}>
                  <CheckIcon style={{ marginRight: "10px" }} />
                  <Typography variant="body1" style={{ fontWeight: 700 }}>
                    Front-desk management system
                  </Typography>
                </li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
