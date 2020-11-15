import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import PersonIcon from "@material-ui/icons/Person";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EventIcon from "@material-ui/icons/Event";
import blue from "@material-ui/core/colors/blue";
import StoreIcon from "@material-ui/icons/Store";
import EmailIcon from "@material-ui/icons/Email";
import SettingsIcon from "@material-ui/icons/Settings";
import Chip from "@material-ui/core/Chip";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { RootState } from "../../../store";
import {
  toggleNavigationDrawer,
  selectors as commonSelectors,
} from "../../../slices/commonSlice";
import ListIcon from "@material-ui/icons/List";
import { selectors as dashboardSelectors } from "../../../slices/adminSlice/dashboardSlice";

const minDrawerWidth = "260px";
const drawerBackgroundColor = "#1b2430";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      minWidth: minDrawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    minWidth: minDrawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuListRoot: {
    backgroundColor: drawerBackgroundColor,
    outline: 0,
    height: "100vh",
    display: "block",
    padding: 0,
    paddingTop: 80,

    [theme.breakpoints.down("sm")]: {
      paddingTop: 16,
    },
  },
  menuListItemRoot: {
    fontSize: 14,
    color: "#eeeeee",
    padding: "12px 24px",
  },
  menuListItemIcon: {
    fontSize: "36px",
    paddingRight: 16,
    color: "#eeeeee",
    opacity: 0.5,
  },
  chip: {
    height: "22px",
    fontSize: "11px",
    backgroundColor: blue[500],
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
}));

type PropsFromRedux = ConnectedProps<typeof connector>;
export type SideMenuProps = PropsFromRedux & {};
function SideMenu(props: SideMenuProps) {
  const classes = useStyles();
  const theme = useTheme();

  const closeDrawerToggle = () => {
    if (props.toggleNavigationDrawer) {
      props.toggleNavigationDrawer({ isOpen: false });
    }
  };

  const drawer = (
    <MenuList className={classes.menuListRoot}>
      <Link href="/app/admin/dashboard">
        <MenuItem
          className={classes.menuListItemRoot}
          onClick={closeDrawerToggle}
        >
          <DashboardIcon className={classes.menuListItemIcon} />
          <FormattedMessage id="App.common.menu.dashboard" />
        </MenuItem>
      </Link>
      <Link href="/app/admin/calendar">
        <MenuItem
          className={classes.menuListItemRoot}
          onClick={closeDrawerToggle}
        >
          <EventIcon className={classes.menuListItemIcon} />
          <FormattedMessage id="App.common.menu.calendar" />
        </MenuItem>
      </Link>
      <Link href="/app/admin/bookings">
        <MenuItem
          className={classes.menuListItemRoot}
          style={{ paddingRight: "16px" }}
          onClick={closeDrawerToggle}
        >
          <ListIcon className={classes.menuListItemIcon} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <FormattedMessage id="App.common.menu.bookings" />
            {props.bookingRequests.length > 0 && (
              <Chip
                size="small"
                label={props.bookingRequests.length}
                className={classes.chip}
              />
            )}
          </div>
        </MenuItem>
      </Link>
      <Link href="/app/admin/customers">
        <MenuItem
          className={classes.menuListItemRoot}
          onClick={closeDrawerToggle}
        >
          <PersonIcon className={classes.menuListItemIcon} />
          <FormattedMessage id="App.common.menu.customers" />
        </MenuItem>
      </Link>
      <Link href="/app/admin/reviews">
        <MenuItem
          className={classes.menuListItemRoot}
          onClick={closeDrawerToggle}
        >
          <div style={{ paddingLeft: "50px", fontSize: "12px" }}>
            <FormattedMessage id="App.common.menu.reviews" />
          </div>
        </MenuItem>
      </Link>
      <Link href="/app/admin/rooms">
        <MenuItem
          className={classes.menuListItemRoot}
          onClick={closeDrawerToggle}
        >
          <StoreIcon className={classes.menuListItemIcon} />
          <FormattedMessage id="App.common.menu.rooms" />
        </MenuItem>
      </Link>
      <Link href="/app/admin/email-templates">
        <MenuItem
          className={classes.menuListItemRoot}
          onClick={closeDrawerToggle}
        >
          <EmailIcon className={classes.menuListItemIcon} />
          <FormattedMessage id="App.common.menu.emailTemplates" />
        </MenuItem>
      </Link>
      <Link href="/app/admin/settings">
        <MenuItem
          className={classes.menuListItemRoot}
          onClick={closeDrawerToggle}
        >
          <SettingsIcon className={classes.menuListItemIcon} />
          <FormattedMessage id="App.common.menu.settings" />
        </MenuItem>
      </Link>
    </MenuList>
  );

  return (
    <Hidden smDown implementation="css">
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.navigationDrawerOpen}
            onClose={() => {
              if (props.toggleNavigationDrawer) {
                props.toggleNavigationDrawer({
                  isOpen: !props.navigationDrawerOpen,
                });
              }
            }}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </Hidden>
  );
}

const connector = connect(
  (state: RootState) => ({
    navigationDrawerOpen: commonSelectors.selectNavigationDrawerOpen(state),
    bookingRequests: dashboardSelectors.selectBookingRequests(state),
  }),
  { toggleNavigationDrawer }
);
export default connector(SideMenu);
