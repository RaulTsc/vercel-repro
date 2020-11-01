import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import yellow from "@material-ui/core/colors/yellow";
import CheckIcon from "@material-ui/icons/Check";
import grey from "@material-ui/core/colors/grey";
import { FormattedMessage } from "react-intl";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimerIcon from "@material-ui/icons/Timer";
import WebIcon from "@material-ui/icons/Web";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    backgroundColor: "#d7f0fa",
    backgroundImage:
      "linear-gradient(0deg, rgb(215, 240, 250) -20%, rgb(255, 255, 255) 85%, rgb(255, 255, 255) 100%)",
    marginBottom: "-4px",
  },
  header: {
    maxWidth: "1080px",
    margin: "0px auto",
    padding: "140px 0px 80px 0px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "40px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  },
  headerDescription: {
    color: theme.palette.grey.A100,
    padding: "0px 30px 30px 0px",
  },
  title: {
    fontWeight: 600,
    paddingBottom: "30px",
    color: theme.palette.grey.A100,
    fontSize: "36px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0px",
      fontSize: "30px",
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
  mainBody: {
    maxWidth: "1080px",
    margin: "0px auto",
    paddingTop: "80px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  appBarRoot: {
    backgroundColor: "white",
    position: "fixed",
    zIndex: 1300,
    top: "0px",
  },
  toolbarRoot: {
    padding: "0px 12px",
  },
  icon: {},
  checkIcon: {
    color: theme.palette.primary.main,
    fontSize: "20px",
    marginRight: "16px",
  },
  waves: {
    // height: "170px",
  },
  mainBodyContainer: {
    position: "relative",
    backgroundColor: "white",
    zIndex: 1000,
  },
  button: {
    borderRadius: "20px",
    textTransform: "none",
    padding: "6px 20px",
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
  whyUsButton: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
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
  footerContainer: {
    backgroundImage:
      "linear-gradient( -74deg, #23afba 0%, #298dbf var(--hero-footer-bg-gradient-x,50%), #306bc4 100% )",
    position: "relative",
    marginTop: "120px",
  },
  footerSubtitle: {
    padding: "0px 40px",
    color: theme.palette.grey.A100,
  },
  gameChangerContainer: {
    marginTop: "40px",
  },
  gameChangerBoxTitle: {
    fontWeight: 600,
    color: theme.palette.grey.A100,
    marginTop: "20px",
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
  footerLearnMore: {
    textAlign: "center",
    backgroundColor: "white",
    zIndex: 2,
    position: "relative",
    margin: "0 auto",
    borderRadius: "6px",
    boxShadow: "rgba(0, 0, 0, 0.07) 0px 5px 14px 2px",
    width: "70%",
    [theme.breakpoints.down("xs")]: {
      width: "85%",
    },
  },
}));

const Waves = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.waves}>
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
              <stop stop-color="#FFF" offset="0%"></stop>
              <stop stop-color="#FFF" offset="100%"></stop>
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
              fill-opacity=".3"
              fill="#FFF"
            ></path>
            <path
              d="M1 170.75V99C373.115 4.216 705.281-4.951 997.5 71.5c365.667 95.667 673.5 73.406 923.5-66.781l-1 166.031H1z"
              fill-opacity=".3"
              fill="#FFF"
            ></path>
            <path
              d="M1 170v-67C400.333-1.333 744.167-19 1032.5 50c432.5 103.5 754 19.219 888.5-45.281l-1 166.031L1 170z"
              fill-opacity=".35"
              fill="#FFF"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

const FooterWaves = () => {
  const classes = useStyles();

  return (
    <div className={classes.footerWaves}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1920 280"
      >
        <g fill="#fff" fill-rule="nonzero">
          <path d="M1920 0v19.386904c-211.21011 136.245161-517.56385 173.305269-919.06121 111.180324C679.06786 80.763131 345.421597 103.907388 0 200L-2 0h1922z"></path>
          <path
            d="M1920 5e-7v4C1667.96041 175.947611 1365.12512 235.086515 1011.49414 181.416714 361.105403 82.708636-2.15142107 200 .25415139 200 1.85786636 200 1.10648256 133.333334-2 5e-7h1922z"
            fill-opacity=".35"
          ></path>
          <path
            d="M1920 0v29.7237781C1689.33854 194.640614 1390.184 251.491708 1022.53638 200.27706 568.814969 137.07202 198.918919 150.11433 0 269V0h1920z"
            fill-opacity=".17"
          ></path>
          <path
            d="M1919.999998 0v29.7237781c-223.98059 145.4796669-526.68468 188.5528329-908.11226 129.2194999C630.460153 99.609945 293.299854 122.962185.406838 229V0h1919.59316z"
            fill-opacity=".45"
          ></path>
        </g>
      </svg>
    </div>
  );
};

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

