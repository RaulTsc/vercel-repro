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
  roomTypesList,
  roomTypeDetails,
  roomsList,
} from "../../../../app/helpers/navigation";
import { connect } from "react-redux";
import { RootState } from "../../../../app/store";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { toggleDialogByName } from "../../../../app/slices/componentsSlice";
import AddEditRoomTypeFormDialog, {
  ADD_EDIT_ROOM_TYPE_FORM_DIALOG,
} from "../../../../app/components/roomTypes/AddEditRoomTypeFormDialog";
import { IRoomType, IRoomTypeAmenity } from "../../../../app/interfaces";
import {
  getRoomTypes,
  createRoomType,
  selectors as roomTypesSelectors,
} from "../../../../app/slices/adminSlice/roomTypesSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import grey from "@material-ui/core/colors/grey";
import { FormattedCurrencyLabel } from "../../../../app/components/common/FormattedCurrencyLabel/FormattedCurrencyLabel";
import { selectors as commonSelectors } from "../../../../app/slices/commonSlice";
import { selectors as settingsSelectors } from "../../../../app/slices/adminSlice/settingsSlice";
import { LANGUAGE, CURRENCY } from "../../../../app/interfaces";
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

interface NoRoomTypesEmptyPlaceholderProps {
  toggleDialogByName: ActionCreatorWithPayload<
    {
      name: string;
      isOpen: boolean;
    },
    string
  >;
}
function NoRoomTypesEmptyPlaceholder(props: NoRoomTypesEmptyPlaceholderProps) {
  const classes = useStyles();

  return (
    <div className={classes.noSearchResultsEmptyPlaceholder}>
      <MeetingRoomIcon className={classes.placeholderIcon} />
      <div className={classes.noResultsFoundTitle}>
        <FormattedMessage id="App.rooms.createFirstRoomType.title" />
      </div>
      <div className={classes.noResultsFoundBody}>
        <FormattedMessage id="App.rooms.createFirstRoomType.body" />
      </div>
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: "24px" }}
        onClick={() => {
          if (props.toggleDialogByName) {
            props.toggleDialogByName({
              name: ADD_EDIT_ROOM_TYPE_FORM_DIALOG,
              isOpen: true,
            });
          }
        }}
      >
        <FormattedMessage id="App.rooms.createFirstRoomType.createRoomType" />
      </Button>
    </div>
  );
}

export const defaultAmenities: IRoomTypeAmenity[] = [
  {
    locale: "App.common.amenities.toiletPaper",
  },
  {
    locale: "App.common.amenities.towels",
  },
  {
    locale: "App.common.amenities.bathtub",
  },
  {
    locale: "App.common.amenities.shower",
  },
  {
    locale: "App.common.amenities.slippers",
  },
  {
    locale: "App.common.amenities.privateBathroom",
  },
  {
    locale: "App.common.amenities.freeToiletries",
  },
  {
    locale: "App.common.amenities.freeWifi",
  },
  {
    locale: "App.common.amenities.bathrobe",
  },
  {
    locale: "App.common.amenities.airConditioning",
  },
  {
    locale: "App.common.amenities.cityView",
  },
  {
    locale: "App.common.amenities.greatView",
  },
  {
    locale: "App.common.amenities.hairdrier",
  },
  {
    locale: "App.common.amenities.bedsheets",
  },
  {
    locale: "App.common.amenities.closet",
  },
  {
    locale: "App.common.amenities.balcony",
  },
  {
    locale: "App.common.amenities.terrace",
  },
  {
    locale: "App.common.amenities.petsAccepted",
  },
  {
    locale: "App.common.amenities.petsNotAccepted",
  },
  {
    locale: "App.common.amenities.tv",
  },
  {
    locale: "App.common.amenities.breakfastInRoom",
  },
  {
    locale: "App.common.amenities.minibar",
  },
  {
    locale: "App.common.amenities.heating",
  },
];

