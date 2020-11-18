import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { FormattedMessage } from "react-intl";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import Drawer from "@material-ui/core/Drawer";
import { Button } from "./common/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter } from "next/router";
import ListItemText from "@material-ui/core/ListItemText";
import { COUNTRY, LANGUAGE } from "../../app/interfaces";
import { Flag } from "../../app/components/common/Flag/Flag";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PublicIcon from "@material-ui/icons/Public";
import * as languageService from "../../app/services/languageService";
import * as countryService from "../../app/services/countryService";
import {
  productUrl,
  pricingUrl,
  websiteHomeUrl,
  companyUrl,
  getStartedUrl,
} from "../../app/helpers/navigation";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "60px",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "68px",
    },
  },
  leftControls: {
    flexGrow: 1,
    display: "flex",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.grey.A100,
  },
  appBarRoot: {
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 4px 0px !important",
    // boxShadow: "none !important",
    position: "fixed",
    backgroundColor: "white",
    top: "0px",
  },
  tooltip: {
    padding: "0px",
  },
  drawerPaper: {
    minWidth: "260px",
    paddingTop: "20px",
  },
  toolbarRoot: {
    margin: "0 auto",
    display: "flex",
    width: "100%",
    padding: "10px 0px",
  },
  toolbarContainer: {
    padding: "0px 30px",
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      padding: "0 10px",
    },
  },
  menuRoot: {
    display: "flex",
    color: "white",
    listStyleType: "none",
    padding: "0px",
    fontWeight: "bold",
    paddingLeft: "20px",
    margin: "12px 0px 0px 0px",
  },
  menuItem: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  button: {
    marginLeft: "10px",
    boxShadow: "none",
    minWidth: "120px",
    fontSize: "14px",
  },
  buttonContainer: {
    flex: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  contactSalesContainer: {
    marginLeft: "30px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  link: {
    textDecoration: "none",
    padding: "0px 20px",
    color: theme.palette.grey.A100,
    fontSize: "14px",
  },
  icon: {
    color: theme.palette.grey.A100,
  },
}));

export type NavProps = {};
export function Nav(props: NavProps) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
  const language: LANGUAGE = languageService.getLanguageByPathname(
    router.pathname
  );
  const locale: string = languageService.getLocaleFromLanguage(language);
  const languages: LANGUAGE[] = [LANGUAGE.EN_US, LANGUAGE.RO_RO];
  languages.splice(languages.indexOf(language), 1);

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={{ root: classes.appBarRoot }}>
        <Toolbar classes={{ root: classes.toolbarRoot }}>
          <div className={classes.toolbarContainer}>
            <Hidden mdUp implementation="css">
              <IconButton
                color="inherit"
                onClick={() => {
                  setMenuOpen(true);
                }}
              >
                <MenuIcon className={classes.icon} />
              </IconButton>
            </Hidden>
            <div className={classes.logoContainer}>
              <Link href={websiteHomeUrl(language)}>
                <Typography variant="h5" style={{ fontWeight: 700 }}>
                  <a>visitor</a>
                </Typography>
              </Link>
            </div>
            <Hidden smDown>
              <ul className={classes.menuRoot}>
                <li className={classes.link}>
                  <Link href={productUrl(language)}>
                    <a>
                      <FormattedMessage id="App.common.menu.product" />
                    </a>
                  </Link>
                </li>
                <li className={classes.link}>
                  <Link href={pricingUrl(language)}>
                    <a>
                      <FormattedMessage id="App.common.menu.pricing" />
                    </a>
                  </Link>
                </li>
                <li className={classes.link}>
                  <Link href={companyUrl(language)}>
                    <a>
                      <FormattedMessage id="App.common.menu.company" />
                    </a>
                  </Link>
                </li>
              </ul>
            </Hidden>
            <div className={classes.buttonContainer}>
              <Tooltip
                interactive
                enterTouchDelay={0}
                classes={{
                  tooltip: classes.tooltip,
                }}
                title={
                  <Paper elevation={0}>
                    <List style={{ background: "white", padding: "0px" }}>
                      {languages.map((lang) => (
                        <ListItem
                          button
                          onClick={() => {
                            if (lang === LANGUAGE.EN_US) {
                              router.replace("/");
                            } else if (lang === LANGUAGE.RO_RO) {
                              router.replace("/ro");
                            }
                          }}
                        >
                          <Flag
                            country={countryService.getCountryByLanguage(lang)}
                            style={{ fontSize: 13, marginRight: "10px" }}
                          />
                          <ListItemText
                            primary={
                              <FormattedMessage
                                id={`App.common.languages.${lang}`}
                              />
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                }
              >
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "flex-end",
                    cursor: "pointer",
                  }}
                >
                  <PublicIcon
                    style={{
                      fontSize: "14px",
                      position: "relative",
                      top: "-4px",
                      left: "-2px",
                    }}
                  />
                  <span>{locale.toUpperCase()}</span>
                  <ArrowDropDownIcon style={{ fontSize: "20px" }} />
                </Typography>
              </Tooltip>
              <div className={classes.contactSalesContainer}>
                <Link href={getStartedUrl(language)}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ fontSize: "14px" }}
                  >
                    <FormattedMessage id="App.common.contactSales" />
                  </Button>
                </Link>
              </div>
              <Link href={getStartedUrl(language)}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  <FormattedMessage id="App.common.getStarted" />
                </Button>
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor={"left"}
        open={menuOpen}
        onClose={() => {
          setMenuOpen(!menuOpen);
        }}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <MenuList>
          <Link href={productUrl(language)}>
            <MenuItem
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0px 10px",
                padding: "20px 0px",
                borderBottom: "1px solid #edf2f4",
              }}
            >
              <FormattedMessage id="App.common.menu.product" />
            </MenuItem>
          </Link>
          <Link href={pricingUrl(language)}>
            <MenuItem
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0px 10px",
                padding: "20px 0px",
                borderBottom: "1px solid #edf2f4",
              }}
            >
              <FormattedMessage id="App.common.menu.pricing" />
            </MenuItem>
          </Link>
          <Link href={companyUrl(language)}>
            <MenuItem
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0px 10px",
                padding: "20px 0px",
                borderBottom: "1px solid #edf2f4",
              }}
            >
              <FormattedMessage id="App.common.menu.company" />
            </MenuItem>
          </Link>
        </MenuList>
      </Drawer>
    </div>
  );
}
