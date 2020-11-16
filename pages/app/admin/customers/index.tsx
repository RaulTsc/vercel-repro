import React from "react";
import Page from "../../../../app/components/common/Page/Page";
import { FormattedMessage } from "react-intl";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { toggleDialogByName } from "../../../../app/slices/componentsSlice";
import { connect, ConnectedProps } from "react-redux";
import { useRouter } from "next/router";
import AddEditCustomerFormDialog, {
  ADD_EDIT_CUSTOMER_FORM_DIALOG,
} from "../../../../app/components/customers/AddEditCustomerFormDialog";
import { customerDetails } from "../../../../app/helpers/navigation";
import TextField from "@material-ui/core/TextField";
import ResponsiveTable from "../../../../app/components/common/ResponsiveTable/ResponsiveTable";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { RootState } from "../../../../app/store";
import {
  selectors as customersSelectors,
  getCustomers,
  createCustomer,
} from "../../../../app/slices/adminSlice/customersSlice";
import { ICustomer } from "../../../../app/interfaces";
import { getFullName } from "../../../../app/services/commonService";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import PersonIcon from "@material-ui/icons/Person";
import { ExecuteOnce } from "@raultom/common-helpers/lib/helpers/ExecuteOnce";
import { customersList } from "../../../../app/helpers/navigation";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";
import Nav from "../../../../app/components/common/Nav/Nav";

export const API_REQUEST_DELAY = 500;
const executeOnce = new ExecuteOnce();

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
  placeholderIcon: { fontSize: 96, color: grey[700] },
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

function NoSearchResultsEmptyPlaceholder() {
  const classes = useStyles();

  return (
    <div className={classes.noSearchResultsEmptyPlaceholder}>
      <SentimentDissatisfiedIcon className={classes.placeholderIcon} />
      <div className={classes.noResultsFoundTitle}>
        <FormattedMessage id="App.common.search.noResultsFound.title" />
      </div>
      <div className={classes.noResultsFoundBody}>
        <FormattedMessage id="App.common.search.noResultsFound.body" />
      </div>
    </div>
  );
}

interface NoCustomersEmptyPlaceholderProps {
  toggleDialogByName: ActionCreatorWithPayload<
    {
      name: string;
      isOpen: boolean;
    },
    string
  >;
}
function NoCustomersEmptyPlaceholder(props: NoCustomersEmptyPlaceholderProps) {
  const classes = useStyles();

  return (
    <div className={classes.noSearchResultsEmptyPlaceholder}>
      <PersonIcon className={classes.placeholderIcon} />
      <div className={classes.noResultsFoundTitle}>
        <FormattedMessage id="App.customers.createFirstCustomer.title" />
      </div>
      <div className={classes.noResultsFoundBody}>
        <FormattedMessage id="App.customers.createFirstCustomer.body" />
      </div>
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: "24px" }}
        onClick={() => {
          if (props.toggleDialogByName) {
            props.toggleDialogByName({
              name: ADD_EDIT_CUSTOMER_FORM_DIALOG,
              isOpen: true,
            });
          }
        }}
      >
        <FormattedMessage id="App.customers.createFirstCustomer.createCustomer" />
      </Button>
    </div>
  );
}

type PropsFromRedux = ConnectedProps<typeof connector>;
export type CustomersProps = PropsFromRedux & {};
function Customers(props: CustomersProps) {
  const [fullSearch, setFullSearch] = React.useState("");
  const [
    showNoCustomersEmptyPlaceholder,
    setShowNoCustomersEmptyPlaceholder,
  ] = React.useState(false);
  const classes = useStyles();
  const router = useRouter();

  async function getCustomers() {
    const customers: ICustomer[] = await props.getCustomers();
    if (customers.length === 0) {
      setShowNoCustomersEmptyPlaceholder(true);
    }
  }

  React.useEffect(() => {
    getCustomers();
    // eslint-disable-next-line
  }, []);

  const showNoSearchResultsEmptyPlaceholder =
    !showNoCustomersEmptyPlaceholder &&
    Boolean(fullSearch) &&
    props.customers.length === 0;

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          hideTitleOnXs
          titleLocale="App.customers.customersTitle"
          actions={[
            <TextField
              key={0}
              label={<FormattedMessage id="App.customers.searchCustomer" />}
              onChange={(event) => {
                const value = event.target.value;
                setFullSearch(value);

                executeOnce.execute(async () => {
                  router.replace(
                    customersList({
                      filter: { fullSearch: value },
                    })
                  );
                  await props.getCustomers({ filter: { fullSearch: value } });
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
                    name: ADD_EDIT_CUSTOMER_FORM_DIALOG,
                    isOpen: true,
                  });
                }
              }}
            >
              <AddIcon />
            </Fab>,
          ]}
        >
          {props.customers.length > 0 && (
            <Paper elevation={0}>
              <ResponsiveTable
                listItems={props.customers}
                tableHeaderCells={[
                  <TableCell key={0}>
                    <FormattedMessage id="App.common.name" />
                  </TableCell>,
                  <TableCell key={1}>
                    <FormattedMessage id="App.common.phoneNumber" />
                  </TableCell>,
                  <TableCell key={2}>
                    <FormattedMessage id="App.common.email" />
                  </TableCell>,
                ]}
                renderDesktopRow={(row: ICustomer) => (
                  <TableRow
                    hover
                    key={row.id}
                    className={classes.tableRow}
                    onClick={() => router.push(customerDetails(row.id))}
                  >
                    <TableCell component="th" scope="row">
                      {getFullName(row)}
                    </TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                )}
                renderMobileRow={(row: ICustomer) => (
                  <ListItem
                    button
                    key={row.id}
                    alignItems="flex-start"
                    onClick={() => router.push(customerDetails(row.id))}
                  >
                    <ListItemText
                      primary={getFullName(row)}
                      secondary={row.phoneNumber}
                    />
                  </ListItem>
                )}
              />
            </Paper>
          )}
          {showNoSearchResultsEmptyPlaceholder && (
            <NoSearchResultsEmptyPlaceholder />
          )}
          {showNoCustomersEmptyPlaceholder && (
            <NoCustomersEmptyPlaceholder
              toggleDialogByName={props.toggleDialogByName}
            />
          )}
          <AddEditCustomerFormDialog
            onSubmit={async (customer) => {
              await props.createCustomer(customer);
              props.toggleDialogByName({
                name: ADD_EDIT_CUSTOMER_FORM_DIALOG,
                isOpen: false,
              });
              await props.getCustomers();
              setShowNoCustomersEmptyPlaceholder(false);
            }}
          />
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    customers: customersSelectors.selectCustomers(state),
  }),
  { toggleDialogByName, getCustomers, createCustomer }
);

export default connector(Customers);