type PropsFromRedux = ConnectedProps<typeof connector>;
export type RoomTypesProps = PropsFromRedux & {};
const RoomTypes = (props: RoomTypesProps) => {
  const [fullSearch, setFullSearch] = React.useState("");
  const [
    showNoRoomTypesEmptyPlaceholder,
    setShowNoRoomTypesEmptyPlaceholder,
  ] = React.useState(false);
  const classes = useStyles();
  const router = useRouter();
  async function getRoomTypes() {
    const roomTypes: IRoomType[] = await props.getRoomTypes();
    if (roomTypes.length === 0) {
      setShowNoRoomTypesEmptyPlaceholder(true);
    }
  }

  React.useEffect(() => {
    getRoomTypes();
    // eslint-disable-next-line
  }, []);

  const showNoSearchResultsEmptyPlaceholder =
    !showNoRoomTypesEmptyPlaceholder &&
    Boolean(fullSearch) &&
    props.roomTypes.length === 0;

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          hideTitleOnXs
          titleLocale="App.roomTypes.title"
          actions={[
            <TextField
              key={0}
              value={fullSearch}
              label={<FormattedMessage id="App.roomTypes.searchRoomType" />}
              onChange={(event) => {
                const value = event.target.value;
                setFullSearch(value);

                executeOnce.execute(async () => {
                  router.replace(
                    roomTypesList({
                      filter: { fullSearch: value },
                    })
                  );
                  await props.getRoomTypes({ filter: { fullSearch: value } });
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
                    name: ADD_EDIT_ROOM_TYPE_FORM_DIALOG,
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
                value={1}
                indicatorColor="primary"
                textColor="primary"
                aria-label="disabled tabs example"
                onChange={(_, newValue) => {
                  if (newValue === 0) {
                    router.replace(roomsList());
                  }
                }}
              >
                <Tab label="Rooms" />
                <Tab label="Room types" />
              </Tabs>
            </Paper>
          </div>

          {props.roomTypes.length > 0 && (
            <Paper elevation={0}>
              <ResponsiveTable
                listItems={props.roomTypes}
                tableHeaderCells={[
                  <TableCell key={0}>
                    <FormattedMessage id="App.common.name" />
                  </TableCell>,
                  <TableCell key={1}>
                    <FormattedMessage id="App.roomTypes.rate" />
                  </TableCell>,
                  <TableCell key={2}>
                    <FormattedMessage id="App.roomTypes.maxNumberOfGuests" />
                  </TableCell>,
                ]}
                renderDesktopRow={(row: IRoomType) => (
                  <TableRow
                    hover
                    key={row.id}
                    className={classes.tableRow}
                    onClick={() =>
                      router.push(roomTypeDetails(row?.id as string))
                    }
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <FormattedCurrencyLabel
                        language={props.user?.language as LANGUAGE}
                        amount={row.rate as number}
                        currency={props.company?.currency as CURRENCY}
                      />
                    </TableCell>
                    <TableCell>{row.maxNumberOfGuests}</TableCell>
                  </TableRow>
                )}
                renderMobileRow={(row: IRoomType) => (
                  <ListItem
                    button
                    key={row.id}
                    alignItems="flex-start"
                    onClick={() =>
                      router.push(roomTypeDetails(row.id as string))
                    }
                  >
                    <ListItemText
                      primary={row.name}
                      secondary={
                        <span>
                          {row.rate}{" "}
                          {row.maxNumberOfGuests && (
                            <span>- {row.maxNumberOfGuests}</span>
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

          {showNoRoomTypesEmptyPlaceholder && (
            <NoRoomTypesEmptyPlaceholder
              toggleDialogByName={props.toggleDialogByName}
            />
          )}

          <AddEditRoomTypeFormDialog
            loading={props.creatingRoomType}
            initialValues={{ amenities: defaultAmenities }}
            onSubmit={async (data: IRoomType | null) => {
              await props.createRoomType(data);
              props.toggleDialogByName({
                name: ADD_EDIT_ROOM_TYPE_FORM_DIALOG,
                isOpen: false,
              });
              await props.getRoomTypes();
              setShowNoRoomTypesEmptyPlaceholder(false);
            }}
          />
        </Page>
      </div>
    </div>
  );
};

const connector = connect(
  (state: RootState) => ({
    user: commonSelectors.selectUser(state),
    company: settingsSelectors.selectCompany(state),
    creatingRoomType: roomTypesSelectors.selectCreatingRoomType(state),
    roomTypes: roomTypesSelectors.selectRoomTypes(state),
  }),
  { toggleDialogByName, getRoomTypes, createRoomType }
);
export default connector(RoomTypes);
