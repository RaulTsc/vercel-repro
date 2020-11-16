import * as React from "react";
import { COUNTRY } from "../../../interfaces";

export type IFlagProps = {
  country: COUNTRY;
  style?: React.CSSProperties;
};
export const Flag = (props: IFlagProps) => {
  const flagIcon = `flag-icon-${(props.country || "").toLowerCase()}`;

  return <span className={`flag-icon ${flagIcon}`} style={props.style}></span>;
};
