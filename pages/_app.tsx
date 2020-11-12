import App from "next/app";
import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import IntlProvider from "../components/IntlProvider";

import getLocale from "../utils/getLocale";
import getMessages from "../utils/getMessages";

import "../styles/globals.css";

if (typeof window === "undefined") {
  // dom parser for FormatedHTMLMessages
  global.DOMParser = new (require("jsdom").JSDOM)().window.DOMParser;
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2478cc",
    },
    grey: {
      A100: "#2a3039",
      A200: "#dbe3e7",
      A400: "#8091a5",
      A700: "#536171",
    },
  },
  typography: {
    fontFamily: `"Nunito", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontSize: "2.375rem", // 38px
      lineHeight: "48px",
      color: "#2a3039",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem", // 30px
      color: "#2a3039",
    },
    h3: {
      fontSize: "1.625rem", // 26px
      color: "#2a3039",
    },
    h4: {
      fontSize: "1.5rem", // 24px
      color: "#2a3039",
    },
    h5: {
      fontSize: "1.375rem", // 22px
      color: "#2a3039",
    },
    h6: {
      fontSize: "1.25rem", // 20px
      color: "#2a3039",
    },
    subtitle1: {
      fontSize: "1.125rem", // 18px
      color: "#2a3039",
    },
    subtitle2: {
      fontSize: "1rem", // 16px
      color: "#2a3039",
    },
    body1: {
      fontSize: "0.875rem", // 14px
      color: "#2a3039",
    },
    body2: {
      fontSize: "0.8125rem", // 13px
      color: "#2a3039",
    },
  },
  overrides: {
    MuiPaper: {
      elevation0: {
        boxShadow:
          "0px -1px 1px rgba(0,0,0,0.04), 1px 0px 1px rgba(0,0,0,0.04), -1px 0px 1px rgba(0,0,0,0.04), 0px 1px 1px rgba(0,0,0,0.04) !important",
      },
    },
    MuiAppBar: {
      root: {
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12) !important",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "20px",
        textTransform: "none",
        padding: "6px 24px !important",
        fontSize: "16px",
        fontWeight: 600,
        boxShadow: "none !important",
        height: "40px",
      },
    },
  },
});

export default class MyApp extends App<{ locale: any; messages: any }> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const locale = await getLocale(ctx);
    const messages = await getMessages(locale);

    return { pageProps, locale, messages };
  }

  render() {
    const { Component, pageProps, locale, messages } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <IntlProvider locale={locale || "en"} messages={messages}>
          <Component {...pageProps} />
        </IntlProvider>
      </MuiThemeProvider>
    );
  }
}
