import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import yellow from "@material-ui/core/colors/yellow";
import CheckIcon from "@material-ui/icons/Check";
import { FormattedMessage } from "react-intl";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimerIcon from "@material-ui/icons/Timer";
import WebIcon from "@material-ui/icons/Web";
import Link from "next/link";
import { Button } from "../common/Button";
import { getStartedUrl, productUrl } from "../../../app/helpers/navigation";
import { useRouter } from "next/router";
import * as languageService from "../../../app/services/languageService";
import { LANGUAGE } from "../../../app/interfaces";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    backgroundColor: "#d7f0fa",
    backgroundImage:
      "linear-gradient(0deg, rgb(215, 240, 250) -20%, rgb(255, 255, 255) 85%, rgb(255, 255, 255) 100%)",
    marginBottom: "-8px",
  },
  header: {
    maxWidth: "1400px",
    margin: "0px auto",
    padding: "120px 0px 80px 0px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "40px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "20px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  },
  headerDescription: {
    color: theme.palette.grey.A100,
    padding: "20px 0px 30px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 0px 20px 0px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px 10px 30px 10px",
      textAlign: "center",
    },
  },
  headerColumns: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  title: {
    fontWeight: 600,
    color: theme.palette.grey.A100,
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
      lineHeight: "40px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "28px",
      lineHeight: "40px",
      padding: "30px 10px 20px 10px",
      textAlign: "center",
    },
  },
  paddingRightSmUp: {
    [theme.breakpoints.up("sm")]: {
      paddingRight: "100px",
    },
  },
  headerImage: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "40px",
    },
  },
  button: {
    borderRadius: "20px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 600,
    boxShadow: "none",
    height: "40px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  tryForFreeButton: {
    [theme.breakpoints.up("xs")]: {
      marginRight: "16px",
    },
  },
  whyVisitorButton: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
  },
  whyUsButton: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
  },
}));

const Waves = () => {
  return (
    <div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1920 170"
        >
          <defs>
            <linearGradient
              x1="49.253%"
              y1="85.804%"
              x2="49.253%"
              y2="43.074%"
              id="a"
            >
              <stop stopColor="#FFF" offset="0%"></stop>
              <stop stopColor="#FFF" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g fill="none">
            <path
              d="M1920 4.719v69.5c-362.63 60.036-692.797 55.536-990.5-13.5C565.833-23.615 256 12.813 0 170L1 4.719h1919z"
              fill="url(#a)"
              transform="rotate(180 960.5 87.36)"
            ></path>
            <path
              d="M1 170V99c269.033-70.44 603.533-66.44 1003.5 12C1494 207 1921 4.719 1921 4.719L1920 170H1z"
              fillOpacity=".3"
              fill="#FFF"
            ></path>
            <path
              d="M1 170.75V99C373.115 4.216 705.281-4.951 997.5 71.5c365.667 95.667 673.5 73.406 923.5-66.781l-1 166.031H1z"
              fillOpacity=".3"
              fill="#FFF"
            ></path>
            <path
              d="M1 170v-67C400.333-1.333 744.167-19 1032.5 50c432.5 103.5 754 19.219 888.5-45.281l-1 166.031L1 170z"
              fillOpacity=".35"
              fill="#FFF"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

export const Header = () => {
  const classes = useStyles();
  const router = useRouter();
  const language: LANGUAGE = languageService.getLanguageByPathname(
    router.pathname
  );

  return (
    <div className={classes.headerContainer}>
      <div className={classes.header}>
        <Grid container spacing={2} className={classes.headerColumns}>
          <Grid item md={6} sm={12}>
            <Typography
              variant="h1"
              className={clsx(classes.title, classes.paddingRightSmUp)}
            >
              <FormattedMessage id="App.home.header.title" />
            </Typography>
            <Typography
              variant="subtitle2"
              className={classes.headerDescription}
            >
              <FormattedMessage id="App.home.header.description" />
            </Typography>
            <div>
              <Link href={getStartedUrl(language)}>
                <Button
                  variant="contained"
                  color="primary"
                  className={clsx(classes.button, classes.tryForFreeButton)}
                  style={{
                    marginRight: "16px",
                  }}
                >
                  <FormattedMessage id="App.common.getStarted" />
                </Button>
              </Link>
              <Link href={productUrl(language)}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={clsx(classes.button, classes.whyVisitorButton)}
                >
                  <FormattedMessage id="App.home.header.whyVisitor" />
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid item md={6} sm={12} className={classes.headerImage}>
            <img
              alt="header"
              width="100%"
              src="https://images.ctfassets.net/fo9twyrwpveg/64k7ghmRs0Vh6QPmUGAO9U/ea71f74e1bc677ada618bb5ad8071ff0/Screenshot_2020-10-05_at_16.25.44.png?q=10&w=1080"
            />
          </Grid>
        </Grid>
      </div>
      <Waves />
    </div>
  );
};
