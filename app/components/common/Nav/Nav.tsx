import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, ConnectedProps } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Menu from "@material-ui/core/Menu";
import { useRouter } from "next/router";
import Tooltip from "@material-ui/core/Tooltip";
import { FormattedMessage } from "react-intl";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "next/link";
import { ADD_BOOKING_FORM_DIALOG } from "../AddBookingFormDialog/AddBookingFormDialog";
import { toggleDialogByName } from "../../../slices/componentsSlice";
import {
  toggleNavigationDrawer,
  logout,
  changeCurrentCompany,
  getCurrentUser,
  selectors as commonSelectors,
} from "../../../slices/commonSlice";
import MenuIcon from "@material-ui/icons/Menu";
import grey from "@material-ui/core/colors/grey";
import { RootState } from "../../../store";
import {
  selectors as settingsSelectors,
  getCurrentPartner,
} from "../../../slices/adminSlice/settingsSlice";
import { dashboard } from "../../../helpers/navigation";
import * as imageService from "../../../services/imageService";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  leftControls: {
    flexGrow: 1,
    display: "flex",
  },
  appBarRoot: {
    backgroundColor: "white",
    position: "fixed",
    zIndex: 1300,
  },
  toolbarRoot: {
    padding: "0px 12px",
  },
  profileIconButton: {
    color: grey[700],
  },
}));

type PropsFromRedux = ConnectedProps<typeof connector>;
export type HeaderBarProps = PropsFromRedux & {
  hideMobileMenu?: boolean;
  hideRightButtons?: boolean;
};
function HeaderBar(props: HeaderBarProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  React.useEffect(() => {
    props.getCurrentPartner();
    // eslint-disable-next-line
  }, []);
  const history = useRouter();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" classes={{ root: classes.appBarRoot }}>
      <Toolbar classes={{ root: classes.toolbarRoot }}>
        <div className={classes.leftControls}>
          {!props.hideMobileMenu && (
            <Hidden mdUp implementation="css">
              <IconButton
                color="inherit"
                className={classes.profileIconButton}
                onClick={() => {
                  if (props.toggleNavigationDrawer) {
                    props.toggleNavigationDrawer({ isOpen: true });
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          )}
          {props.partner?.themeData?.logo?.resourcePath && (
            <img
              style={{ marginTop: "4px", height: "40px", cursor: "pointer" }}
              alt="Partner logo"
              src={imageService.getImagePath(props.partner?.themeData?.logo)}
              onClick={() => history.push(dashboard())}
            />
          )}
        </div>

        {!props.hideRightButtons && (
          <>
            {props.user?.currentCompany?.id && (
              <FormControl style={{ marginRight: "20px", minWidth: "120px" }}>
                <InputLabel id="select-company-label">
                  <FormattedMessage id="App.header.changeCompany" />
                </InputLabel>
                <Select
                  labelId="select-company-label"
                  id="select-company"
                  value={props.user?.currentCompany?.id}
                  onChange={async (event: React.ChangeEvent<any>) => {
                    const companyId: string = event.target.value;
                    await props.changeCurrentCompany(companyId);
                    await props.getCurrentUser();
                    window.location.reload();
                  }}
                >
                  {(props.user?.companies || []).map((company) => (
                    <MenuItem value={company.id}>{company.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Tooltip
              title={<FormattedMessage id="App.header.addBooking" />}
              aria-label="add-booking"
            >
              <IconButton
                color="inherit"
                className={classes.profileIconButton}
                onClick={() => {
                  if (props.toggleDialogByName) {
                    props.toggleDialogByName({
                      name: ADD_BOOKING_FORM_DIALOG,
                      isOpen: true,
                    });
                  }
                }}
              >
                <AddBoxIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              color="inherit"
              className={classes.profileIconButton}
              onClick={handleClick}
            >
              <PowerSettingsNewIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link href="/admin/profile">
                <MenuItem style={{ fontSize: 14 }} onClick={handleClose}>
                  <FormattedMessage id="App.common.profile" />
                </MenuItem>
              </Link>
              <MenuItem
                style={{ fontSize: 14 }}
                onClick={() => {
                  props.logout();
                  handleClose();
                }}
              >
                <FormattedMessage id="App.common.signOut" />
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

const connector = connect(
  (state: RootState) => ({
    user: commonSelectors.selectUser(state),
    partner: settingsSelectors.selectPartner(state),
  }),
  {
    toggleDialogByName,
    toggleNavigationDrawer,
    getCurrentPartner,
    logout,
    changeCurrentCompany,
    getCurrentUser,
  }
);
export default connector(HeaderBar);
