import { ITimestamps, COUNTRY } from ".";
import { ICustomer } from "./customers";

export interface IReview extends ITimestamps {
  id?: string;
  companyId?: string;
  bookingId?: string;
  customerId?: string;
  country?: COUNTRY;
  color?: string;
  rating?: number;
  title?: string;
  text?: string;
  customer?: ICustomer;
}
