import React from "react";
import moment from "moment";
import { connect, ConnectedProps } from "react-redux";
import Page from "../../../../app/components/common/Page/Page";
import FormattedDateLabel from "../../../../app/components/common/FormattedDateLabel/FormattedDateLabel";
import DashboardCard from "../../../../app/components/dashboard/DashboardCard/DashboardCard";
import Nav from "../../../../app/components/common/Nav/Nav";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import { DashboardBookings } from "../../../../app/components/dashboard/DashboardBookings/DashboardBookings";
import { FormattedMessage } from "react-intl";
import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CachedIcon from "@material-ui/icons/Cached";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import { bookingsList } from "../../../../app/helpers/navigation";
import { useRouter } from "next/router";
import {
  getRooms,
  selectors as roomsSelectors,
} from "../../../../app/slices/adminSlice/roomsSlice";
import { selectors as commonSelectors } from "../../../../app/slices/commonSlice";
import {
  getBookings,
  selectors as bookingsSelectors,
} from "../../../../app/slices/adminSlice/bookingsSlice";
import { RootState } from "../../../../app/store";
import * as bookingsService from "../../../../app/services/bookingsService";
import { FormattedCurrencyLabel } from "../../../../app/components/common/FormattedCurrencyLabel/FormattedCurrencyLabel";
import {
  IBooking,
  IRoomBooking,
  CURRENCY,
  LANGUAGE,
} from "../../../../app/interfaces";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";
import {
  getBookingsCheckinToday,
  getBookingsCheckoutToday,
  getBookingRequests,
  selectors as dashboardSelectors,
} from "../../../../app/slices/adminSlice/dashboardSlice";

const useStyles = makeStyles((theme) => ({
  title: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginRight: "8px",
    display: "none",
    fontWeight: 600,

    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  dateLabel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: "4px",
    fontSize: "14px",
    color: "rgba(0,0,0,0.87)",
  },
  coffeIcon: { fontSize: 96, color: grey[700] },
  noBookingsTitle: {
    marginTop: 16,
    fontSize: 22,
    color: grey[900],
    fontWeight: 300,
  },
  noBookingsBody: {
    marginTop: 16,
    fontSize: 15,
    color: grey[700],
  },
}));

const getBookingsEarningsForToday = (bookings: IBooking[]): number => {
  const startDate = moment()
    .set({
      hour: 15,
      minute: 0,
      second: 0,
    })
    .toISOString();
  const endDate = moment()
    .add(1, "days")
    .set({
      hour: 15,
      minute: 0,
      second: 0,
    })
    .toISOString();
  let totalEarnings: number = 0;

  for (const booking of bookings) {
    const roomBookingsForToday: IRoomBooking[] = bookingsService.getRoomBookingsBetween(
      booking.roomBookings || [],
      startDate,
      endDate
    );
    const earningsForToday: number = roomBookingsForToday.reduce(
      (prevVal, currVal) => (prevVal += currVal.room?.roomType?.rate || 0),
      0
    );
    totalEarnings += earningsForToday;
  }

  return totalEarnings;
};

interface INoBookingsEmptyPlaceholderProps {
  style?: React.CSSProperties;
}
const NoBookingsEmptyPlaceholder = (
  props: INoBookingsEmptyPlaceholderProps
) => {
  const classes = useStyles();

  return (
    <div style={{ textAlign: "center", ...props.style }}>
      <LocalCafeIcon className={classes.coffeIcon} />
      <div className={classes.noBookingsBody}>
        <FormattedMessage id="App.dashboard.noBookingsForToday.body" />
      </div>
    </div>
  );
};

