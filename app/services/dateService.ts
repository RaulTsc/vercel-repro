import moment, { Moment } from "moment";

export const toISOString = (
  date: Date | Moment | string | null
): string | null => {
  if (!date) {
    return null;
  }

  if ((date as any)._isAMomentObject) {
    return (date as any).toISOString();
  }

  if ((date as Date) instanceof Date) {
    return (date as Date).toISOString();
  }

  if (typeof date === "string") {
    return moment(date).toISOString();
  }

  return null;
};