export default () => {
  const classes = useStyles();

  return (
    <div>
      <Nav />
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
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
              <Link href="/get-started">
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
            </Grid>
            <Grid item sm={6} xs={12} className={classes.headerImage}>
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
      <div className={classes.mainBodyContainer}>
        <div className={classes.mainBody}>
          <Typography
            variant="h2"
            className={classes.title}
            style={{ textAlign: "center" }}
          >
            <FormattedMessage id="App.home.body.gameChanger.title" />
          </Typography>
          <Grid container spacing={2} className={classes.gameChangerContainer}>
            <Grid item xs={12} sm={4} className={classes.gameChangerBox}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#d7f0fa",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AttachMoneyIcon
                  style={{
                    fontSize: "32px",
                  }}
                />
              </div>
              <Typography variant="h5" className={classes.gameChangerBoxTitle}>
                Boost revenue
              </Typography>
              <Typography variant="subtitle2" style={{ marginTop: "8px" }}>
                Drive more direct, commission-free bookings from facebook,
                google and your own amazing website.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.gameChangerBox}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#d7f0fa",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TimerIcon
                  style={{
                    fontSize: "32px",
                  }}
                />
              </div>
              <Typography variant="h5" className={classes.gameChangerBoxTitle}>
                Finally time again
              </Typography>
              <Typography variant="subtitle2" style={{ marginTop: "8px" }}>
                We want to give you time for the things you love. Forget about
                boring admin stuff and let Hotelful handle it.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.gameChangerBox}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#d7f0fa",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <WebIcon
                  style={{
                    fontSize: "32px",
                  }}
                />
              </div>
              <Typography variant="h5" className={classes.gameChangerBoxTitle}>
                World class online presence
              </Typography>
              <Typography variant="subtitle2" style={{ marginTop: "8px" }}>
                Build an amazing website with just a few clicks and get that
                professional look your small hotel deserves.
              </Typography>
            </Grid>
          </Grid>
          <Typography
            variant="h2"
            style={{
              fontSize: "36px",
              textAlign: "center",
              fontWeight: 600,
              marginTop: "160px",
            }}
          >
            <FormattedMessage id="App.home.body.title1" />
          </Typography>
          <Typography
            variant="subtitle2"
            style={{ textAlign: "center", marginTop: "30px" }}
          >
            <FormattedMessage id="App.home.body.description1" />
          </Typography>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid
              item
              sm={6}
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                width="300px"
                alt="two-people-talking"
                src="/TwoPeopleTalkingImage.svg"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <MetricBox
                    title={
                      <FormattedMessage id="App.home.body.metric1.title" />
                    }
                    description={
                      <FormattedMessage id="App.home.body.metric1.description" />
                    }
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MetricBox
                    title={
                      <FormattedMessage id="App.home.body.metric2.title" />
                    }
                    description={
                      <FormattedMessage id="App.home.body.metric2.description" />
                    }
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MetricBox
                    title={
                      <FormattedMessage id="App.home.body.metric3.title" />
                    }
                    description={
                      <FormattedMessage id="App.home.body.metric3.description" />
                    }
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MetricBox
                    title={
                      <FormattedMessage id="App.home.body.metric4.title" />
                    }
                    description={
                      <FormattedMessage id="App.home.body.metric4.description" />
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography
            variant="h2"
            style={{
              fontSize: "36px",
              textAlign: "center",
              fontWeight: 600,
              marginTop: "160px",
            }}
          >
            <FormattedMessage id="App.home.body.title2" />
          </Typography>
          <Typography
            variant="subtitle2"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <FormattedMessage id="App.home.body.description2" />
          </Typography>
          <Grid container spacing={2} style={{ marginTop: "30px" }}>
            <Grid item sm={6} xs={12}>
              <Typography
                variant="subtitle2"
                style={{ padding: "0px 30px 30px 0px" }}
              >
                <FormattedMessage id="App.home.body.description3" />
              </Typography>
              <ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
                <li style={{ display: "flex", marginBottom: "10px" }}>
                  <CheckIcon className={classes.checkIcon} />
                  <Typography variant="subtitle2">
                    <strong>
                      <FormattedMessage id="App.home.body.howItWorks.list.1.bold" />
                    </strong>{" "}
                    <FormattedMessage id="App.home.body.howItWorks.list.1" />
                  </Typography>
                </li>
                <li style={{ display: "flex", marginBottom: "10px" }}>
                  <CheckIcon className={classes.checkIcon} />
                  <Typography variant="subtitle2">
                    <strong>
                      <strong>
                        <FormattedMessage id="App.home.body.howItWorks.list.2.bold" />
                      </strong>
                    </strong>{" "}
                    <FormattedMessage id="App.home.body.howItWorks.list.2" />
                  </Typography>
                </li>
                <li style={{ display: "flex", marginBottom: "10px" }}>
                  <CheckIcon className={classes.checkIcon} />
                  <Typography variant="subtitle2">
                    <strong>
                      <strong>
                        <FormattedMessage id="App.home.body.howItWorks.list.3.bold" />
                      </strong>
                    </strong>{" "}
                    <FormattedMessage id="App.home.body.howItWorks.list.3" />
                  </Typography>
                </li>
              </ul>
              <Link href="/product">
                <Button
                  color="primary"
                  className={classes.button}
                  variant="contained"
                  style={{ marginTop: "20px" }}
                >
                  <FormattedMessage id="App.home.body.seeOurFeatures" />
                </Button>
              </Link>
            </Grid>
            <Grid item sm={6} xs={12}>
              <div className={classes.featuresImageContainer}>
                <img
                  alt="laptop"
                  width="300px"
                  src="https://images.ctfassets.net/fo9twyrwpveg/4i6E7T8sdOMWuS8EAGgogK/d782cd32c2ac0efed769031fbe1f4b78/image_website.svg"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <Footer
        titleLocale="App.home.footer.title"
        subtitleLocale="App.home.footer.description"
        buttonLocale="App.common.requestDemo"
      />
    </div>
  );
};
