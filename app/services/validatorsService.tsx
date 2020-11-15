import * as React from "react";
import moment from "moment";
import * as undefsafe from "undefsafe";
import * as validator from "validator";
import * as IBAN from "iban";
import { FormattedMessage } from "react-intl";

export const join = (rules: any) => (value: any, data: any) =>
  rules
    .map((rule: any) => rule(value, data))
    .filter((error: any) => !!error)[0];
export const isEmpty = (value: any): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return value === undefined || value === null || value === "";
};
export const isInteger = (value: any): boolean =>
  Number.isInteger(Number(value));
export const isBlob = (data: any): boolean =>
  !!data && typeof Blob !== "undefined" && data instanceof Blob;
export const isDecimal = (value: any): boolean =>
  !Number.isNaN(Number(value)) && !Number.isNaN(parseFloat(value));
export const exists = (object: any, key: string): boolean =>
  !isEmpty(object && object[key]);
export const isValidEmail = (str: string): boolean =>
  (validator as any).isEmail(str);
export const isValidDate = (date: Date): boolean =>
  date instanceof Date && !isNaN(date.valueOf());

export const isValidUuid = (uuid: string) => {
  const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
  return UUID_REGEX.test(uuid);
};

export const isValidUrl = (value: string) => {
  const UUID_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
  return UUID_REGEX.test(value);
};

