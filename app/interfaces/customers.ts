import { IBooking, ITimestamps } from "./";

export interface ICustomer extends ITimestamps {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  bookings?: IBooking[];
}
