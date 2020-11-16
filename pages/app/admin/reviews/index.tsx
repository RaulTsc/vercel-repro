import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Page from "../../../../app/components/common/Page/Page";
import { FormattedMessage } from "react-intl";
import { RootState } from "../../../../app/store";
import ResponsiveTable from "../../../../app/components/common/ResponsiveTable/ResponsiveTable";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { getFullName } from "../../../../app/services/commonService";
import { IReview } from "../../../../app/interfaces";
import { reviewDetails } from "../../../../app/helpers/navigation";

import {
  selectors as reviewsSelectors,
  getReviews,
} from "../../../../app/slices/adminSlice/reviewsSlice";

const useStyles = makeStyles((theme) => ({
  table: {},
  tableRow: {
    cursor: "pointer",
  },
}));

type PropsFromRedux = ConnectedProps<typeof connector>;
export type IAdminReviewPageProps = PropsFromRedux & {};
export const _AdminReviewPage = (props: IAdminReviewPageProps) => {
  const router = useRouter();
  const classes = useStyles();
  React.useEffect(() => {
    props.getReviews();
    // eslint-disable-next-line
  }, []);

  return (
    <Page titleLocale="App.reviews.reviewsTitle">
      {props.reviews.length > 0 && (
        <Paper elevation={0}>
          <ResponsiveTable
            listItems={props.reviews}
            tableHeaderCells={[
              <TableCell key={0}>
                <FormattedMessage id="App.common.name" />
              </TableCell>,
              <TableCell key={1}>
                <FormattedMessage id="App.reviews.common.rating" />
              </TableCell>,
              <TableCell key={2}>
                <FormattedMessage id="App.reviews.common.comment" />
              </TableCell>,
            ]}
            renderDesktopRow={(row: IReview) => (
              <TableRow
                hover
                key={row.id}
                className={classes.tableRow}
                onClick={() => router.push(reviewDetails(row.id as string))}
              >
                <TableCell component="th" scope="row">
                  {getFullName(row.customer)}
                </TableCell>
                <TableCell>{row.rating}</TableCell>
                <TableCell>{row.text}</TableCell>
              </TableRow>
            )}
            renderMobileRow={(row: IReview) => (
              <ListItem
                button
                key={row.id}
                alignItems="flex-start"
                onClick={() => router.push(reviewDetails(row.id as string))}
              >
                <ListItemText
                  primary={getFullName(row.customer)}
                  secondary={row.text}
                />
              </ListItem>
            )}
          />
        </Paper>
      )}
    </Page>
  );
};

const connector = connect(
  (state: RootState) => ({
    loading: reviewsSelectors.selectLoading(state),
    reviews: reviewsSelectors.selectReviews(state),
  }),
  { getReviews }
);
export const AdminReviewPage = connector(_AdminReviewPage);

export default AdminReviewPage;
