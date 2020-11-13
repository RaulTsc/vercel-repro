import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import Link from "next/link";

const footerLegalBackgroundColor = "#eef2f4";
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "30px",
    width: "100%",
  },
  legalContainer: {
    backgroundColor: footerLegalBackgroundColor,
    padding: "20px 0px",
  },
  legal: {
    maxWidth: "1080px",
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
  },
  legalLinkContainer: {
    textDecoration: "none",
    paddingRight: "15px",
    marginRight: "15px",
    borderRight: `1px solid ${theme.palette.grey.A400}`,
  },
  footerMenuTitle: {
    fontWeight: 600,
    textTransform: "uppercase",
    paddingBottom: "10px",
    borderBottom: `1px solid ${theme.palette.grey.A200}`,
    color: theme.palette.grey.A100,
    letterSpacing: "0.5px",
    marginBottom: "18px",
    fontSize: "12px",
  },
  link: {
    color: theme.palette.grey.A400,
    lineHeight: 1.8,
    "&:hover": {
      color: theme.palette.grey.A700,
    },
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
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
  footer: {
    minHeight: "410px",
    position: "relative",
    maxWidth: "1080px",
    margin: "0 auto",
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
    marginTop: "30px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
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
      width: "75%",
    },
  },
  inner: {
    padding: "60px",
    [theme.breakpoints.down("xs")]: {
      padding: "40px",
    },
  },
  title: {
    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
}));

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
            fillOpacity=".35"
          ></path>
          <path
            d="M1920 0v29.7237781C1689.33854 194.640614 1390.184 251.491708 1022.53638 200.27706 568.814969 137.07202 198.918919 150.11433 0 269V0h1920z"
            fillOpacity=".17"
          ></path>
          <path
            d="M1919.999998 0v29.7237781c-223.98059 145.4796669-526.68468 188.5528329-908.11226 129.2194999C630.460153 99.609945 293.299854 122.962185.406838 229V0h1919.59316z"
            fillOpacity=".45"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export interface IFooterProps {
  hideWaves?: boolean;
  titleLocale: string;
  subtitleLocale?: string;
  buttonLocale: string;
}
export const Footer = (props: IFooterProps) => {
  const classes = useStyles();

  return (
    <div>
      {!props.hideWaves && (
        <div className={classes.footerContainer}>
          <FooterWaves />
          <div className={classes.footer}>
            <div className={classes.footerLearnMore}>
              <div
                style={{
                  background:
                    "linear-gradient( 60deg, #237CCA 0%, #1CA6B2 100% )",
                  height: "4px",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                }}
              ></div>
              <div className={classes.inner}>
                <Typography variant="h2" className={classes.title}>
                  <FormattedMessage id={props.titleLocale} />
                </Typography>
                {props.subtitleLocale && (
                  <Typography
                    variant="subtitle2"
                    className={classes.footerSubtitle}
                  >
                    <FormattedMessage id={props.subtitleLocale} />
                  </Typography>
                )}
                <Link href="/get-started">
                  <Button
                    color="primary"
                    className={classes.button}
                    style={{
                      marginTop: props.subtitleLocale ? "40px" : "20px",
                      width: "initial",
                    }}
                    variant="contained"
                  >
                    <a>
                      <FormattedMessage id={props.buttonLocale} />
                    </a>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="body2" className={classes.footerMenuTitle}>
            <FormattedMessage id="App.footer.product" />
          </Typography>
          <ul style={{ listStyleType: "none", padding: "0px" }}>
            <li>
              <Link href="/product">
                <Typography variant="body1" className={classes.link}>
                  <a>
                    <FormattedMessage id="App.footer.features" />
                  </a>
                </Typography>
              </Link>
            </li>
            <li>
              <Link href="/pricing">
                <Typography variant="body1" className={classes.link}>
                  <a>
                    <FormattedMessage id="App.footer.pricing" />
                  </a>
                </Typography>
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="body2" className={classes.footerMenuTitle}>
            <FormattedMessage id="App.footer.docsAndHelp" />
          </Typography>
          <ul style={{ listStyleType: "none", padding: "0px" }}>
            <li>
              <Link href="/get-started">
                <Typography variant="body1" className={classes.link}>
                  <a>
                    <FormattedMessage id="App.footer.helpCenter" />
                  </a>
                </Typography>
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="body2" className={classes.footerMenuTitle}>
            <FormattedMessage id="App.footer.company" />
          </Typography>
          <ul style={{ listStyleType: "none", padding: "0px" }}>
            <li>
              <Link href="/company">
                <Typography variant="body1" className={classes.link}>
                  <a>
                    <FormattedMessage id="App.footer.company" />
                  </a>
                </Typography>
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="body2" className={classes.footerMenuTitle}>
            <FormattedMessage id="App.footer.inquiries" />
          </Typography>
          <ul style={{ listStyleType: "none", padding: "0px" }}>
            <li>
              <Link href="/get-started">
                <Typography variant="body1" className={classes.link}>
                  <a>
                    <FormattedMessage id="App.footer.contact" />
                  </a>
                </Typography>
              </Link>
            </li>
            <li>
              <Link href="/get-started">
                <Typography variant="body1" className={classes.link}>
                  <a>
                    <FormattedMessage id="App.footer.support" />
                  </a>
                </Typography>
              </Link>
            </li>
          </ul>
        </Grid>
      </Grid>
      <div className={classes.legalContainer}>
        <div className={classes.legal}>
          <Link href="/legal">
            <Typography
              variant="body1"
              className={classes.link}
              style={{ lineHeight: 1, padding: "0px 10px" }}
            >
              <a>
                <FormattedMessage id="App.footer.legal" />
              </a>
            </Typography>
          </Link>
          <Link href="/privacy">
            <Typography
              variant="body1"
              className={classes.link}
              style={{ lineHeight: 1, padding: "0px 10px" }}
            >
              <a>
                <FormattedMessage id="App.footer.privacy" />
              </a>
            </Typography>
          </Link>
          <Link href="/security">
            <Typography
              variant="body1"
              className={classes.link}
              style={{ lineHeight: 1, padding: "0px 10px" }}
            >
              <a>
                <FormattedMessage id="App.footer.security" />
              </a>
            </Typography>
          </Link>
          <Link href="/log-in">
            <Typography
              variant="body1"
              className={classes.link}
              style={{ lineHeight: 1, padding: "0px 10px" }}
            >
              <a>
                <FormattedMessage id="App.footer.login" />
              </a>
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};
