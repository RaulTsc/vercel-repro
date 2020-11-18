import React from "react";
import ListItem from "@material-ui/core/ListItem";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ResponsiveTable from "../../../../app/components/common/ResponsiveTable/ResponsiveTable";
import { connect, ConnectedProps } from "react-redux";
import Page from "../../../../app/components/common/Page/Page";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  getRoom,
  blockRooms,
  getRoomBlockings,
  selectors,
} from "../../../../app/slices/adminSlice/roomsSlice";
import CardItem from "../../../../app/components/common/CardItem/CardItem";
import { FormattedMessage } from "react-intl";
import RoomDetailsActionMenu from "../../../../app/components/rooms/RoomDetailsActionMenu";
import { RootState } from "../../../../app/store";
import { useRouter } from "next/router";
import { toggleDialogByName } from "../../../../app/slices/componentsSlice";
import FormattedDateLabel from "../../../../app/components/common/FormattedDateLabel/FormattedDateLabel";
import { IRoomBlocking } from "../../../../app/components/rooms/BlockRoomFormDialog";
import { ResponsiveImage } from "../../../../app/components/common/ResponsiveImage/ResponsiveImage";
import * as imageService from "../../../../app/services/imageService";
import Nav from "../../../../app/components/common/Nav/Nav";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  mainBody: {},
}));

type PropsFromRedux = ConnectedProps<typeof connector>;
export type RoomDetailsProps = PropsFromRedux & {};
export function RoomDetails(props: RoomDetailsProps) {
  const classes = useStyles();
  const router = useRouter();
  const roomId: string = router.query.id as string;

  React.useEffect(() => {
    props.getRoom(roomId);
    props.getRoomBlockings({ filter: { roomIds: [roomId] } });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          titleLocale="App.rooms.roomDetails.title"
          backTitleLocale="App.rooms.roomDetails.backTitle"
          actions={[<RoomDetailsActionMenu key={0} room={props.room} />]}
        >
          <Grid container spacing={2} className={classes.mainBody}>
            <Grid item xs={12}>
              <Paper style={{ padding: "20px" }} elevation={0}>
                <Grid container spacing={2}>
                  <Grid item sm={4} xs={12}>
                    <CardItem
                      loading={props.loading}
                      label={<FormattedMessage id="App.rooms.room.name" />}
                      text={props.room?.name}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <CardItem
                      loading={props.loading}
                      label={<FormattedMessage id="App.rooms.room.roomType" />}
                      text={props.room?.roomType?.name}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <CardItem
                      loading={props.loading}
                      label={
                        <FormattedMessage id="App.rooms.room.numberOfBeds" />
                      }
                      text={props.room?.numberOfBeds}
                    />
                  </Grid>
                </Grid>
                {props.room?.numberOfBathrooms && (
                  <Grid container spacing={2} style={{ marginTop: 8 }}>
                    <Grid item xs={12}>
                      <CardItem
                        loading={props.loading}
                        label={
                          <FormattedMessage id="App.rooms.room.numberOfBathrooms" />
                        }
                        text={props.room?.numberOfBathrooms}
                        style={{ whiteSpace: "pre-line" }}
                      />
                    </Grid>
                  </Grid>
                )}
                <div style={{ display: "flex", marginTop: "20px" }}>
                  {(props.room?.images || []).map((image) => (
                    <ResponsiveImage
                      src={imageService.getImagePath(image)}
                      width={60}
                      height={60}
                      style={{ marginRight: "10px" }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            {props.roomBlockings.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Paper elevation={0}>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: 600, padding: "16px 16px 0px 16px" }}
                    >
                      <FormattedMessage id="App.admin.rooms.blockedRooms.title" />
                    </Typography>
                    <ResponsiveTable
                      listItems={props.roomBlockings}
                      tableHeaderCells={[
                        <TableCell key={0}>
                          <FormattedMessage id="App.admin.rooms.blockRooms.startDate" />
                        </TableCell>,
                        <TableCell key={1}>
                          <FormattedMessage id="App.admin.rooms.blockRooms.endDate" />
                        </TableCell>,
                      ]}
                      renderDesktopRow={(row: IRoomBlocking) => (
                        <TableRow hover key={row.id}>
                          <TableCell component="th" scope="row">
                            <FormattedDateLabel date={row.startDate} />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <FormattedDateLabel date={row.endDate} />
                          </TableCell>
                        </TableRow>
                      )}
                      renderMobileRow={(row: IRoomBlocking) => (
                        <ListItem button key={row.id} alignItems="flex-start">
                          <ListItemText
                            primary={
                              <span>
                                <FormattedDateLabel date={row.startDate} /> -{" "}
                                <FormattedDateLabel date={row.endDate} />
                              </span>
                            }
                          />
                        </ListItem>
                      )}
                    />
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    roomBlockings: selectors.selectRoomBlockings(state),
    loading: selectors.selectLoading(state),
    room: selectors.selectRoom(state),
  }),
  { getRoom, toggleDialogByName, blockRooms, getRoomBlockings }
);
export default connector(RoomDetails);
