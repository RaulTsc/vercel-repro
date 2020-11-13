import { IAddress } from "../interfaces";

export type GetFullName =
  | {
      firstName?: string;
      lastName?: string;
    }
  | null
  | undefined;
export const getFullName = (name: GetFullName): string => {
  const firstName = (name?.firstName || "").trim();
  const lastName = (name?.lastName || "").trim();

  return `${firstName} ${lastName}`.trim();
};

export const getNameInitials = (name: GetFullName): string => {
  const fullName = getFullName(name);
  if (!fullName) {
    return "";
  }

  const fullNameParts = fullName.split(" ");
  if (fullNameParts.length === 1) {
    return fullNameParts[0].substring(0, 2).toUpperCase();
  }

  if (fullNameParts.length >= 2) {
    return `${fullNameParts[0].substring(0, 1)}${fullNameParts[1].substring(
      0,
      1
    )}`.toUpperCase();
  }

  return "";
};

export const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getClassName = (
  classNames: Array<string | undefined | null>
): string => {
  const className: string = classNames
    .filter((className) => Boolean(className))
    .reduce((prevVal, currVal) => `${prevVal} ${currVal}`, "") as string;
  return className;
};

export const getFullAddress = (
  address: IAddress | null | undefined
): string | null => {
  if (!address) {
    return null;
  }

  return `${(address.streetName || "").trim()} ${(
    address.streetNumber || ""
  ).trim()}, ${(address.zipCode || "").trim()} ${(address.city || "").trim()}`;
};

export const copyUrlToClipboard = () => {
  const helperInput = document.createElement("input");
  const text = window.location.href;

  document.body.appendChild(helperInput);
  helperInput.value = text;
  helperInput.select();

  document.execCommand("copy");
  document.body.removeChild(helperInput);
};
