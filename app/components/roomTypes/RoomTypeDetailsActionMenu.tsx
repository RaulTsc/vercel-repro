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
  getRoomType,
  editRoomType,
  deleteRoomType,
  selectors as roomTypesSelectors,
} from "../../slices/adminSlice/roomTypesSlice";
import { IRoomType } from "../../interfaces";
import AddEditRoomTypeFormDialog, {
  ADD_EDIT_ROOM_TYPE_FORM_DIALOG,
} from "./AddEditRoomTypeFormDialog";
import { RootState } from "../../store";

type PropsFromRedux = ConnectedProps<typeof connector>;
type RoomTypeDetailsActionMenuProps = PropsFromRedux & {
  roomType: IRoomType | null;
};
const RoomTypeDetailsActionMenu = (props: RoomTypeDetailsActionMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [cancelRoomTypeOpen, setDeleteRoomTypeOpen] = React.useState(false);
  const history = useRouter();

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
          <FormattedMessage id="App.roomTypes.roomTypeDetails.actionMenuTooltip" />
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
              name: ADD_EDIT_ROOM_TYPE_FORM_DIALOG,
              isOpen: true,
            });
            handleClose();
          }}
        >
          <EditIcon style={{ marginRight: 16, color: grey[600] }} />
          <FormattedMessage id="App.roomTypes.roomTypeDetails.editRoomType" />
        </MenuItem>
        <MenuItem
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setDeleteRoomTypeOpen(true);
            handleClose();
          }}
        >
          <DeleteIcon style={{ marginRight: 16, color: grey[600] }} />
          <FormattedMessage id="App.roomTypes.roomTypeDetails.deleteRoomType" />
        </MenuItem>
      </Menu>
      <Dialog
        open={cancelRoomTypeOpen}
        onClose={() => setDeleteRoomTypeOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage id="App.roomTypes.roomTypeDetails.deleteRoomType.dialogTitle" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage
              id="App.roomTypes.roomTypeDetails.deleteRoomType.dialogBody"
              values={{ name: props.roomType?.name }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteRoomTypeOpen(false)} color="primary">
            <FormattedMessage id="App.common.disagree" />
          </Button>
          <Button
            onClick={async () => {
              setDeleteRoomTypeOpen(false);
              if (props.deleteRoomType) {
                await props.deleteRoomType(props.roomType);
                history.back();
                props.toggleSnackbar({
                  isOpen: true,
                  messageLocale:
                    "App.roomTypes.roomTypeDetails.deleteRoomType.success",
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
      {props.roomType && (
        <AddEditRoomTypeFormDialog
          loading={props.editingRoomType}
          initialValues={props.roomType}
          onSubmit={async (roomType: IRoomType | null) => {
            await props.editRoomType(roomType);
            await props.getRoomType(roomType && roomType.id);
            props.toggleDialogByName({
              name: ADD_EDIT_ROOM_TYPE_FORM_DIALOG,
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
    editingRoomType: roomTypesSelectors.selectEditingRoomType(state),
  }),
  {
    getRoomType,
    editRoomType,
    deleteRoomType,
    toggleDialogByName,
    toggleSnackbar,
  }
);

export default connector(RoomTypeDetailsActionMenu);
