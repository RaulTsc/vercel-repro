import React from "react";
import moment from "moment";
import "moment/locale/de";
import { connect, ConnectedProps } from "react-redux";
import Page from "../../../../app/components/common/Page/Page";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import dayGridPlugin from "@fullcalendar/daygrid";
import adaptivePlugin from "@fullcalendar/adaptive";
import enLocale from "@fullcalendar/core/locales/en-gb";
import deLocale from "@fullcalendar/core/locales/de";
import roLocale from "@fullcalendar/core/locales/ro";
import { makeStyles } from "@material-ui/core/styles";
import interactionPlugin, {
  EventDropArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { RootState } from "../../../../app/store";
import resourceDayGridPlugin from "@fullcalendar/resource-daygrid";

import {
  selectors as calendarSelectors,
  getRoomBookings,
  getRooms,
  patchRoomBooking,
  deleteRoomBooking,
} from "../../../../app/slices/adminSlice/calendarSlice";
import {
  DateOrString,
  SORT_DIRECTION,
  LANGUAGE,
  IRoomBooking,
  IRoom,
  IRoomBlocking,
} from "../../../../app/interfaces";
import * as calendarService from "../../../../app/services/calendarService";

import AddBookingFormDialog, {
  ICreateBooking,
  formToApiMapper as mapBookingForApi,
  roomBookingToApiMapper,
} from "../../../../app/components/common/AddBookingFormDialog/AddBookingFormDialog";
import {
  getRoomBlockings,
  patchRoomBlocking,
  deleteRoomBlocking,
  selectors as roomsSelectors,
} from "../../../../app/slices/adminSlice/roomsSlice";

import { toggleDialogByName } from "../../../../app/slices/componentsSlice";

import * as colors from "@material-ui/core/colors";
import { formatDate } from "@raultom/common-helpers/lib/helpers";
import EditRoomBookingFormDialog, {
  EDIT_ROOM_BOOKING_FORM_DIALOG,
} from "../../../../app/components/bookings/EditRoomBookingFormDialog";
import * as languageService from "../../../../app/services/languageService";
import {
  toggleSnackbar,
  selectors as commonSelectors,
} from "../../../../app/slices/commonSlice";
import { getFullName } from "../../../../app/services/commonService";
import {
  createBooking,
  selectors as bookingsSelectors,
} from "../../../../app/slices/adminSlice/bookingsSlice";
import { COLOR_LIST } from "../../../../app/helpers/constants";
import { FormattedMessage, useIntl } from "react-intl";
import "moment/locale/de";
import {
  EDIT_ROOM_BLOCKING_FORM_DIALOG,
  EditRoomBlockingFormDialog,
} from "../../../../app/components/bookings/EditRoomBlockingFormDialog";
import SideMenu from "../../common/SideMenu/SideMenu";
import Nav from "../../common/Nav/Nav";

export const ADD_BOOKING_FORM_DIALOG_CALENDAR_PAGE =
  "ADD_BOOKING_FORM_DIALOG_CALENDAR_PAGE";

const useStyles = makeStyles((theme) => ({
  confirmDialog: {
    minWidth: "300px",
  },
}));

interface IDatesSetEvent {
  start: DateOrString;
  end: DateOrString;
}
interface IDateRange {
  startDate?: DateOrString;
  endDate?: DateOrString;
}

export enum CALENDAR_EVENT_TYPE {
  BOOKING = "BOOKING",
  BLOCKING = "BLOCKING",
}

export interface ICalendarEvent {
  id: string;
  resourceId: string;
  start: string;
  end: string;
  title: string;
  color: string;
  extendedProps: (IRoomBooking | IRoomBlocking) & {
    type: CALENDAR_EVENT_TYPE;
  };
}
export const roomBookingToEventMapper = (
  roomBooking: IRoomBooking,
  roomColors: IRoomColors
): ICalendarEvent => {
  return {
    id: roomBooking.id as string,
    resourceId: roomBooking.roomId as string,
    start: roomBooking.checkinDate as string,
    end: roomBooking.checkoutDate as string,
    title: getFullName(roomBooking.booking?.customer),
    color:
      (colors as any)[roomColors[roomBooking.roomId as string]] &&
      (colors as any)[roomColors[roomBooking.roomId as string]][700],
    extendedProps: { ...roomBooking, type: CALENDAR_EVENT_TYPE.BOOKING },
  };
};

export const roomBlockingToEventMapper = (
  roomBlocking: IRoomBlocking & {
    title?: string;
  }
): ICalendarEvent => ({
  id: roomBlocking.id as string,
  resourceId: roomBlocking.roomId as string,
  start: roomBlocking.startDate as string,
  end: roomBlocking.endDate as string,
  title: roomBlocking.title as string,
  color: colors.grey[700],
  extendedProps: { ...roomBlocking, type: CALENDAR_EVENT_TYPE.BLOCKING },
});

export interface IRoomColors {
  [key: string]: string;
}
export const getRoomColors = (rooms: IRoom[]): IRoomColors => {
  const roomColors: IRoomColors = {};
  for (let i = 0; i < rooms.length; i++) {
    const roomColorIndex = i < COLOR_LIST.length ? i : i - COLOR_LIST.length;
    roomColors[rooms[i].id as string] = COLOR_LIST[roomColorIndex];
  }

  return roomColors;
};

const getLocale = (language: LANGUAGE) => {
  if (language === LANGUAGE.EN_US) {
    return enLocale;
  }

  if (language === LANGUAGE.DE_DE) {
    return deLocale;
  }

  if (language === LANGUAGE.RO_RO) {
    return roLocale;
  }

  return enLocale;
};

type PropsFromRedux = ConnectedProps<typeof connector>;
export type ICalendarProps = PropsFromRedux & {};
export const _Calendar = (props: ICalendarProps) => {
  React.useEffect(() => {
    props.getRooms({
      sort: { field: "name", direction: SORT_DIRECTION.ASC },
    });
    // eslint-disable-next-line
  }, []);
  const [currentDate, setCurrentDate] = React.useState<IDateRange>({});
  const [eventForEdit, setEventForEdit] = React.useState<
    IRoomBooking | IRoomBlocking | null
  >(null);
  const [
    showConfirmDeleteBooking,
    setShowConfirmDeleteBooking,
  ] = React.useState(false);
  const [
    showConfirmDeleteBlocking,
    setShowConfirmDeleteBlocking,
  ] = React.useState(false);
  const classes = useStyles();
  const intl = useIntl();

  const roomColors = getRoomColors(props.rooms);
  const roomBookingEvents: ICalendarEvent[] = props.roomBookings.map(
    (roomBooking) => roomBookingToEventMapper(roomBooking, roomColors)
  );
  const roomBlockingEvents: ICalendarEvent[] = props.roomBlockings.map(
    (roomBlocking) =>
      roomBlockingToEventMapper({
        ...roomBlocking,
        title: intl.formatMessage({ id: "App.admin.rooms.blocked.title" }),
      })
  );
  const events = roomBookingEvents.concat(roomBlockingEvents);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          titleLocale="App.calendar.title"
          actions={[
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              key={1}
              onClick={() => {
                if (props.toggleDialogByName) {
                  props.toggleDialogByName({
                    name: ADD_BOOKING_FORM_DIALOG_CALENDAR_PAGE,
                    isOpen: true,
                  });
                }
              }}
            >
              <AddIcon />
            </Fab>,
          ]}
        >
          <FullCalendar
            editable={true}
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[
              adaptivePlugin,
              interactionPlugin,
              dayGridPlugin,
              listPlugin,
              timeGridPlugin,
              resourceTimelinePlugin,
              resourceDayGridPlugin,
            ]}
            views={{
              resourceTimelineWeek: {
                slotDuration: { days: 1 },
                slotLabelContent: (args) => {
                  const formattedWeekDay = formatDate({
                    date: args.date,
                    format: "dddd",
                    locale: languageService.getLocaleFromLanguage(
                      props.user?.language as LANGUAGE
                    ),
                  }).slice(0, 3);
                  const formattedDayNumeric = formatDate({
                    date: args.date,
                    format: "D",
                    locale: languageService.getLocaleFromLanguage(
                      props.user?.language as LANGUAGE
                    ),
                  });

                  return {
                    html: `<div>
                  <div class="resource-timeline-week-weekday-label">${formattedWeekDay}</div>
                  <div class="resource-timeline-week-weekdaynumber-label">${formattedDayNumeric}</div>
                </div>`,
                  };
                },
              },
              resourceTimelineMonth: {
                titleFormat: {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                },
                slotDuration: { days: 1 },
                slotLabelContent: (args) => {
                  const formattedWeekDay = formatDate({
                    date: args.date,
                    format: "dddd",
                    locale: languageService.getLocaleFromLanguage(
                      props.user?.language as LANGUAGE
                    ),
                  }).slice(0, 3);

                  const formattedDayNumeric = formatDate({
                    date: args.date,
                    format: "D",
                    locale: languageService.getLocaleFromLanguage(
                      props.user?.language as LANGUAGE
                    ),
                  });

                  return {
                    html: `<div>
                  <div class="resource-timeline-month-weekday-label">${formattedWeekDay}</div>
                  <div class="resource-timeline-month-weekdaynumber-label">${formattedDayNumeric}</div>
                </div>`,
                  };
                },
              },
            }}
            resourceAreaHeaderContent={<span />}
            initialView="resourceTimelineWeek"
            headerToolbar={{
              left: "today prev,next",
              center: "title",
              right: "resourceTimelineWeek,resourceTimelineMonth",
            }}
            resources={
              props.rooms.map((room) => ({
                id: room.id,
                title: room.name,
              })) as any
            }
            events={events}
            eventDrop={onEventDrop(props, currentDate)}
            eventResize={onEventResize(props, currentDate)}
            eventClick={(info) => {
              if (
                info.event.extendedProps.type === CALENDAR_EVENT_TYPE.BOOKING
              ) {
                setEventForEdit(info.event.extendedProps as IRoomBooking);
                props.toggleDialogByName({
                  name: EDIT_ROOM_BOOKING_FORM_DIALOG,
                  isOpen: true,
                });
              } else {
                setEventForEdit(info.event.extendedProps as IRoomBlocking);
                props.toggleDialogByName({
                  name: EDIT_ROOM_BLOCKING_FORM_DIALOG,
                  isOpen: true,
                });
              }
            }}
            datesSet={(event: IDatesSetEvent) => {
              const date: IDateRange = {
                startDate: event.start,
                endDate: event.end,
              };
              setCurrentDate(date);
              props.getRoomBookings({
                filter: date,
              });
              props.getRoomBlockings({
                filter: date,
              });
            }}
            resourceOrder="title"
            locale={getLocale(props.user?.language as LANGUAGE)}
          />

          <Dialog
            classes={{ paper: classes.confirmDialog }}
            open={showConfirmDeleteBooking}
            onClose={() => setShowConfirmDeleteBooking(false)}
          >
            <DialogTitle>
              <FormattedMessage id="App.calendar.deleteBooking.title" />
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setShowConfirmDeleteBooking(false)}
                color="primary"
              >
                <FormattedMessage id="App.common.disagree" />
              </Button>
              <Button
                onClick={async () => {
                  setShowConfirmDeleteBooking(false);
                  await props.deleteRoomBooking(eventForEdit as IRoomBooking);
                  await props.getRoomBookings({
                    filter: currentDate,
                  });
                  props.toggleDialogByName({
                    name: EDIT_ROOM_BOOKING_FORM_DIALOG,
                    isOpen: false,
                  });
                  props.toggleSnackbar({
                    isOpen: true,
                    messageLocale: "App.calendar.deleteBooking.success",
                    severity: "success",
                  });
                }}
                color="primary"
                autoFocus
              >
                <FormattedMessage id="App.common.agree" />
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            classes={{ paper: classes.confirmDialog }}
            open={showConfirmDeleteBlocking}
            onClose={() => setShowConfirmDeleteBlocking(false)}
          >
            <DialogTitle>
              <FormattedMessage id="App.calendar.deleteBooking.title" />
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setShowConfirmDeleteBlocking(false)}
                color="primary"
              >
                <FormattedMessage id="App.common.disagree" />
              </Button>
              <Button
                onClick={async () => {
                  setShowConfirmDeleteBlocking(false);
                  await props.deleteRoomBlocking(eventForEdit as IRoomBlocking);
                  await props.getRoomBlockings({
                    filter: currentDate,
                  });
                  props.toggleDialogByName({
                    name: EDIT_ROOM_BLOCKING_FORM_DIALOG,
                    isOpen: false,
                  });
                  props.toggleSnackbar({
                    isOpen: true,
                    messageLocale: "App.calendar.deleteBlocking.success",
                    severity: "success",
                  });
                }}
                color="primary"
                autoFocus
              >
                <FormattedMessage id="App.common.agree" />
              </Button>
            </DialogActions>
          </Dialog>

          <EditRoomBookingFormDialog
            loading={props.loading}
            initialValues={eventForEdit}
            leftButton={
              <Button
                color="secondary"
                onClick={() => setShowConfirmDeleteBooking(true)}
              >
                <FormattedMessage id="App.common.delete" />
              </Button>
            }
            onSubmit={async (roomBooking) => {
              await props.patchRoomBooking(
                roomBooking?.bookingId as string,
                roomBooking?.id as string,
                roomBookingToApiMapper({
                  roomId: roomBooking?.roomId,
                  checkinDate: roomBooking?.checkinDate,
                  checkoutDate: roomBooking?.checkoutDate,
                })
              );
              props.getRoomBookings({
                filter: currentDate,
              });
              props.getRoomBlockings({
                filter: currentDate,
              });
              props.toggleDialogByName({
                name: EDIT_ROOM_BOOKING_FORM_DIALOG,
                isOpen: false,
              });
            }}
          />

          <EditRoomBlockingFormDialog
            loading={props.loading}
            initialValues={eventForEdit}
            leftButton={
              <Button
                color="secondary"
                onClick={() => setShowConfirmDeleteBlocking(true)}
              >
                <FormattedMessage id="App.common.delete" />
              </Button>
            }
            onSubmit={async (roomBlocking) => {
              await props.patchRoomBlocking(roomBlocking?.id as string, {
                roomId: roomBlocking?.roomId,
                startDate: roomBlocking?.startDate,
                endDate: roomBlocking?.endDate,
              });
              props.getRoomBookings({
                filter: currentDate,
              });
              props.getRoomBlockings({
                filter: currentDate,
              });
              props.toggleDialogByName({
                name: EDIT_ROOM_BLOCKING_FORM_DIALOG,
                isOpen: false,
              });
            }}
          />

          <AddBookingFormDialog
            loading={props.creatingBooking}
            name={ADD_BOOKING_FORM_DIALOG_CALENDAR_PAGE}
            onSubmit={async (booking: ICreateBooking | null) => {
              await props.createBooking(
                mapBookingForApi(booking as ICreateBooking)
              );
              props.toggleDialogByName({
                name: ADD_BOOKING_FORM_DIALOG_CALENDAR_PAGE,
                isOpen: false,
              });
              props.getRoomBookings({ filter: currentDate });
              props.getRoomBlockings({ filter: currentDate });
            }}
          />
        </Page>
      </div>
    </div>
  );
};

