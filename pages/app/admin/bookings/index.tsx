import React from "react";
import Page from "../../../../app/components/common/Page/Page";
import { useSelector, ConnectedProps } from "react-redux";
import blue from "@material-ui/core/colors/blue";
import { FormattedMessage } from "react-intl";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { toggleDialogByName } from "../../../../app/slices/componentsSlice";
import { connect } from "react-redux";
import { ADD_BOOKING_FORM_DIALOG } from "../../../../app/components/common/AddBookingFormDialog/AddBookingFormDialog";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import {
  bookingDetails,
  bookingsList,
} from "../../../../app/helpers/navigation";
import { getBookings } from "../../../../app/slices/adminSlice/bookingsSlice";
import { RootState } from "../../../../app/store";
import { IBooking } from "../../../../app/interfaces";
import { getFullName } from "../../../../app/services/commonService";
import ResponsiveTable from "../../../../app/components/common/ResponsiveTable/ResponsiveTable";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ExecuteOnce } from "@raultom/common-helpers/lib/helpers/ExecuteOnce";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import grey from "@material-ui/core/colors/grey";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Button from "@material-ui/core/Button";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FormattedCurrencyLabel } from "../../../../app/components/common/FormattedCurrencyLabel/FormattedCurrencyLabel";
import {
  getCompanyInformation,
  selectors as settingsSelectors,
} from "../../../../app/slices/adminSlice/settingsSlice";
import { CURRENCY, LANGUAGE } from "../../../../app/interfaces";
import { selectors as commonSelectors } from "../../../../app/slices/commonSlice";
import Nav from "../../../../app/components/common/Nav/Nav";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";

const useStyles = makeStyles((theme) => ({
  table: {},
  tableRow: {
    cursor: "pointer",
  },
  addButton: {
    marginLeft: "8px",
  },
  noSearchResultsEmptyPlaceholder: {
    textAlign: "center",
    marginTop: 72,
  },
  dissatisfiedIcon: { fontSize: 96, color: grey[700] },
  noResultsFoundTitle: {
    marginTop: 16,
    fontSize: 22,
    color: grey[900],
    fontWeight: 300,
  },
  noResultsFoundBody: {
    marginTop: 16,
    fontSize: 15,
    color: grey[700],
  },
}));

export const API_REQUEST_DELAY = 500;
const executeOnce = new ExecuteOnce();

function NoSearchResultsEmptyPlaceholder() {
  const classes = useStyles();

  return (
    <div className={classes.noSearchResultsEmptyPlaceholder}>
      <SentimentDissatisfiedIcon className={classes.dissatisfiedIcon} />
      <div className={classes.noResultsFoundTitle}>
        <FormattedMessage id="App.bookings.searchBookings.noBookingsFound.title" />
      </div>
      <div className={classes.noResultsFoundBody}>
        <FormattedMessage id="App.bookings.searchBookings.noBookingsFound.body" />
      </div>
    </div>
  );
}

interface NoBookingsEmptyPlaceholderProps {
  toggleDialogByName: ActionCreatorWithPayload<
    {
      name: string;
      isOpen: boolean;
    },
    string
  >;
  setShowNoBookingsEmptyPlaceholder: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}
function NoBookingsEmptyPlaceholder(props: NoBookingsEmptyPlaceholderProps) {
  const classes = useStyles();

  return (
    <div className={classes.noSearchResultsEmptyPlaceholder}>
      <BookmarkIcon className={classes.dissatisfiedIcon} />
      <div className={classes.noResultsFoundTitle}>
        <FormattedMessage id="App.bookings.list.noBookings.title" />
      </div>
      <div className={classes.noResultsFoundBody}>
        <FormattedMessage id="App.bookings.list.noBookings.body" />
      </div>
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: "24px" }}
        onClick={() => {
          if (props.toggleDialogByName) {
            props.setShowNoBookingsEmptyPlaceholder(false);
            props.toggleDialogByName({
              name: ADD_BOOKING_FORM_DIALOG,
              isOpen: true,
            });
          }
        }}
      >
        <FormattedMessage id="App.bookings.list.noBookings.createBooking" />
      </Button>
    </div>
  );
}