export const isValidPassword_8char_smallUpper_specialChar = (value: string) => {
  const UUID_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*,.;:{}[\]+=()~`])(?=.{8,})/;
  return UUID_REGEX.test(value);
};

export const applyValidatorIf = (condition: any) => (rule: any) => (
  value: any,
  allValues: any
) => condition(value, allValues) && rule(value, allValues);

export function email(value: any) {
  if (!isEmpty(value) && !isValidEmail(value)) {
    return <FormattedMessage id="validation.email.invalid" />;
  }
  return undefined;
}

// export const required = (value: any) => (value ? undefined : "Required");
export function required(value: any) {
  if (isEmpty(value)) {
    return <FormattedMessage id="validation.required" />;
  }
  return undefined;
}

export function requiredTrue(value: any) {
  if (value !== true) {
    return <FormattedMessage id="validation.required.true" />;
  }
  return undefined;
}

export function validUrl(value: any) {
  if (!isEmpty(value) && !isValidUrl(value)) {
    return <FormattedMessage id="validation.required.url" />;
  }
  return undefined;
}

export function minLength(min: any) {
  return (value: any) => {
    if (!isEmpty(value) && value.length < min) {
      const values = {
        min: min ? min.toString() : "0",
      };
      return (
        <FormattedMessage id="validation.string.min.length" values={values} />
      );
    }
    return undefined;
  };
}

export function maxLength(max: any) {
  return (value: any) => {
    if (!isEmpty(value) && value.length > max) {
      const values = {
        max: max ? max.toString() : "0",
      };
      return (
        <FormattedMessage id="validation.string.max.length" values={values} />
      );
    }
    return undefined;
  };
}

export function integer(value: any) {
  const nmbr = Number(value);
  if (isEmpty(value) || isInteger(nmbr)) {
    return undefined;
  }
  return <FormattedMessage id="validation.required.integer" />;
}

const MIN_YEAR = 1000;
const MAX_YEAR = 2200;
export const year = (minYear = MIN_YEAR, maxYear = MAX_YEAR) => (
  value: number
) => {
  if (isEmpty(value) || (value > minYear && value < maxYear)) {
    return undefined;
  }

  return (
    <FormattedMessage
      id="validation.required.year"
      values={{
        min: MIN_YEAR,
        max: MAX_YEAR,
      }}
    />
  );
};

export function genericPhoneNumber(value: any) {
  const genericPhoneNumberRegex = /^\+?(?:\d{5,15})$/g;

  if (isEmpty(value) || !!value.match(genericPhoneNumberRegex)) {
    return undefined;
  }

  return (
    <FormattedMessage id="validation.string.phoneNumber.generic.invalid" />
  );
}

export function integerGreaterThan(min: any) {
  return (value: any) => {
    const nmbr = Number(value);
    if (isEmpty(value) || (isInteger(nmbr) && nmbr > min)) {
      return undefined;
    }
    const values = {
      min: min ? min.toString() : "0",
    };
    return (
      <FormattedMessage
        id="validation.required.integer.greater.than"
        values={values}
      />
    );
  };
}

export function decimal(value: any) {
  const nmbr = Number(value);
  if (isEmpty(value) || isDecimal(nmbr)) {
    return undefined;
  }
  return <FormattedMessage id="validation.required.decimal" />;
}

export const zipCode = () => (value: any) => {
  if (value && !/^([0-9]{4,5})$/i.test(value)) {
    return <FormattedMessage id="validation.zipCode.length" />;
  }
  return null;
};

export function decimalGreaterThan(min: any) {
  return (value: any) => {
    const nmbr = Number(value);
    if (isEmpty(value) || (isDecimal(nmbr) && nmbr > min)) {
      return undefined;
    }

    const values = {
      min: min ? min.toString() : "0",
    };
    return (
      <FormattedMessage
        id="validation.required.decimal.greater.than"
        values={values}
      />
    );
  };
}

export function doubleGreaterOrEqualThan(min: any) {
  return (value: any) => {
    const nmbr = Number(value);
    if (isEmpty(value) || nmbr >= min) {
      return undefined;
    }

    const values = {
      min: min ? min.toString() : "0",
    };
    return (
      <FormattedMessage
        id="validation.required.number.greater.than"
        values={values}
      />
    );
  };
}

export function doubleSmallerOrEqualThan(max: any) {
  return (value: any) => {
    const nmbr = Number(value);
    if (isEmpty(value) || nmbr <= max) {
      return undefined;
    }

    const values = {
      max: max ? max.toString() : "0",
    };
    return (
      <FormattedMessage
        id="validation.required.number.smaller.than"
        values={values}
      />
    );
  };
}

export function inRange(min: any, max: any) {
  return (value: any) => {
    if (
      !doubleSmallerOrEqualThan(max)(value) &&
      !doubleGreaterOrEqualThan(min)(value)
    ) {
      return undefined;
    }

    const values = {
      min: min ? min.toString() : "0",
      max: max ? max.toString() : "0",
    };
    return (
      <FormattedMessage
        id="validation.required.number.inRange"
        values={values}
      />
    );
  };
}

export function oneOf(enumeration: any) {
  return (value: any) => {
    // tslint:disable-next-line no-bitwise
    if (!~enumeration.indexOf(value)) {
      const values = enumeration.join(", ");
      return <FormattedMessage id="validation.none.of" values={values} />;
    }
    return undefined;
  };
}

export function match(field: any) {
  return (value: any, data: any) => {
    if (data) {
      if (value !== data[field]) {
        return <FormattedMessage id="validation.match.value" />;
      }
    }
    return undefined;
  };
}

export function isValidEverRealPassword(value: any) {
  if (!isEmpty(value) && !isValidPassword_8char_smallUpper_specialChar(value)) {
    return (
      <FormattedMessage id="validation.password.8char_small_upper_specialChar" />
    );
  }
  return undefined;
}

export function repeatPasswordValidation(passwordFieldName: string) {
  return (value: any, formData: any) => {
    const passwordValue = formData[passwordFieldName];
    if (passwordValue && value !== passwordValue) {
      return <FormattedMessage id="validation.repeat.password" />;
    }
    return undefined;
  };
}

const getValuesForComparison = (value1: any, value2: any) => {
  let value1Formatted = value1;
  let value2Formatted = value2;

  if (value1 && value1._isAMomentObject) {
    value1Formatted = value1.toDate().getTime();
  }
  if (value1 instanceof Date) {
    value1Formatted = value1.getTime();
  }
  if (typeof value1 === "string" && moment(value1)) {
    value1Formatted = moment(value1).toDate().getTime();
  }
  if (value2 && value2._isAMomentObject) {
    value2Formatted = value2.toDate().getTime();
  }
  if (value2 instanceof Date) {
    value2Formatted = value2.getTime();
  }
  if (typeof value2 === "string" && moment(value2)) {
    value2Formatted = moment(value2).toDate().getTime();
  }

  return {
    value1: value1Formatted,
    value2: value2Formatted,
  };
};

export function smallerThan(fieldName: string, customLocale?: string) {
  return (value: any, formData: any) => {
    const actualUndefsafe =
      typeof undefsafe.default === "function" ? undefsafe.default : undefsafe;
    const actualFieldName = fieldName.split("[").join(".").split("]").join(".");
    const { value1: fieldValue, value2: actualValue } = getValuesForComparison(
      actualUndefsafe(formData, actualFieldName),
      value
    );
    if (actualValue && fieldValue && actualValue >= fieldValue) {
      return (
        <FormattedMessage
          id={customLocale || "validation.smallerThan"}
          values={{ value: fieldValue }}
        />
      );
    }
    return undefined;
  };
}

export function biggerThan(fieldName: string, customLocale?: string) {
  return (value: any, formData: any) => {
    const actualUndefsafe =
      typeof undefsafe.default === "function" ? undefsafe.default : undefsafe;
    const actualFieldName = fieldName.split("[").join(".").split("]").join(".");
    const { value1: fieldValue, value2: actualValue } = getValuesForComparison(
      actualUndefsafe(formData, actualFieldName),
      value
    );
    if (actualValue && fieldValue && actualValue <= fieldValue) {
      return (
        <FormattedMessage
          id={customLocale || "validation.biggerThan"}
          values={{ value: fieldValue }}
        />
      );
    }
    return undefined;
  };
}

export function iban() {
  return (value: string) => {
    if (!IBAN.isValid(value)) {
      return <FormattedMessage id="validation.iban.invalid" />;
    }

    return undefined;
  };
}

export function dateBetweenDays(minDay: any, maxDay: any) {
  return (value: any) => {
    const currentDate = new Date(value);

    const minDate = new Date();
    minDate.setMilliseconds(0);
    minDate.setSeconds(0);
    minDate.setMinutes(0);
    minDate.setHours(0);
    minDate.setDate(minDate.getDate() + minDay);

    const maxDate = new Date();
    maxDate.setMilliseconds(0);
    maxDate.setSeconds(0);
    maxDate.setMinutes(0);
    maxDate.setHours(0);
    maxDate.setDate(maxDate.getDate() + maxDay + 1);

    if (!(currentDate >= minDate && currentDate <= maxDate)) {
      return (
        <FormattedMessage
          id="validation.date.between.days"
          values={{ minDay, maxDay }}
        />
      );
    }
    return undefined;
  };
}

export function ageGreaterThan(years: any) {
  return (value: any) => {
    const inputDate = new Date(value);
    const maxAcceptedDate = new Date();
    maxAcceptedDate.setFullYear(maxAcceptedDate.getFullYear() - years);

    if (inputDate > maxAcceptedDate) {
      return (
        <FormattedMessage
          id="validation.age.greater.than.years"
          values={{ years }}
        />
      );
    }
    return undefined;
  };
}

export const composeValidators = (...validators: any) => (
  value: any,
  allValues: any
) =>
  validators.reduce(
    (error: any, validator: any) => error || validator(value, allValues),
    undefined
  );
