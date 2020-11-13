import { ICompany } from "./settings";

export const getAllEnumStatuses = <T = any>(value: any): T[] =>
  Object.keys(value).map((key) => value[key]);

export const getAllForEnum = <T = any>(value: any): T[] =>
  Object.keys(value)
    .filter((key) => key !== "__DEFAULT")
    .map((key) => value[key]);

export enum LANGUAGE {
  DE_DE = "de-DE",
  EN_US = "en-US",
  RO_RO = "ro-RO",
}
export const ALL_LANGUAGE = getAllForEnum<LANGUAGE>(LANGUAGE);

export type DateOrString = Date | string;

export interface ITimestamps {
  createdAt?: DateOrString;
  updatedAt?: DateOrString;
  deletedAt?: DateOrString;
}

export interface IPaging {
  skip?: number;
  take?: number;
}

export interface ISortField {
  field?: string;
  direction?: "ASC" | "DESC";
}

export interface ISortFilterPaging<T> {
  filter?: T;
  sort?: ISortField;
  paging?: IPaging;
}

export enum SORT_DIRECTION {
  ASC = "ASC",
  DESC = "DESC",
}

export interface IUser extends ITimestamps {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  language?: LANGUAGE;
  currentCompany?: ICompany;
  companies?: ICompany[];
}

export enum COUNTRY {
  RO = "RO",
  GB = "GB",
  US = "US",
  DE = "DE",
  HU = "HU",
}

export interface IAddress {
  streetName: string;
  streetNumber: string;
  zipCode: string;
  city: string;
  country: string;
}

export enum CURRENCY {
  EUR = "EUR",
  USD = "USD",
  RON = "RON",
}
export const ALL_CURRENCY = getAllEnumStatuses<CURRENCY>(CURRENCY);

export * from "./bookings";
export * from "./rooms";
export * from "./roomTypes";
export * from "./settings";
export * from "./customers";
export * from "./emailTypes";
