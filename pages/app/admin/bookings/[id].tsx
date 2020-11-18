import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Page from "../../../../app/components/common/Page/Page";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import TableCell from "@material-ui/core/TableCell";
import ListItemText from "@material-ui/core/ListItemText";
import TableRow from "@material-ui/core/TableRow";
import {
  getBooking,
  editBooking,
  deleteBooking,
  selectors,
} from "../../../../app/slices/adminSlice/bookingsSlice";
import CardItem from "../../../../app/components/common/CardItem/CardItem";
import { FormattedMessage } from "react-intl";
import BookingDetailsActionMenu from "../../../../app/components/bookings/BookingDetailsActionMenu";
import { RootState } from "../../../../app/store";
import { useRouter } from "next/router";
import FormattedDateLabel from "../../../../app/components/common/FormattedDateLabel/FormattedDateLabel";
import BookingDetailsHeader from "../../../../app/components/bookings/BookingDetailsHeader";
import { toggleSnackbar } from "../../../../app/slices/commonSlice";

import { FormattedCurrencyLabel } from "../../../../app/components/common/FormattedCurrencyLabel/FormattedCurrencyLabel";
import { selectors as commonSelectors } from "../../../../app/slices/commonSlice";

import {
  selectors as settingsSelectors,
  getCompanyInformation,
} from "../../../../app/slices/adminSlice/settingsSlice";
import { CURRENCY, LANGUAGE } from "../../../../app/interfaces";
import { getFullName } from "../../../../app/services/commonService";
import { getBookingRequests } from "../../../../app/slices/adminSlice/dashboardSlice";
import ResponsiveTable from "../../../../app/components/common/ResponsiveTable/ResponsiveTable";
import { IRoomBooking } from "../../../../app/interfaces";
import Nav from "../../../../app/components/common/Nav/Nav";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  mainBody: {
    marginTop: 8,
  },
  tableCell: {
    padding: "10px 20px",
  },
  confirmBookingDialog: {
    minWidth: "300px",
  },
}));