type PropsFromRedux = ConnectedProps<typeof connector>;
export type BookingsProps = PropsFromRedux & {};
function Bookings(props: BookingsProps) {
  const [fullSearch, setFullSearch] = React.useState("");
  const [
    showNoBookingsEmptyPlaceholder,
    setShowNoBookingsEmptyPlaceholder,
  ] = React.useState(false);
  const classes = useStyles();
  const router = useRouter();

  async function getBookings() {
    const bookings: IBooking[] = await props.getBookings();
    if (bookings.length === 0) {
      setShowNoBookingsEmptyPlaceholder(true);
    }
  }

  const bookings = useSelector(
    (state: RootState) => state.admin.bookings.bookings
  );
  React.useEffect(() => {
    getBookings();
    props.getCompanyInformation();
    // eslint-disable-next-line
  }, []);

  const showNoSearchResultsEmptyPlaceholder =
    !showNoBookingsEmptyPlaceholder &&
    Boolean(fullSearch) &&
    bookings.length === 0;

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          hideTitleOnXs
          titleLocale="App.bookings.bookingsTitle"
          actions={[
            <TextField
              key={0}
              value={fullSearch}
              label={<FormattedMessage id="App.bookings.searchBooking" />}
              onChange={(event) => {
                const value = event.target.value;
                setFullSearch(value);

                executeOnce.execute(async () => {
                  router.replace(
                    bookingsList({
                      filter: { fullSearch: value },
                    })
                  );
                  await props.getBookings({ filter: { fullSearch: value } });
                }, API_REQUEST_DELAY);
              }}
            />,
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              key={1}
              className={classes.addButton}
              onClick={() => {
                if (props.toggleDialogByName) {
                  props.toggleDialogByName({
                    name: ADD_BOOKING_FORM_DIALOG,
                    isOpen: true,
                  });
                }
              }}
            >
              <AddIcon />
            </Fab>,
          ]}
        >
          {bookings.length > 0 && (
            <Paper elevation={0}>
              <ResponsiveTable
                listItems={bookings}
                tableHeaderCells={[
                  <TableCell key={0}>
                    <FormattedMessage id="App.common.name" />
                  </TableCell>,
                  <TableCell key={1}>
                    <FormattedMessage id="App.common.amount" />
                  </TableCell>,
                  <TableCell key={2}>
                    <FormattedMessage id="App.common.bookingCode" />
                  </TableCell>,
                  <TableCell key={3}>
                    <FormattedMessage id="App.common.phoneNumber" />
                  </TableCell>,
                ]}
                renderDesktopRow={(row: IBooking) => {
                  const tableRow = (
                    <TableRow
                      hover
                      key={row.id}
                      className={classes.tableRow}
                      onClick={() =>
                        router.push(bookingDetails(row.id as string))
                      }
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ display: "flex", padding: "0px" }}
                      >
                        {!row.isConfirmed && (
                          <div
                            style={{
                              width: "6px",
                              backgroundColor: blue[500],
                            }}
                          ></div>
                        )}
                        <div style={{ padding: "16px" }}>
                          {getFullName(row.customer)}
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <FormattedCurrencyLabel
                          language={props.user?.language as LANGUAGE}
                          amount={row.totalCost as number}
                          currency={props.company?.currency as CURRENCY}
                        />
                      </TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.customer?.phoneNumber}</TableCell>
                    </TableRow>
                  );

                  if (!row.isConfirmed) {
                    return (
                      <Tooltip
                        title={
                          <FormattedMessage id="App.admin.bookings.bookingIsUnconfirmed" />
                        }
                        aria-label="add-booking"
                      >
                        {tableRow}
                      </Tooltip>
                    );
                  }

                  return tableRow;
                }}
                renderMobileRow={(row: IBooking) => (
                  <ListItem
                    button
                    key={row.id}
                    alignItems="flex-start"
                    onClick={() =>
                      router.push(bookingDetails(row.id as string))
                    }
                    style={{
                      borderLeft: !row.isConfirmed
                        ? `6px solid ${blue[500]}`
                        : "initial",
                    }}
                  >
                    <ListItemText
                      primary={getFullName(row.customer)}
                      secondary={
                        <span>
                          {row.code}{" "}
                          {row.customer?.phoneNumber && (
                            <span>- {row.customer?.phoneNumber}</span>
                          )}
                        </span>
                      }
                    />
                  </ListItem>
                )}
              />
            </Paper>
          )}

          {showNoSearchResultsEmptyPlaceholder && (
            <NoSearchResultsEmptyPlaceholder />
          )}

          {showNoBookingsEmptyPlaceholder && (
            <NoBookingsEmptyPlaceholder
              toggleDialogByName={props.toggleDialogByName}
              setShowNoBookingsEmptyPlaceholder={
                setShowNoBookingsEmptyPlaceholder
              }
            />
          )}
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    user: commonSelectors.selectUser(state),
    company: settingsSelectors.selectCompany(state),
  }),
  { toggleDialogByName, getBookings, getCompanyInformation }
);
export default connector(Bookings);