type PropsFromRedux = ConnectedProps<typeof connector>;
export type IDashboardProps = PropsFromRedux & {};
export function _Dashboard(props: IDashboardProps) {
  const classes = useStyles();
  const router = useRouter();
  const startDate = moment()
    .set({
      hour: 15,
      minute: 0,
      second: 0,
    })
    .toISOString();
  const endDate = moment()
    .add(1, "days")
    .set({
      hour: 15,
      minute: 0,
      second: 0,
    })
    .toISOString();
  React.useEffect(() => {
    props.getRooms({
      filter: {
        availableFrom: startDate,
        availableTo: endDate,
      },
    });
    props.getBookings({ filter: { startDate, endDate } });
    props.getBookingRequests();
    props.getBookingsCheckinToday();
    props.getBookingsCheckoutToday();
    // eslint-disable-next-line
  }, []);

  const occupancy: string = (
    ((props.totalRooms - props.rooms.length) / props.totalRooms) *
    100
  ).toFixed(2);
  const totalEarnings = getBookingsEarningsForToday(props.bookings);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          title={
            <div style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.title}>
                <FormattedMessage
                  id="App.dashboard.title"
                  values={{ firstName: props.user?.firstName }}
                />
              </Typography>
              <FormattedDateLabel
                date={new Date().toISOString()}
                className={classes.dateLabel}
              />
            </div>
          }
          actions={[
            <Tooltip
              title={<FormattedMessage id="App.common.refresh" />}
              aria-label="refresh"
              key={0}
            >
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <CachedIcon />
              </IconButton>
            </Tooltip>,
          ]}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <DashboardCard
                    raiseOnHover={props.bookingRequests.length > 0}
                    title={
                      <FormattedMessage id="App.dashboard.newBookings.title" />
                    }
                    label={props.bookingRequests.length}
                    onClick={() => {
                      if (props.bookingRequests.length === 0) {
                        return;
                      }

                      router.push(bookingsList());
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <DashboardCard
                    title={
                      <FormattedMessage id="App.dashboard.totalEarnings.title" />
                    }
                    label={
                      <FormattedCurrencyLabel
                        language={props.user?.language as LANGUAGE}
                        amount={totalEarnings}
                        currency={props.company?.currency as CURRENCY}
                      />
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <DashboardCard
                    title={
                      <FormattedMessage id="App.dashboard.occupancy.title" />
                    }
                    label={`${occupancy}%`}
                  />
                </Grid>
              </Grid>
            </Grid>
            {props.bookingsCheckoutToday.length > 0 && (
              <Grid item xs={12}>
                <DashboardBookings
                  title={
                    <Typography variant="h6">
                      <FormattedMessage id="App.dashboard.checkout.title" />
                    </Typography>
                  }
                  bookings={props.bookingsCheckoutToday}
                  company={props.company}
                  user={props.user}
                />
              </Grid>
            )}
            {props.bookingsCheckinToday.length > 0 && (
              <Grid item xs={12}>
                <DashboardBookings
                  title={
                    <Typography variant="h6">
                      <FormattedMessage id="App.dashboard.checkin.title" />
                    </Typography>
                  }
                  bookings={props.bookingsCheckinToday}
                  company={props.company}
                  user={props.user}
                />
              </Grid>
            )}
            {props.bookingsCheckoutToday.length === 0 &&
              props.bookingsCheckinToday.length === 0 && (
                <Grid item xs={12}>
                  <NoBookingsEmptyPlaceholder style={{ marginTop: "40px" }} />
                </Grid>
              )}
          </Grid>
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    user: commonSelectors.selectUser(state),
    company: commonSelectors.selectCompany(state),
    rooms: roomsSelectors.selectRooms(state),
    totalRooms: roomsSelectors.selectTotalRooms(state),
    bookings: bookingsSelectors.selectBookings(state),
    bookingRequests: dashboardSelectors.selectBookingRequests(state),
    bookingsCheckinToday: dashboardSelectors.selectBookingsCheckinToday(state),
    bookingsCheckoutToday: dashboardSelectors.selectBookingsCheckoutToday(
      state
    ),
  }),
  {
    getRooms,
    getBookings,
    getBookingsCheckinToday,
    getBookingsCheckoutToday,
    getBookingRequests,
  }
);
const Dashboard = connector(_Dashboard);
export default Dashboard;

export { getServerSideProps } from "../../../../app/auth";