type PropsFromRedux = ConnectedProps<typeof connector>;
export type BookingDetailsProps = PropsFromRedux & {};
export function BookingDetails(props: BookingDetailsProps) {
  const classes = useStyles();
  const router = useRouter();
  const bookingId: string = router.query.id as string;
  const [rejectBookingOpen, setRejectBookingOpen] = React.useState(false);
  const [confirmBookingOpen, setConfirmBookingOpen] = React.useState(false);

  React.useEffect(() => {
    props.getBooking(bookingId);
    props.getCompanyInformation();
    // eslint-disable-next-line
  }, [bookingId]);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          titleLocale="App.bookings.bookingDetails.title"
          backTitleLocale="App.bookings.bookingDetails.backTitle"
          actions={[
            <BookingDetailsActionMenu key={0} booking={props.booking} />,
          ]}
        >
          <BookingDetailsHeader
            booking={props.booking}
            loading={props.loading}
          />
          <Paper elevation={0} style={{ padding: "0px", marginTop: "20px" }}>
            <div style={{ padding: "20px" }}>
              <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                  <CardItem
                    loading={props.loading}
                    label={
                      <FormattedMessage id="App.bookings.details.checkIn" />
                    }
                    text={
                      <FormattedDateLabel date={props.booking?.checkinDate} />
                    }
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <CardItem
                    loading={props.loading}
                    label={
                      <FormattedMessage id="App.bookings.details.checkOut" />
                    }
                    text={
                      <FormattedDateLabel date={props.booking?.checkoutDate} />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: 8 }}>
                <Grid item sm={4} xs={12}>
                  <CardItem
                    loading={props.loading}
                    label={
                      <FormattedMessage id="App.bookings.details.totalCharge" />
                    }
                    text={
                      <FormattedCurrencyLabel
                        language={props.user?.language as LANGUAGE}
                        amount={props.booking?.totalCost as number}
                        currency={props.company?.currency as CURRENCY}
                      />
                    }
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <CardItem
                    loading={props.loading}
                    label={<FormattedMessage id="App.common.bookingCode" />}
                    text={props.booking?.code}
                  />
                </Grid>
                {props.booking?.numberOfPersons && (
                  <Grid item sm={4} xs={12}>
                    <CardItem
                      loading={props.loading}
                      label={
                        <FormattedMessage id="App.bookings.details.guests" />
                      }
                      text={props.booking?.numberOfPersons}
                    />
                  </Grid>
                )}
              </Grid>
              {props.booking?.details && (
                <Grid container spacing={2} style={{ marginTop: 8 }}>
                  <Grid item xs={12}>
                    <CardItem
                      loading={props.loading}
                      label={
                        <FormattedMessage id="App.bookings.details.bookingDetails" />
                      }
                      text={props.booking?.details}
                      style={{ whiteSpace: "pre-line" }}
                    />
                  </Grid>
                </Grid>
              )}
            </div>
            <ResponsiveTable
              listItems={props.booking?.roomBookings || []}
              tableHeaderCells={[
                <TableCell className={classes.tableCell} key={0}>
                  <FormattedMessage id="App.common.room" />
                </TableCell>,
                <TableCell className={classes.tableCell} key={1}>
                  <FormattedMessage id="App.bookings.booking.checkInDate" />
                </TableCell>,
                <TableCell className={classes.tableCell} key={2}>
                  <FormattedMessage id="App.bookings.booking.checkOutDate" />
                </TableCell>,
              ]}
              renderDesktopRow={(row: IRoomBooking) => (
                <TableRow key={row.id}>
                  <TableCell
                    className={classes.tableCell}
                    component="th"
                    scope="row"
                  >
                    {row.room?.name}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    component="th"
                    scope="row"
                  >
                    <FormattedDateLabel date={row.checkinDate} />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <FormattedDateLabel date={row.checkoutDate} />
                  </TableCell>
                </TableRow>
              )}
              renderMobileRow={(row: IRoomBooking) => (
                <ListItem button key={row.id} alignItems="flex-start">
                  <ListItemText
                    primary={row.room?.name}
                    secondary={
                      <span>
                        <FormattedDateLabel date={row.checkinDate} /> -{" "}
                        <FormattedDateLabel date={row.checkoutDate} />
                      </span>
                    }
                  />
                </ListItem>
              )}
            />
          </Paper>
          {!props.booking?.isConfirmed && !props.loading && (
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => setRejectBookingOpen(true)}
              >
                <FormattedMessage id="App.common.reject" />
              </Button>
              <Button
                color="primary"
                variant="outlined"
                style={{ marginLeft: "10px" }}
                onClick={() => setConfirmBookingOpen(true)}
              >
                <FormattedMessage id="App.common.confirm" />
              </Button>
            </div>
          )}
          <Dialog
            open={rejectBookingOpen}
            onClose={() => setRejectBookingOpen(false)}
          >
            <DialogTitle>
              <FormattedMessage id="App.bookings.bookingDetails.rejectBooking.dialogTitle" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <FormattedMessage
                  id="App.bookings.bookingDetails.rejectBooking.dialogBody"
                  values={{ fullName: getFullName(props.booking?.customer) }}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setRejectBookingOpen(false)}
                color="primary"
              >
                <FormattedMessage id="App.common.disagree" />
              </Button>
              <Button
                onClick={async () => {
                  setRejectBookingOpen(false);
                  if (props.deleteBooking) {
                    await props.deleteBooking(props.booking);
                    await props.getBookingRequests();
                    router.back();
                    props.toggleSnackbar({
                      isOpen: true,
                      messageLocale:
                        "App.bookings.bookingDetails.rejectBooking.success",
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
          <Dialog
            classes={{ paper: classes.confirmBookingDialog }}
            open={confirmBookingOpen}
            onClose={() => setConfirmBookingOpen(false)}
          >
            <DialogTitle>
              <FormattedMessage id="App.bookings.bookingDetails.confirmBooking.dialogTitle" />
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setConfirmBookingOpen(false)}
                color="primary"
              >
                <FormattedMessage id="App.common.disagree" />
              </Button>
              <Button
                onClick={async () => {
                  setConfirmBookingOpen(false);
                  await props.editBooking({
                    id: props.booking?.id,
                    isConfirmed: true,
                  });
                  await props.getBookingRequests();
                  router.back();
                  props.toggleSnackbar({
                    isOpen: true,
                    messageLocale:
                      "App.bookings.bookingDetails.confirmBooking.success",
                    severity: "success",
                  });
                }}
                color="primary"
                autoFocus
              >
                <FormattedMessage id="App.common.agree" />
              </Button>
            </DialogActions>
          </Dialog>
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    user: commonSelectors.selectUser(state),
    loading: selectors.selectLoading(state),
    booking: selectors.selectBooking(state),
    company: settingsSelectors.selectCompany(state),
  }),
  {
    getBooking,
    deleteBooking,
    editBooking,
    getCompanyInformation,
    toggleSnackbar,
    getBookingRequests,
  }
);
export default connector(BookingDetails);
