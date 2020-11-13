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
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "88px",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "68px",
    },
  },
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
    // boxShadow: "none !important",
    position: "fixed",
    backgroundColor: "white",
    top: "0px",
  },
  drawerPaper: {
    minWidth: "260px",
    paddingTop: "20px",
  },
  toolbarRoot: {
    maxWidth: "1154px",
    margin: "0 auto",
    display: "flex",
    width: "100%",
    padding: "10px 0px",
  },
  toolbarContainer: {
    padding: "0px 10px",
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px",
    },
  },
  menuRoot: {
    display: "flex",
    color: "white",
    flex: 9,
    justifyContent: "flex-end",
    listStyleType: "none",
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
              <Link href="/">
                <Typography variant="h4" style={{ fontWeight: 700 }}>
                  <a>visitor</a>
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
                  <Link href="/pricing">
                    <a>
                      <FormattedMessage id="App.common.menu.pricing" />
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
              </ul>
            </Hidden>
            <div className={classes.buttonContainer}>
              <div className={classes.contactSalesContainer}>
                <Link href="/contact-sales">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ fontSize: "14px" }}
                  >
                    Contact sales
                  </Button>
                </Link>
              </div>
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
          <Link href="/product">
            <MenuItem
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0px 10px",
                padding: "20px 0px",
                borderBottom: "1px solid #edf2f4",
              }}
            >
              Product
            </MenuItem>
          </Link>
          <Link href="/pricing">
            <MenuItem
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0px 10px",
                padding: "20px 0px",
                borderBottom: "1px solid #edf2f4",
              }}
            >
              Pricing
            </MenuItem>
          </Link>
          <Link href="/company">
            <MenuItem
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0px 10px",
                padding: "20px 0px",
                borderBottom: "1px solid #edf2f4",
              }}
            >
              Company
            </MenuItem>
          </Link>
        </MenuList>
      </Drawer>
    </div>
  );
}
