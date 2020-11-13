import { isEmpty } from "@raultom/common-helpers/lib/helpers/validation";
import BigNumber from "bignumber.js";

// Remove all non alphanumeric characters from value, except the first - or , and any . characters
export const removeInvalidCharacters = (
  value: string,
  isDouble: boolean
): string => {
  const valWithNoInvalidChars = (value || "")
    .replace(/[^0-9,.-]/g, "")
    .replace(/(?!^)-/g, "")
    .replace(/\./g, "");

  if (isDouble) {
    return valWithNoInvalidChars.replace(/,/g, ".");
  }

  return valWithNoInvalidChars.replace(/,/g, "");
};

export const formatInputString = (
  value: string,
  isDouble: boolean = true
): string | number | null => {
  if (isEmpty(value)) {
    return null;
  }

  if (value === "-") {
    return "-";
  }

  if (value === "--") {
    return "-";
  }

  if ((value || "").startsWith("--")) {
    const valueAsFloat = parseFloat(value.slice(1, value.length));

    if (!isNaN(valueAsFloat)) {
      return valueAsFloat;
    }
  }

  if (value.endsWith(",,")) {
    return value.slice(0, -1);
  }

  if (value.endsWith(",") && (value.match(/,/g) || []).length === 2) {
    return parseFloat(removeInvalidCharacters(value.slice(0, -1), isDouble));
  }

  if (value.endsWith(",")) {
    if (isDouble) {
      return value;
    }

    // tslint:disable-next-line:no-parameter-reassignment
    value = value.slice(0, -1);
  }

  if ((value.match(/,/g) || []).length === 1) {
    const only0Decimals = value
      .split(",")[1]
      .split("")
      .every((decimal) => decimal === "0");

    if (only0Decimals) {
      return value;
    }
  }

  if (!isNaN(parseFloat(removeInvalidCharacters(value, isDouble)))) {
    return parseFloat(removeInvalidCharacters(value, isDouble));
  }

  return null;
};

export const ensureValueIsNumber = (
  value: string | number,
  isDouble: boolean = true
): number | null => {
  if (isEmpty(value)) {
    return null;
  }

  if (typeof value === "number") {
    return value;
  }

  if (value === "-") {
    return null;
  }

  if (!isNaN(parseFloat(removeInvalidCharacters(value, isDouble)))) {
    return parseFloat(removeInvalidCharacters(value, isDouble));
  }

  return null;
};

export const getNumberByDecimalCount = (
  value: number,
  decimalPlaces: number
): number => {
  const bigValue = new BigNumber(value);
  const bigValueFixed = bigValue.toFixed(decimalPlaces, 1);
  return parseFloat(bigValueFixed);
};
