import {
  ICustomer,
  IRoom,
  ITimestamps,
  DateOrString,
  getAllEnumStatuses,
} from "./";

export enum CANCELLATION_TYPE {
  NON_REFUNDABLE = "NON_REFUNDABLE",
  PARTIALLY_REFUNDABLE = "PARTIALLY_REFUNDABLE",
  FULLY_REFUNDABLE = "FULLY_REFUNDABLE",
}
// export const ALL_CANCELLATION_TYPE = getAllEnumStatuses<CANCELLATION_TYPE>(
//   CANCELLATION_TYPE
// );

export interface IRoomBooking extends ITimestamps {
  id?: string;
  companyId?: string;
  bookingId?: string;
  roomId?: string;
  checkinDate?: DateOrString;
  checkoutDate?: DateOrString;
  room?: IRoom;
  booking?: IBooking;
}

export type IBooking = ITimestamps & {
  id?: string;
  companyId?: string;
  code?: string;
  city?: string;
  checkinDate?: DateOrString;
  checkoutDate?: DateOrString;
  roomBookings?: IRoomBooking[];
  numberOfPersons?: number;
  details?: string;
  totalCost?: number;
  isConfirmed?: boolean;
  customer?: ICustomer;
};