export const onEventDrop = (
  props: ICalendarProps,
  currentDate: IDateRange
) => async (info: EventDropArg) => {
  doEventUpdate(props, currentDate)(info);
};

export const onEventResize = (
  props: ICalendarProps,
  currentDate: IDateRange
) => async (info: EventResizeDoneArg) => {
  doEventUpdate(props, currentDate)(info);
};

export const doEventUpdate = (
  props: ICalendarProps,
  currentDate: IDateRange
) => async (info: EventResizeDoneArg | EventDropArg) => {
  const startDate: string = moment(info.event.start).toISOString();
  const endDate: string = moment(info.event.end).toISOString();
  const currentEventId: string = info.oldEvent.extendedProps?.id;
  const bookingId: string = info.oldEvent.extendedProps?.bookingId;
  const roomId: string =
    (info as any).newResource?.id || info.oldEvent.extendedProps?.roomId;
  const events = props.roomBookings
    .map((roomBooking) =>
      roomBookingToEventMapper(roomBooking, getRoomColors(props.rooms))
    )
    .concat(
      props.roomBlockings.map((roomBlocking) =>
        roomBlockingToEventMapper(roomBlocking)
      )
    );

  const roomBookings: ICalendarEvent[] = calendarService.getEventsBetween(
    events,
    startDate,
    endDate
  );
  const eventsForThisRoom: ICalendarEvent[] = roomBookings.filter(
    (roomBooking) => roomBooking.resourceId === roomId
  );
  const shouldUpdateEvent =
    eventsForThisRoom.length === 0 ||
    (eventsForThisRoom.length === 1 &&
      eventsForThisRoom[0].id === currentEventId);
  if (!shouldUpdateEvent) {
    props.getRoomBookings({
      filter: currentDate,
    });
    props.getRoomBlockings({
      filter: currentDate,
    });
    return;
  }

  if (info.oldEvent.extendedProps.type === CALENDAR_EVENT_TYPE.BOOKING) {
    const partial: any = {
      checkinDate: startDate,
      checkoutDate: endDate,
    };
    if (roomId) {
      partial.roomId = roomId;
    }

    await props.patchRoomBooking(bookingId, currentEventId, partial);
  } else {
    const partial: any = {
      startDate,
      endDate,
    };
    if (roomId) {
      partial.roomId = roomId;
    }

    await props.patchRoomBlocking(currentEventId, partial);
  }

  props.getRoomBookings({
    filter: currentDate,
  });
  props.getRoomBlockings({
    filter: currentDate,
  });
};

const connector = connect(
  (state: RootState) => ({
    user: commonSelectors.selectUser(state),
    loading: calendarSelectors.selectLoading(state),
    rooms: calendarSelectors.selectRooms(state),
    roomBookings: calendarSelectors.selectRoomBookings(state),
    roomBlockings: roomsSelectors.selectRoomBlockings(state),
    creatingBooking: bookingsSelectors.selectCreatingBooking(state),
  }),
  {
    getRoomBookings,
    getRooms,
    toggleDialogByName,
    patchRoomBooking,
    createBooking,
    deleteRoomBooking,
    toggleSnackbar,
    getRoomBlockings,
    patchRoomBlocking,
    deleteRoomBlocking,
  }
);
const CalendarPage = connector(_Calendar);

export default CalendarPage;
