import moment from "moment";
import { DateOrString, IBooking, IRoomBooking } from "../interfaces";

export const getRoomBookingsBetween = (
  roomBookings: IRoomBooking[],
  checkinDate: DateOrString,
  checkoutDate: DateOrString
) => {
  return roomBookings.filter((roomBooking) => {
    if (
      moment(roomBooking.checkinDate).toDate().getTime() >=
        moment(checkinDate).toDate().getTime() &&
      moment(roomBooking.checkinDate).toDate().getTime() <=
        moment(checkoutDate).toDate().getTime()
    ) {
      return true;
    }

    if (
      moment(roomBooking.checkinDate).toDate().getTime() <=
        moment(checkinDate).toDate().getTime() &&
      moment(roomBooking.checkoutDate).toDate().getTime() >=
        moment(checkinDate).toDate().getTime() &&
      moment(roomBooking.checkoutDate).toDate().getTime() <=
        moment(checkoutDate).toDate().getTime()
    ) {
      return true;
    }

    if (
      moment(roomBooking.checkinDate).toDate().getTime() <=
        moment(checkinDate).toDate().getTime() &&
      moment(roomBooking.checkoutDate).toDate().getTime() >=
        moment(checkoutDate).toDate().getTime()
    ) {
      return true;
    }

    return false;
  });
};

export const getTotalCostFromBookings = (bookings: IBooking[]): number => {
  return bookings.reduce(
    (prevVal, currVal) => (prevVal += currVal.totalCost || 0),
    0
  );
};
