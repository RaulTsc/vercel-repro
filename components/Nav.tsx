import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  leftControls: {
    flexGrow: 1,
    display: "flex",
  },
  logoContainer: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    color: theme.palette.grey.A100,
  },
  appBarRoot: {
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 4px 0px !important",
    position: "sticky",
    backgroundColor: "white",
    top: "0px",
  },
  toolbarRoot: {
    padding: "0px",
    maxWidth: "1154px",
    margin: "0 auto",
    display: "flex",
    width: "100%",
    paddingTop: "8px",
  },
  toolbarContainer: {
    padding: "0px 20px",
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px",
    },
  },
  menuRoot: {
    display: "flex",
    color: "white",
    flex: 10,
    justifyContent: "flex-end",
    listStyleType: "none",
  },
  menuItem: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  button: {
    marginLeft: "20px",
    boxShadow: "none",
    minWidth: "120px",
    fontSize: "14px",
  },
  buttonContainer: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
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

export type NavProps = {
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
export function Nav(props: NavProps) {
  const classes = useStyles();

  return (
    <AppBar position="static" classes={{ root: classes.appBarRoot }}>
      <Toolbar classes={{ root: classes.toolbarRoot }}>
        <div className={classes.toolbarContainer}>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              onClick={() => {
                props.setMenuOpen(true);
              }}
            >
              <MenuIcon className={classes.icon} />
            </IconButton>
          </Hidden>
          <div className={classes.logoContainer}>
            <Link href="/">
              <Typography variant="h4" style={{ fontWeight: 700 }}>
                <a>hotelful</a>
              </Typography>
            </Link>
          </div>
          <Hidden smDown>
            <ul className={classes.menuRoot}>
              <li className={classes.link}>
                <Link href="/product">
                  <a>
                    <FormattedMessage id="App.common.menu.product" />
                  </a>
                </Link>
              </li>
              <li className={classes.link}>
                <Link href="/company">
                  <a>
                    <FormattedMessage id="App.common.menu.company" />
                  </a>
                </Link>
              </li>
              <li className={classes.link}>
                <Link href="/pricing">
                  <a>
                    <FormattedMessage id="App.common.menu.pricing" />
                  </a>
                </Link>
              </li>
            </ul>
          </Hidden>
          <div className={classes.buttonContainer}>
            <Link href="/get-started">
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
  );
}
