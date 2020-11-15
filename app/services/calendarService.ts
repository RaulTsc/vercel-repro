import moment from "moment";
import { DateOrString } from "../interfaces";
import { ICalendarEvent } from "../components/calendar/CalendarPage/CalendarPage";

export const getEventsBetween = (
  calendarEvents: ICalendarEvent[],
  start: DateOrString,
  end: DateOrString
) => {
  return calendarEvents.filter((calendarEvent) => {
    if (
      moment(calendarEvent.start).toDate().getTime() >=
        moment(start).toDate().getTime() &&
      moment(calendarEvent.start).toDate().getTime() <=
        moment(end).toDate().getTime()
    ) {
      return true;
    }

    if (
      moment(calendarEvent.start).toDate().getTime() <=
        moment(start).toDate().getTime() &&
      moment(calendarEvent.end).toDate().getTime() >=
        moment(start).toDate().getTime() &&
      moment(calendarEvent.end).toDate().getTime() <=
        moment(end).toDate().getTime()
    ) {
      return true;
    }

    if (
      moment(calendarEvent.start).toDate().getTime() <=
        moment(start).toDate().getTime() &&
      moment(calendarEvent.end).toDate().getTime() >=
        moment(end).toDate().getTime()
    ) {
      return true;
    }

    return false;
  });
};
