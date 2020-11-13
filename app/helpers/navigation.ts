import qs from "qs";
import { applyQueryFilters } from "@raultom/common-helpers/lib/helpers/navigation";
import { EMAIL_TYPE, ISortFilterPaging, LANGUAGE } from "../interfaces";

export const bookingsList = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
) =>
  applyQueryFilters(
    "/admin/bookings",
    sortFilterPaging.filter,
    sortFilterPaging.sort,
    sortFilterPaging.paging
  );
export const bookingDetails = (bookingId: string) =>
  `/admin/bookings/${bookingId}`;

export const roomsList = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
) =>
  applyQueryFilters(
    "/admin/rooms",
    sortFilterPaging.filter,
    sortFilterPaging.sort,
    sortFilterPaging.paging
  );
export const roomDetails = (roomId: string) => `/admin/rooms/${roomId}`;

export const roomTypesList = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
) =>
  applyQueryFilters(
    "/admin/room-types",
    sortFilterPaging.filter,
    sortFilterPaging.sort,
    sortFilterPaging.paging
  );
export const roomTypeDetails = (roomTypeId: string) =>
  `/admin/room-types/${roomTypeId}`;

export const customersList = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
) =>
  applyQueryFilters(
    "/admin/customers",
    sortFilterPaging.filter,
    sortFilterPaging.sort,
    sortFilterPaging.paging
  );
export const customerDetails = (customerId: string) =>
  `/admin/customers/${customerId}`;

export const reviewsList = () => "/admin/reviews";
export const reviewDetails = (reviewId: string) => `/admin/reviews/${reviewId}`;

export const emailTemplatesList = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
) =>
  applyQueryFilters(
    "/admin/email-templates",
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
  `/admin/email-templates/${type}?language=${language}`;

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

export const login = () => "/login";

export const resetPassword = () => "/reset-password";
