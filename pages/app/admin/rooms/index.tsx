import React from "react";
import Page from "../../../../app/components/common/Page/Page";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import ResponsiveTable from "../../../../app/components/common/ResponsiveTable/ResponsiveTable";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import { ExecuteOnce } from "@raultom/common-helpers/lib/helpers/ExecuteOnce";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { ConnectedProps } from "react-redux";
import Paper from "@material-ui/core/Paper";
import {
  roomsList,
  roomDetails,
  roomTypesList,
} from "../../../../app/helpers/navigation";
import { connect } from "react-redux";
import { RootState } from "../../../../app/store";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { toggleDialogByName } from "../../../../app/slices/componentsSlice";
import AddEditRoomFormDialog, {
  ADD_EDIT_ROOM_FORM_DIALOG,
} from "../../../../app/components/rooms/AddEditRoomFormDialog";
import { IRoom } from "../../../../app/interfaces";
import {
  getRooms,
  createRoom,
  blockRooms,
  getRoomBlockings,
  selectors as roomsSelectors,
} from "../../../../app/slices/adminSlice/roomsSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import StoreIcon from "@material-ui/icons/Store";
import grey from "@material-ui/core/colors/grey";
import Nav from "../../../../app/components/common/Nav/Nav";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";

export const API_REQUEST_DELAY = 500;
const executeOnce = new ExecuteOnce();

const useStyles = makeStyles((theme) => ({
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

interface NoRoomsEmptyPlaceholderProps {
  toggleDialogByName: ActionCreatorWithPayload<
    {
      name: string;
      isOpen: boolean;
    },
    string
  >;
}
function NoRoomsEmptyPlaceholder(props: NoRoomsEmptyPlaceholderProps) {
  const classes = useStyles();

  return (
    <div className={classes.noSearchResultsEmptyPlaceholder}>
      <StoreIcon className={classes.placeholderIcon} />
      <div className={classes.noResultsFoundTitle}>
        <FormattedMessage id="App.rooms.createFirstRoom.title" />
      </div>
      <div className={classes.noResultsFoundBody}>
        <FormattedMessage id="App.rooms.createFirstRoom.body" />
      </div>
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: "24px" }}
        onClick={() => {
          if (props.toggleDialogByName) {
            props.toggleDialogByName({
              name: ADD_EDIT_ROOM_FORM_DIALOG,
              isOpen: true,
            });
          }
        }}
      >
        <FormattedMessage id="App.rooms.createFirstRoom.createRoom" />
      </Button>
    </div>
  );
}

type PropsFromRedux = ConnectedProps<typeof connector>;
export type RoomsProps = PropsFromRedux & {};
const Rooms = (props: RoomsProps) => {
  const [fullSearch, setFullSearch] = React.useState("");
  const [
    showNoRoomsEmptyPlaceholder,
    setShowNoRoomsEmptyPlaceholder,
  ] = React.useState(false);
  const classes = useStyles();
  const history = useRouter();

  async function getRooms() {
    const rooms: IRoom[] = await props.getRooms();
    if (rooms.length === 0) {
      setShowNoRoomsEmptyPlaceholder(true);
    }
  }

  React.useEffect(() => {
    getRooms();
    // eslint-disable-next-line
  }, []);

  const showNoSearchResultsEmptyPlaceholder =
    !showNoRoomsEmptyPlaceholder &&
    Boolean(fullSearch) &&
    props.rooms.length === 0;

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          hideTitleOnXs
          titleLocale="App.rooms.title"
          actions={[
            <TextField
              key={0}
              value={fullSearch}
              label={<FormattedMessage id="App.rooms.searchRoom" />}
              onChange={(event) => {
                const value = event.target.value;
                setFullSearch(value);

                executeOnce.execute(async () => {
                  history.replace(
                    roomsList({
                      filter: { fullSearch: value },
                    })
                  );
                  await props.getRooms({ filter: { fullSearch: value } });
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
                    name: ADD_EDIT_ROOM_FORM_DIALOG,
                    isOpen: true,
                  });
                }
              }}
            >
              <AddIcon />
            </Fab>,
          ]}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Paper elevation={0}>
              <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                aria-label="disabled tabs example"
                onChange={(_, newValue) => {
                  if (newValue === 1) {
                    history.replace(roomTypesList());
                  }
                }}
              >
                <Tab label="Rooms" />
                <Tab label="Room types" />
              </Tabs>
            </Paper>
          </div>

          {props.rooms.length > 0 && (
            <Paper elevation={0}>
              <ResponsiveTable
                listItems={props.rooms}
                tableHeaderCells={[
                  <TableCell key={0}>
                    <FormattedMessage id="App.common.name" />
                  </TableCell>,
                  <TableCell key={1}>
                    <FormattedMessage id="App.rooms.roomType" />
                  </TableCell>,
                ]}
                renderDesktopRow={(row: IRoom) => (
                  <TableRow
                    hover
                    key={row.id}
                    className={classes.tableRow}
                    onClick={() => history.push(roomDetails(row?.id as string))}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.roomType?.name}</TableCell>
                  </TableRow>
                )}
                renderMobileRow={(row: IRoom) => (
                  <ListItem
                    button
                    key={row.id}
                    alignItems="flex-start"
                    onClick={() => history.push(roomDetails(row.id as string))}
                  >
                    <ListItemText
                      primary={row.name}
                      secondary={row.roomType?.name}
                    />
                  </ListItem>
                )}
              />
            </Paper>
          )}

          {showNoSearchResultsEmptyPlaceholder && (
            <NoSearchResultsEmptyPlaceholder />
          )}

          {showNoRoomsEmptyPlaceholder && (
            <NoRoomsEmptyPlaceholder
              toggleDialogByName={props.toggleDialogByName}
            />
          )}

          <AddEditRoomFormDialog
            loading={props.creatingRoom}
            onSubmit={async (data: IRoom | null) => {
              await props.createRoom(data);
              props.toggleDialogByName({
                name: ADD_EDIT_ROOM_FORM_DIALOG,
                isOpen: false,
              });
              await props.getRooms();
              setShowNoRoomsEmptyPlaceholder(false);
            }}
          />
        </Page>
      </div>
    </div>
  );
};

const connector = connect(
  (state: RootState) => ({
    roomBlockings: roomsSelectors.selectRoomBlockings(state),
    creatingRoom: roomsSelectors.selectCreatingRoom(state),
    rooms: roomsSelectors.selectRooms(state),
  }),
  { toggleDialogByName, getRooms, createRoom, blockRooms, getRoomBlockings }
);
export default connector(Rooms);
