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
import Button from "@material-ui/core/Button";
import { toggleDialogByName } from "../../slices/componentsSlice";
import { toggleSnackbar } from "../../slices/commonSlice";
import Tooltip from "@material-ui/core/Tooltip";
import BlockIcon from "@material-ui/icons/Block";

import {
  getRoom,
  editRoom,
  deleteRoom,
  blockRooms,
  getRoomBlockings,
  selectors as roomsSelectors,
} from "../../slices/adminSlice/roomsSlice";
import { IRoom } from "../../interfaces";
import AddEditRoomFormDialog, {
  ADD_EDIT_ROOM_FORM_DIALOG,
} from "./AddEditRoomFormDialog";
import { RootState } from "../../store";
import {
  BlockRoomFormDialog,
  BLOCK_ROOM_FORM_DIALOG,
} from "./BlockRoomFormDialog";

type PropsFromRedux = ConnectedProps<typeof connector>;
type RoomDetailsActionMenuProps = PropsFromRedux & {
  room: IRoom | null;
};
const RoomDetailsActionMenu = (props: RoomDetailsActionMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [cancelRoomOpen, setDeleteRoomOpen] = React.useState(false);
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
          <FormattedMessage id="App.rooms.roomDetails.actionMenuTooltip" />
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
          onClick={() => {
            props.toggleDialogByName({
              name: BLOCK_ROOM_FORM_DIALOG,
              isOpen: true,
            });
            props.getRoomBlockings({
              filter: { roomIds: [props.room?.id as string] },
            });
            handleClose();
          }}
        >
          <BlockIcon style={{ marginRight: 16, color: grey[700] }} />
          <FormattedMessage id="App.rooms.roomDetails.blockRoom" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.toggleDialogByName({
              name: ADD_EDIT_ROOM_FORM_DIALOG,
              isOpen: true,
            });
            handleClose();
          }}
        >
          <EditIcon style={{ marginRight: 16, color: grey[700] }} />
          <FormattedMessage id="App.rooms.roomDetails.editRoom" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteRoomOpen(true);
            handleClose();
          }}
        >
          <DeleteIcon style={{ marginRight: 16, color: grey[700] }} />
          <FormattedMessage id="App.rooms.roomDetails.deleteRoom" />
        </MenuItem>
      </Menu>
      <Dialog
        open={cancelRoomOpen}
        onClose={() => setDeleteRoomOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <FormattedMessage
            id="App.rooms.roomDetails.deleteRoom.dialogTitle"
            values={{ name: props.room?.name }}
          />
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteRoomOpen(false)} color="primary">
            <FormattedMessage id="App.common.disagree" />
          </Button>
          <Button
            onClick={async () => {
              setDeleteRoomOpen(false);
              if (props.deleteRoom) {
                await props.deleteRoom(props.room);
                router.back();
                props.toggleSnackbar({
                  isOpen: true,
                  messageLocale: "App.rooms.roomDetails.deleteRoom.success",
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
      {props.room && (
        <AddEditRoomFormDialog
          loading={props.editingRoom}
          initialValues={props.room}
          onSubmit={async (room: IRoom | null) => {
            await props.editRoom(room);
            await props.getRoom(room && (room.id as string));
            props.toggleDialogByName({
              name: ADD_EDIT_ROOM_FORM_DIALOG,
              isOpen: false,
            });
          }}
        />
      )}

      <BlockRoomFormDialog
        initialValues={{
          roomBlockings: props.roomBlockings,
        }}
        loading={false}
        onSubmit={async ({ roomBlockings }) => {
          await props.blockRooms([
            {
              roomId: props.room?.id as string,
              roomBlockings: roomBlockings || [],
            },
          ]);
          props.getRoomBlockings({
            filter: { roomIds: [props.room?.id as string] },
          });
          props.toggleDialogByName({
            name: BLOCK_ROOM_FORM_DIALOG,
            isOpen: false,
          });
        }}
      />
    </div>
  );
};

const connector = connect(
  (state: RootState) => ({
    roomBlockings: roomsSelectors.selectRoomBlockings(state),
    editingRoom: roomsSelectors.selectEditingRoom(state),
  }),
  {
    getRoom,
    editRoom,
    deleteRoom,
    toggleDialogByName,
    toggleSnackbar,
    blockRooms,
    getRoomBlockings,
  }
);

export default connector(RoomDetailsActionMenu);
