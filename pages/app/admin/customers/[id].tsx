import React from "react";
import Page from "../../../../app/components/common/Page/Page";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import { RootState } from "../../../../app/store";
import { connect, ConnectedProps } from "react-redux";
import moment from "moment";
import { formatCurrency } from "@raultom/common-helpers/lib/helpers/formatters";

import {
  selectors as customersSelectors,
  getCustomer,
} from "../../../../app/slices/adminSlice/customersSlice";
import { useRouter } from "next/router";
import { getFullName } from "../../../../app/services/commonService";
import CustomerDetailsActionMenu from "../../../../app/components/customers/CustomerDetailsActionMenu";
import {
  ICustomer,
  IBooking,
  IUser,
  LANGUAGE,
  ICompany,
} from "../../../../app/interfaces";
import { FormattedMessage } from "react-intl";
import { formatDate, DATE_FORMATS } from "@raultom/common-helpers/lib/helpers";
import { selectors as commonSelectors } from "../../../../app/slices/commonSlice";

import { CustomerDetailsHeader } from "../../../../app/components/customers/CustomerDetailsHeader";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";
import Nav from "../../../../app/components/common/Nav/Nav";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px 20px 0px 20px",
  },
  inline: {
    display: "inline",
  },
}));

export type CustomerBookingProps = {
  customer: ICustomer | null;
  user: IUser | null;
  company: ICompany | null;
  booking: IBooking;
  showDivider: boolean;
};
export function CustomerBooking(props: CustomerBookingProps) {
  const classes = useStyles();
  const isCheckoutDateInThePast = moment(props.booking?.checkoutDate).isBefore(
    moment.now()
  );

  return (
    <>
      <ListItem disableGutters alignItems="flex-start">
        <ListItemText
          primary={
            <FormattedMessage
              id="App.customers.customerDetails.bookingTitle"
              values={{
                checkinDate: formatDate({
                  date: props.booking?.checkinDate,
                  format: DATE_FORMATS.DD_MM_YYYY,
                }),
                checkoutDate: formatDate({
                  date: props.booking?.checkoutDate,
                  format: DATE_FORMATS.DD_MM_YYYY,
                }),
              }}
            />
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {getFullName(props.customer)}
              </Typography>
              <span>{" — "}</span>
              {isCheckoutDateInThePast && (
                <span>
                  {props.booking.numberOfPersons && (
                    <span>
                      <FormattedMessage
                        id="App.customers.customerDetails.pastBooking.description.withNumberOfPersons"
                        values={{
                          numberOfPersons: props.booking.numberOfPersons,
                          totalCost: formatCurrency(
                            props.user?.language as LANGUAGE,
                            props.booking.totalCost as number,
                            props.company?.currency
                          ),
                        }}
                      />
                    </span>
                  )}
                  {!props.booking.numberOfPersons && (
                    <span>
                      <FormattedMessage
                        id="App.customers.customerDetails.pastBooking.description.numberOfPersonsUnknown"
                        values={{
                          totalCost: formatCurrency(
                            props.user?.language as LANGUAGE,
                            props.booking.totalCost as number,
                            props.company?.currency
                          ),
                        }}
                      />
                    </span>
                  )}
                </span>
              )}
              {!isCheckoutDateInThePast && (
                <span>
                  {props.booking.numberOfPersons && (
                    <span>
                      <FormattedMessage
                        id="App.customers.customerDetails.futureBooking.description.withNumberOfPersons"
                        values={{
                          numberOfPersons: props.booking.numberOfPersons,
                          totalCost: formatCurrency(
                            props.user?.language as LANGUAGE,
                            props.booking.totalCost as number,
                            props.company?.currency
                          ),
                        }}
                      />
                    </span>
                  )}
                  {!props.booking.numberOfPersons && (
                    <span>
                      <FormattedMessage
                        id="App.customers.customerDetails.futureBooking.description.numberOfPersonsUnknown"
                        values={{
                          totalCost: formatCurrency(
                            props.user?.language as LANGUAGE,
                            props.booking.totalCost as number,
                            props.company?.currency
                          ),
                        }}
                      />
                    </span>
                  )}
                </span>
              )}
            </>
          }
        />
      </ListItem>
      {props.showDivider && <Divider variant="inset" component="li" />}
    </>
  );
}

type PropsFromRedux = ConnectedProps<typeof connector>;
export type CustomerDetailsProps = PropsFromRedux & {};
function CustomerDetails(props: CustomerDetailsProps) {
  const classes = useStyles();
  const router = useRouter();
  const customerId: string = router.query.id as string;

  React.useEffect(() => {
    props.getCustomer(customerId);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          titleLocale="App.customers.customerDetails.title"
          backTitleLocale="App.customers.customerDetails.backTitle"
          actions={[
            <CustomerDetailsActionMenu key={0} customer={props.customer} />,
          ]}
        >
          <Paper elevation={0} className={classes.paper}>
            <CustomerDetailsHeader customer={props.customer as ICustomer} />

            <List>
              {(props.customer?.bookings || []).map(
                (booking: IBooking, index: number) => (
                  <CustomerBooking
                    key={booking.id}
                    customer={props.customer}
                    user={props.user}
                    company={props.company}
                    booking={booking}
                    showDivider={
                      index < (props.customer?.bookings || []).length - 1
                    }
                  />
                )
              )}
            </List>
          </Paper>
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    user: commonSelectors.selectUser(state),
    company: commonSelectors.selectCompany(state),
    customer: customersSelectors.selectCustomer(state),
  }),
  { getCustomer }
);
export default connector(CustomerDetails);
