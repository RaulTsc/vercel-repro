import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import yellow from "@material-ui/core/colors/yellow";
import CheckIcon from "@material-ui/icons/Check";
import grey from "@material-ui/core/colors/grey";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimerIcon from "@material-ui/icons/Timer";
import WebIcon from "@material-ui/icons/Web";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { ChannelManager } from "../components/home/ChannelManager";
import { ReservationSystem } from "../components/home/ReservationSystem";
import { OwnBookingWebsite } from "../components/home/OwnBookingWebsite";
import { DirectBookingTechnology } from "../components/home/DirectBookingTechnology";
import { Header } from "../components/home/Header";
import { Helmet } from "react-helmet";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    paddingBottom: "30px",
    color: theme.palette.grey.A100,
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0px",
      fontSize: "30px",
      lineHeight: "40px",
    },
  },
  gameChangerTitle: {
    textAlign: "center",
    marginTop: "80px",
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "160px",
      fontSize: "2rem",
    },
  },
  mainBody: {
    maxWidth: "1080px",
    margin: "0px auto",
    paddingTop: "40px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  checkIcon: {
    color: theme.palette.primary.main,
    fontSize: "20px",
    marginRight: "16px",
  },
  mainBodyContainer: {
    position: "relative",
    backgroundColor: "white",
    zIndex: 1000,
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
  footer: {
    minHeight: "410px",
    position: "relative",
    maxWidth: "1080px",
    margin: "0 auto",
  },
  footerWaves: {
    position: "absolute",
    zIndex: 2,
    left: "50%",
    top: "0px",
    transform: "translateX(-51%)",
    width: "102%",
    overflow: "hidden",
    userSelect: "none",
    height: "280px",
  },
  gameChangerContainer: {
    marginTop: "40px",
  },
  gameChangerBoxTitle: {
    fontWeight: 600,
    color: theme.palette.grey.A100,
  },
  gameChangerBox: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
    },
  },
  featuresImageContainer: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
    },
  },
}));

const dividerColor = "#dbe3e7";
const useMetricBoxStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    fontSize: "36px",
    fontWeight: 600,
    textAlign: "center",
    padding: "12px",
  },
  divider: {
    height: "1px",
    width: "60%",
    backgroundColor: dividerColor,
    margin: "0px auto",
  },
  description: {
    textAlign: "center",
    padding: "12px",
  },
}));

interface IMetricBoxProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}
const MetricBox = (props: IMetricBoxProps) => {
  const classes = useMetricBoxStyles();

  return (
    <div>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.divider}></div>
      <Typography variant="subtitle2" className={classes.description}>
        {props.description}
      </Typography>
    </div>
  );
};

const Home = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage({ id: "App.common.pageTitle" })}</title>
      </Helmet>
      <Nav />
      <Header />
      <ChannelManager />
      <ReservationSystem />
      <OwnBookingWebsite />
      <DirectBookingTechnology />
      <Footer
        titleLocale="App.home.footer.title"
        subtitleLocale="App.home.footer.description"
        buttonLocale="App.common.requestDemo"
      />
    </div>
  );
};

export default Home;
