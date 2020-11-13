import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import ListItem from "@material-ui/core/ListItem";
import TableCell from "@material-ui/core/TableCell";
import ListItemText from "@material-ui/core/ListItemText";
import TableRow from "@material-ui/core/TableRow";
import ResponsiveTable from "../../common/ResponsiveTable/ResponsiveTable";
import { FormattedCurrencyLabel } from "../../common/FormattedCurrencyLabel/FormattedCurrencyLabel";
import { IBooking } from "../../../interfaces";
import { useRouter } from "next/router";
import { bookingDetails } from "../../../helpers/navigation";
import { ICompany, CURRENCY, LANGUAGE, IUser } from "../../../interfaces";
import { getFullName } from "../../../services/commonService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: "0px",
    boxShadow: "0 0 14px 0 rgba(53,64,82,.05)",
    borderRadius: "4px",
    display: "none",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  titleContainer: {
    padding: "16px 16px 0px 16px",
  },
  table: {},
  tableRow: {
    cursor: "pointer",
  },
}));

type IDashboardBookingsProps = {
  bookings: IBooking[];
  company: ICompany | null;
  user?: IUser | null;
  title: React.ReactNode;
};
export function DashboardBookings(props: IDashboardBookingsProps) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.titleContainer}>{props.title}</div>

      <ResponsiveTable
        listItems={props.bookings}
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
        renderDesktopRow={(row: IBooking) => (
          <TableRow
            hover
            key={row.id}
            className={classes.tableRow}
            onClick={() => router.push(bookingDetails(row.id as string))}
          >
            <TableCell component="th" scope="row">
              {row.customer?.firstName} {row.customer?.lastName}
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
        )}
        renderMobileRow={(row: IBooking) => (
          <ListItem
            button
            key={row.id}
            alignItems="flex-start"
            onClick={() => router.push(bookingDetails(row.id as string))}
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
  );
}
