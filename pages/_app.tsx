import App from "next/app";
import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Provider, useSelector } from "react-redux";
import MomentUtils from "@date-io/moment";
import "moment/locale/de";
import "moment/locale/ro";
import Head from "next/head";

import IntlProvider from "../website/components/IntlProvider";

import getLanguage from "../utils/getLanguage";
import getMessages from "../utils/getMessages";

import "@fullcalendar/common/main.css"; // @fullcalendar/react imports @fullcalendar/common
import "@fullcalendar/daygrid/main.css"; // @fullcalendar/timegrid imports @fullcalendar/daygrid
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/adaptive/main.css";
import "@fullcalendar/resource-timeline/main.css";
import "@fullcalendar/list/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/timeline/main.css";
import "../styles/globals.css";
import "../styles/materialDesignCalendar.css";
import "flag-icon-css/css/flag-icon.min.css";

import store from "../app/store";
import { CssBaseline } from "@material-ui/core";
import { getCurrentUser, getCurrentCompany } from "../app/slices/commonSlice";
import { getBookingRequests } from "../app/slices/adminSlice/dashboardSlice";
import { LANGUAGE, IUser } from "../app/interfaces";
import { selectors as commonSelectors } from "../app/slices/commonSlice";

(global as any).__STORYSHOT__ = false;

if (typeof window === "undefined") {
  // dom parser for FormatedHTMLMessages
  global.DOMParser = new (require("jsdom").JSDOM)().window.DOMParser;
  global.window = new (require("jsdom").JSDOM)().window;
  (global as any).navigator = {
    userAgent: "node.js",
  };
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
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.625rem", // 26px
      color: "#2a3039",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem", // 24px
      color: "#2a3039",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.375rem", // 22px
      color: "#2a3039",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.25rem", // 20px
      color: "#2a3039",
      fontWeight: 600,
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
  },
});

function MyApp(props: any) {
  const { Component, pageProps, language, messages } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  React.useEffect(() => {
    store.dispatch(getCurrentUser());
    store.dispatch(getCurrentCompany());
    store.dispatch(getBookingRequests());
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Head>
        <title key="title">Visitor</title>
      </Head>
      <CssBaseline />
      <IntlProvider locale={language} messages={messages}>
        <Provider store={store}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Component {...pageProps} />
          </MuiPickersUtilsProvider>
        </Provider>
      </IntlProvider>
    </MuiThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  let pageProps = {};

  console.log("appContext", appContext.ctx.pathname);

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext);
  }

  const language = await getLanguage(appContext.ctx);
  const messages = await getMessages(language);

  return { pageProps, language, messages };
};

export default MyApp;
