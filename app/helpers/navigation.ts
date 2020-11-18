import qs from "qs";
import { applyQueryFilters } from "@raultom/common-helpers/lib/helpers/navigation";
import { EMAIL_TYPE, ISortFilterPaging, LANGUAGE } from "../interfaces";

export const bookingsList = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
) =>
  applyQueryFilters(
    "/app/admin/bookings",
    sortFilterPaging.filter,
    sortFilterPaging.sort,
    sortFilterPaging.paging
  );
export const bookingDetails = (bookingId: string) =>
  `/app/admin/bookings/${bookingId}`;

export const roomsList = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
) =>
  applyQueryFilters(
    "/app/admin/rooms",
    sortFilterPaging.filter,
    sortFilterPaging.sort,
    sortFilterPaging.paging
  );
export const roomDetails = (roomId: string) => `/app/admin/rooms/${roomId}`;

export const roomTypesList = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
) =>
  applyQueryFilters(
    "/app/admin/room-types",
    sortFilterPaging.filter,
    sortFilterPaging.sort,
    sortFilterPaging.paging
  );
export const roomTypeDetails = (roomTypeId: string) =>
  `/app/admin/room-types/${roomTypeId}`;

export const customersList = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
) =>
  applyQueryFilters(
    "/app/admin/customers",
    sortFilterPaging.filter,
    sortFilterPaging.sort,
    sortFilterPaging.paging
  );
export const customerDetails = (customerId: string) =>
  `/app/admin/customers/${customerId}`;

export const reviewsList = () => "/app/admin/reviews";
export const reviewDetails = (reviewId: string) =>
  `/app/admin/reviews/${reviewId}`;

export const emailTemplatesList = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
) =>
  applyQueryFilters(
    "/app/admin/email-templates",
    sortFilterPaging.filter,
    sortFilterPaging.sort,
    sortFilterPaging.paging
  );
export type IEmailTemplateDetailsParam = {
  type: EMAIL_TYPE;
  language: LANGUAGE;
};
export const emailTemplateDetails = ({
  type,
  language,
}: IEmailTemplateDetailsParam) =>
  `/app/admin/email-templates/${type}?language=${language}`;

export const finalizeBookingPage = ({
  checkinDate,
  checkoutDate,
  success = false,
}: {
  checkinDate?: string;
  checkoutDate?: string;
  success?: boolean;
}) =>
  `/public/book/finalize?${qs.stringify({
    checkinDate,
    checkoutDate,
    success,
  })}`;

export const publicBookingPage = () => `/public/book`;

export const dashboard = () => "/app/admin/dashboard";

export const signup = () => "/signup";

export const resetPassword = () => "/reset-password";

export const withLanguage = (language: LANGUAGE, url: string) => {
  if (language === LANGUAGE.RO_RO) {
    return `/ro${url}`;
  }

  return url;
};

export const productUrl = (language: LANGUAGE) => {
  return withLanguage(language, "/product");
};

export const pricingUrl = (language: LANGUAGE) => {
  return withLanguage(language, "/pricing");
};

export const companyUrl = (language: LANGUAGE) => {
  return withLanguage(language, "/company");
};

export const websiteHomeUrl = (language: LANGUAGE) => {
  return withLanguage(language, "/");
};

export const getStartedUrl = (language: LANGUAGE) => {
  return withLanguage(language, "/get-started");
};

export const legalUrl = (language: LANGUAGE) => {
  return withLanguage(language, "/legal");
};

export const privacyUrl = (language: LANGUAGE) => {
  return withLanguage(language, "/privacy");
};

export const securityUrl = (language: LANGUAGE) => {
  return withLanguage(language, "/security");
};

export const loginUrl = (language: LANGUAGE) => {
  return withLanguage(language, "/login");
};
