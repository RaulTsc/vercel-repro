import * as React from "react";
import {
  formatCurrency,
  findCurrencySymbol,
} from "@raultom/common-helpers/lib/helpers/formatters";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../../interfaces";

export interface IFormattedCurrencyLabelProps {
  currency: string;
  amount: number;
  language: LANGUAGE;
  localeId?: string;
}
export const FormattedCurrencyLabel = (props: IFormattedCurrencyLabelProps) => {
  const { currency, amount, localeId } = props;

  if (parseFloat(amount as any) === 0) {
    const currencyText = formatCurrency(props.language, 999, currency).replace(
      "999",
      "0"
    );
    return <span>{currencyText}</span>;
  }

  return (
    <span>
      {amount && formatCurrency(props.language, amount, currency)}

      {localeId && (
        <span>
          <span>{findCurrencySymbol(currency)}</span>{" "}
          <FormattedMessage id={localeId} />
        </span>
      )}

      {!amount && !localeId && "-"}
    </span>
  );
};
