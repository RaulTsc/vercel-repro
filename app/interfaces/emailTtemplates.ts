import { ITimestamps, LANGUAGE } from ".";

export enum EMAIL_TYPE {
  USER_BOOKING_CREATED = "USER_BOOKING_CREATED",
  USER_BOOKING_CHANGED = "USER_BOOKING_CHANGED",
  USER_BOOKING_CANCELED = "USER_BOOKING_CANCELED",
  USER_REQUEST_REVIEW = "USER_REQUEST_REVIEW",
  USER_REQUEST_REVIEW_AFTER_2DAYS = "USER_REQUEST_REVIEW_AFTER_2DAYS",
  USER_REQUEST_REVIEW_AFTER_10DAYS = "USER_REQUEST_REVIEW_AFTER_10DAYS",
}

export interface IEmailTemplate extends ITimestamps {
  id: string;
  partnerId?: string;
  mjml: string;
  subject?: string;
  type: EMAIL_TYPE;
  language: LANGUAGE;
  isPublished?: boolean;
  isDefault?: boolean;
  parameters?: IParameter[];
  mjmlHtml?: string;
}

interface IParameter {
  param: string;
  required: boolean;
}
