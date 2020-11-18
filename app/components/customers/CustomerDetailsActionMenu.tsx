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
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { toggleDialogByName } from "../../slices/componentsSlice";
import { toggleSnackbar } from "../../slices/commonSlice";
import Tooltip from "@material-ui/core/Tooltip";

import {
  getCustomer,
  editCustomer,
  deleteCustomer,
  selectors as customersSelectors,
} from "../../slices/adminSlice/customersSlice";
import { ICustomer } from "../../interfaces";
import AddEditCustomerFormDialog, {
  ADD_EDIT_CUSTOMER_FORM_DIALOG,
} from "./AddEditCustomerFormDialog";
import { RootState } from "../../store";
import { getFullName } from "../../services/commonService";

type PropsFromRedux = ConnectedProps<typeof connector>;
type CustomerDetailsActionMenuProps = PropsFromRedux & {
  customer: ICustomer | null;
};
const CustomerDetailsActionMenu = (props: CustomerDetailsActionMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [cancelCustomerOpen, setDeleteCustomerOpen] = React.useState(false);
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
          <FormattedMessage id="App.customers.customerDetails.actionMenuTooltip" />
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
              name: ADD_EDIT_CUSTOMER_FORM_DIALOG,
              isOpen: true,
            });
            handleClose();
          }}
        >
          <EditIcon style={{ marginRight: 16, color: grey[600] }} />
          <FormattedMessage id="App.customers.customerDetails.editCustomer" />
        </MenuItem>
        <MenuItem
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setDeleteCustomerOpen(true);
            handleClose();
          }}
        >
          <DeleteIcon style={{ marginRight: 16, color: grey[600] }} />
          <FormattedMessage id="App.customers.customerDetails.deleteCustomer" />
        </MenuItem>
      </Menu>
      <Dialog
        open={cancelCustomerOpen}
        onClose={() => setDeleteCustomerOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <FormattedMessage id="App.customers.customerDetails.deleteCustomer.dialogBody" />
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteCustomerOpen(false)} color="primary">
            <FormattedMessage id="App.common.disagree" />
          </Button>
          <Button
            onClick={async () => {
              setDeleteCustomerOpen(false);
              if (props.deleteCustomer) {
                await props.deleteCustomer(props.customer);
                router.back();
                props.toggleSnackbar({
                  isOpen: true,
                  messageLocale:
                    "App.customers.customerDetails.deleteCustomer.success",
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
      {props.customer && (
        <AddEditCustomerFormDialog
          loading={props.editingCustomer}
          initialValues={props.customer}
          onSubmit={async (customer: ICustomer | null) => {
            await props.editCustomer(customer);
            await props.getCustomer(customer && customer.id);
            props.toggleDialogByName({
              name: ADD_EDIT_CUSTOMER_FORM_DIALOG,
              isOpen: false,
            });
          }}
        />
      )}
    </div>
  );
};

const connector = connect(
  (state: RootState) => ({
    editingCustomer: customersSelectors.selectEditingCustomer(state),
  }),
  {
    getCustomer,
    editCustomer,
    deleteCustomer,
    toggleDialogByName,
    toggleSnackbar,
  }
);

export default connector(CustomerDetailsActionMenu);
