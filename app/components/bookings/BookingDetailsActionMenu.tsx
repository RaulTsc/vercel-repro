import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import grey from "@material-ui/core/colors/grey";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { toggleDialogByName } from "../../slices/componentsSlice";
import { toggleSnackbar } from "../../slices/commonSlice";
import Tooltip from "@material-ui/core/Tooltip";

import {
  getBooking,
  editBooking,
  deleteBooking,
  selectors as bookingsSelectors,
} from "../../slices/adminSlice/bookingsSlice";
import { IBooking } from "../../interfaces";
import EditBookingFormDialog, {
  EDIT_BOOKING_FORM_DIALOG,
  IEditBooking,
  formToApiMapper as mapBookingForApi,
} from "./EditBookingFormDialog";
import { RootState } from "../../store";
import { getFullName } from "../../services/commonService";

type PropsFromRedux = ConnectedProps<typeof connector>;
type BookingDetailsActionMenuProps = PropsFromRedux & {
  booking: IBooking | null;
};
const BookingDetailsActionMenu = (props: BookingDetailsActionMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [cancelBookingOpen, setCancelBookingOpen] = React.useState(false);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Tooltip
        title={
          <FormattedMessage id="App.bookings.bookingDetails.actionMenuTooltip" />
        }
      >
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            props.toggleDialogByName({
              name: EDIT_BOOKING_FORM_DIALOG,
              isOpen: true,
            });
            handleClose();
          }}
        >
          <EditIcon style={{ marginRight: 16, color: grey[600] }} />
          <FormattedMessage id="App.bookings.bookingDetails.editBooking" />
        </MenuItem>
        <MenuItem
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setCancelBookingOpen(true);
            handleClose();
          }}
        >
          <DeleteIcon style={{ marginRight: 16, color: grey[600] }} />
          <FormattedMessage id="App.bookings.bookingDetails.cancelBooking" />
        </MenuItem>
      </Menu>
      <Dialog
        open={cancelBookingOpen}
        onClose={() => setCancelBookingOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage id="App.bookings.bookingDetails.cancelBooking.dialogTitle" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage
              id="App.bookings.bookingDetails.cancelBooking.dialogBody"
              values={{ fullName: getFullName(props.booking?.customer) }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelBookingOpen(false)} color="primary">
            <FormattedMessage id="App.common.disagree" />
          </Button>
          <Button
            onClick={async () => {
              setCancelBookingOpen(false);
              if (props.deleteBooking) {
                await props.deleteBooking(props.booking);
                router.back();
                props.toggleSnackbar({
                  isOpen: true,
                  messageLocale:
                    "App.bookings.bookingDetails.cancelBooking.success",
                  severity: "success",
                });
              }
            }}
            color="primary"
            autoFocus
          >
            <FormattedMessage id="App.common.agree" />
          </Button>
        </DialogActions>
      </Dialog>
      {props.booking && (
        <EditBookingFormDialog
          loading={props.editingBooking}
          initialValues={props.booking}
          onSubmit={async (booking) => {
            props.toggleDialogByName({
              name: EDIT_BOOKING_FORM_DIALOG,
              isOpen: false,
            });
            await props.editBooking(mapBookingForApi(booking as IEditBooking));
            await props.getBooking(booking?.id as string);
            props.toggleSnackbar({
              isOpen: true,
              messageLocale: "App.bookings.bookingDetails.editBooking.success",
              severity: "success",
            });
          }}
        />
      )}
    </div>
  );
};

const connector = connect(
  (state: RootState) => ({
    editingBooking: bookingsSelectors.selectEditingBooking(state),
  }),
  {
    getBooking,
    editBooking,
    deleteBooking,
    toggleDialogByName,
    toggleSnackbar,
  }
);

export default connector(BookingDetailsActionMenu);
