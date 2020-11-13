import {
  IAddress,
  ITimestamps,
  getAllEnumStatuses,
  DateOrString,
  CURRENCY,
} from "./";
import { IFile } from "@raultom/react-file-upload/lib/interfaces";
import { CANCELLATION_TYPE } from "./bookings";

export enum COMPANY_AMENITY_CATEGORY {
  BATHROOM = "BATHROOM",
  BEDROOM = "BEDROOM",
  OUTSIDE = "OUTSIDE",
  PETS = "PETS",
  ACTIVITIES = "ACTIVITIES",
  LIVING_AREA = "LIVING_AREA",
  FOOD_AND_DRINKS = "FOOD_AND_DRINKS",
  INTERNET = "INTERNET",
  PARKING = "PARKING",
  FAMILY_ENTERTAINMENT = "FAMILY_ENTERTAINMENT",
  CLEANING = "CLEANING",
  BUSINESS = "BUSINESS",
  SAFETY = "SAFETY",
  GENERAL = "GENERAL",
  ACCESSIBILITY = "ACCESSIBILITY",
  LANGUAGES = "LANGUAGES",
}
// export const ALL_COMPANY_AMENITY_CATEGORY = getAllEnumStatuses<
//   COMPANY_AMENITY_CATEGORY
// >(COMPANY_AMENITY_CATEGORY);

export type ICompanyAmenity = {
  locale?: string | null;
  category: COMPANY_AMENITY_CATEGORY;
  text?: string | null;
  hasExtraCost?: boolean;
  isSelected?: boolean;
};

export interface ICompanyLocationDescription {
  title: string;
  description: string;
}

export interface ICompanyPublicHighlights {
  highlights?: Array<{
    text?: string;
    numberOfComments?: number;
  }>;
  breakfastInfo?: string;
  loyalCustomers?: string;
}

export interface ICompany extends ITimestamps {
  id?: string;
  isDefault?: boolean;
  name: string;
  stars?: number;
  address: IAddress;
  locationDescription?: ICompanyLocationDescription;
  publicHighlights?: ICompanyPublicHighlights;
  amenities?: ICompanyAmenity[];
  nearbyPlaces?: Array<{
    name: string;
    distance: number;
  }>;
  bookings?: {
    checkin?: {
      startTime: DateOrString;
      endTime: DateOrString;
    };
    checkout?: {
      startTime: DateOrString;
      endTime: DateOrString;
    };
  };
  images?: IFile[];
  logo?: IFile;
  google?: {
    name: string;
    mapsId: string;
  };
  currency?: CURRENCY;
  public: {
    importantInformation: {
      cancellations: {
        type: CANCELLATION_TYPE;
        description: string;
      };
      quietHours: {
        startTime: DateOrString;
        endTime: DateOrString;
      };
      vouchers: string;
    };
  };
}

export interface IPartner extends ITimestamps {
  id?: string;
  subdomain?: string;
  themeData?: {
    logo?: IFile | null;
  };
}
