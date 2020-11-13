import * as React from "react";
import { useIntl } from "react-intl";
import {
  formatDate,
  DATE_FORMATS,
} from "@raultom/common-helpers/lib/helpers/formatters";
import * as languageService from "../../../services/languageService";
import { LANGUAGE } from "../../../interfaces";

export interface IFormattedDateLabelContext {
  intl: {
    locale: string;
  };
}
export interface IFormattedDateLabelProps {
  style?: React.CSSProperties;
  date?: Date | string | null;
  format?: string;
  offset?: number; // Hours
  timezone?: string;
  className?: string;
}
const FormattedDateLabel = ({
  date,
  format = DATE_FORMATS.DAY_DATE,
  style = {},
  offset = 0,
  timezone = "",
  className,
}: IFormattedDateLabelProps) => {
  const intl = useIntl();

  if (!date) {
    return null;
  }

  const { locale } = intl;

  return (
    <span
      style={{ ...style, textTransform: "capitalize" }}
      className={className}
    >
      {date &&
        formatDate({
          date,
          locale: languageService.getLocaleFromLanguage(locale as LANGUAGE),
          format,
          offset,
          tz: timezone,
        })}
    </span>
  );
};

export default FormattedDateLabel;
