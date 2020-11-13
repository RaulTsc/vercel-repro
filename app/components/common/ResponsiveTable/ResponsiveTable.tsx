import * as React from "react";
import List, { ListProps } from "@material-ui/core/List";
import Table, { TableProps } from "@material-ui/core/Table";
import TableBody, { TableBodyProps } from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  responsiveTable__desktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  responsiveTable__mobile: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export type ResponsiveTablePropsCssKeys =
  | "responsiveTable__desktop"
  | "responsiveTable__mobile";
export type IResponsiveTableProps<T> = TableProps & {
  listItems: T[];
  tableHeaderCells?: React.ReactNode[];
  backgroundColor?: string;
  mobileRowDevider?: boolean;
  style?: React.CSSProperties;
  renderDesktopRow: (item?: any, index?: number, list?: any[]) => any;
  renderMobileRow: (item?: any, index?: number, list?: any[]) => any;
  classes?: Partial<Record<ResponsiveTablePropsCssKeys, string>>;
  TableProps?: TableProps;
  TableBodyProps?: TableBodyProps;
  MobileListProps?: ListProps;
};

export default function ResponsiveTable<T>(props: IResponsiveTableProps<T>) {
  const classes = useStyles();
  const {
    listItems = [],
    renderDesktopRow,
    renderMobileRow,
    style,
    tableHeaderCells = [],
    backgroundColor = "white",
    TableProps,
    TableBodyProps,
    MobileListProps,
  } = props as IResponsiveTableProps<T>;

  return (
    <div style={style}>
      <div className={classes.responsiveTable__desktop}>
        <TableContainer>
          <Table style={{ backgroundColor }} {...TableProps}>
            <TableHead>
              <TableRow>{tableHeaderCells}</TableRow>
            </TableHead>
            <TableBody {...TableBodyProps}>
              {listItems.map((listItem: T, index: number) =>
                renderDesktopRow(listItem, index, listItems)
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className={classes.responsiveTable__mobile}>
        <List disablePadding style={{ backgroundColor }} {...MobileListProps}>
          {listItems.map((listItem: T, index: number) =>
            renderMobileRow(listItem, index, listItems)
          )}
        </List>
      </div>
    </div>
  );
}
