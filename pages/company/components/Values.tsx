import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";
import { useMediaQuery } from "@material-ui/core";

export function useWidth() {
  const theme: Theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: any, key: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.only(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
  inner: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "160px 0px 80px 0px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "26px",
    },
  },
  description: {
    color: theme.palette.grey.A700,
    textAlign: "center",
  },
  columnTitle: {
    fontWeight: 700,
    marginBottom: "10px",
    marginTop: "10px",
    color: theme.palette.grey.A700,
  },
  columnDescription: {
    color: theme.palette.grey.A700,
  },
  columnsContainer: {
    marginTop: "80px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
    },
  },
  column: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
    },
  },
}));

export const Values = () => {
  const classes = useStyles();
  const width = useWidth();
  const spacing = width === "xs" ? 0 : 10;

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <Typography variant="h1" className={classes.title}>
          <FormattedMessage id="App.company.values.title" />
        </Typography>
        <Typography variant="subtitle2" className={classes.description}>
          <FormattedMessage id="App.company.values.description" />
        </Typography>
        <Grid container spacing={spacing} className={classes.columnsContainer}>
          <Grid item sm={6} xs={12} className={classes.column}>
            <div>
              <img
                src="https://images.ctfassets.net/fo9twyrwpveg/3H8TlAHqWGMcWil9Va2WA3/92f155c4faab1661ef529b3d5d66184e/Be_humble_emoji.png"
                alt="be-humble"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <Typography variant="subtitle2" className={classes.columnTitle}>
                <FormattedMessage id="App.company.values.beHumble.title" />
              </Typography>
              <Typography
                variant="subtitle2"
                className={classes.columnDescription}
              >
                <FormattedMessage id="App.company.values.beHumble.description" />
              </Typography>
            </div>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.column}>
            <div>
              <img
                src="https://images.ctfassets.net/fo9twyrwpveg/58SnASgVyjhHZojLrGmpGM/8a1cfa0514a4972a577c75d72fde90cf/Start_with_the_customer_emoji.png"
                alt="work-backwards"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <Typography variant="subtitle2" className={classes.columnTitle}>
                <FormattedMessage id="App.company.values.workBackwards.title" />
              </Typography>
              <Typography
                variant="subtitle2"
                className={classes.columnDescription}
              >
                <FormattedMessage id="App.company.values.workBackwards.description" />
              </Typography>
            </div>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.column}>
            <div>
              <img
                src="https://images.ctfassets.net/fo9twyrwpveg/a5S8TCbs2ICz8kBJc66FJ/1c74d3c15145f95fcb200f728d4ce17d/Growth_mindset_emoji.png"
                alt="growth-mindset"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <Typography variant="subtitle2" className={classes.columnTitle}>
                <FormattedMessage id="App.company.values.growthMindset.title" />
              </Typography>
              <Typography
                variant="subtitle2"
                className={classes.columnDescription}
              >
                <FormattedMessage id="App.company.values.growthMindset.description" />
              </Typography>
            </div>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.column}>
            <div>
              <img
                src="https://images.ctfassets.net/fo9twyrwpveg/5w7lEg7LFtW6vWGhK99uOY/70869bcbbbb559303490b5e2c5280a10/Strive_together_emoji.png"
                alt="strive-together"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <Typography variant="subtitle2" className={classes.columnTitle}>
                <FormattedMessage id="App.company.values.striveTogether.title" />
              </Typography>
              <Typography
                variant="subtitle2"
                className={classes.columnDescription}
              >
                <FormattedMessage id="App.company.values.striveTogether.description" />
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
