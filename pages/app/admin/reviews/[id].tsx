import React from "react";
import Page from "../../../../app/components/common/Page/Page";
import { CustomerDetailsHeader } from "../../../../app/components/customers/CustomerDetailsHeader";
import { RootState } from "../../../../app/store";
import { ConnectedProps, connect } from "react-redux";
import { IReview, ICustomer } from "../../../../app/interfaces";
import Paper from "@material-ui/core/Paper";
import {
  selectors as reviewsSelectors,
  getReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../../../../app/slices/adminSlice/reviewsSlice";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Rating } from "../../../../app/components/reviews/Rating";
import { toggleSnackbar } from "../../../../app/slices/commonSlice";
import { makeStyles } from "@material-ui/core";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";
import Nav from "../../../../app/components/common/Nav/Nav";

const useStyles = makeStyles((theme) => ({
  confirmDeleteReview: {
    minWidth: "300px",
  },
}));

type PropsFromRedux = ConnectedProps<typeof connector>;
export type IReviewDetailsPageProps = PropsFromRedux & {};
export const _ReviewDetailsPage = (props: IReviewDetailsPageProps) => {
  const router = useRouter();
  const reviewId: string = router.query.id as string;

  const getReview = async () => {
    const review: IReview | null = await props.getReview(reviewId);
    if (review) {
      setReviewText(review.text);
    }
  };

  React.useEffect(() => {
    getReview();
    // eslint-disable-next-line
  }, []);
  const [reviewText, setReviewText] = React.useState(props.review?.text);
  const [deleteReviewOpen, setDeleteReviewOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          backTitleLocale="App.reviews.details.backTitle"
          titleLocale="App.reviews.details.title"
        >
          {props.review && (
            <>
              <Paper elevation={0} style={{ padding: "20px" }}>
                <CustomerDetailsHeader
                  customer={props.review?.customer as ICustomer}
                />
              </Paper>

              <Paper
                elevation={0}
                style={{ padding: "20px", marginTop: "20px" }}
              >
                <Rating
                  readOnly
                  defaultValue={props.review?.rating as number}
                />
                <TextField
                  fullWidth
                  multiline
                  value={reviewText}
                  disabled={props.loading}
                  rows={4}
                  rowsMax={10}
                  margin="dense"
                  name="text"
                  label={<FormattedMessage id="App.admin.reviews.reviewText" />}
                  onChange={(event) => setReviewText(event.target.value)}
                />
              </Paper>

              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => setDeleteReviewOpen(true)}
                >
                  <FormattedMessage id="App.common.delete" />
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  style={{ marginLeft: "10px" }}
                  onClick={async () => {
                    props.updateReview({ ...props.review, text: reviewText });
                    props.toggleSnackbar({
                      isOpen: true,
                      messageLocale:
                        "App.admin.reviews.reviewDetails.update.success",
                      severity: "success",
                    });
                  }}
                >
                  <FormattedMessage id="App.common.update" />
                </Button>
              </div>
            </>
          )}

          <Dialog
            classes={{ paper: classes.confirmDeleteReview }}
            open={deleteReviewOpen}
            onClose={() => setDeleteReviewOpen(false)}
          >
            <DialogTitle>
              <FormattedMessage id="App.admin.reviews.reviewDetails.deleteReview.dialogTitle" />
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setDeleteReviewOpen(false)}
                color="primary"
              >
                <FormattedMessage id="App.common.disagree" />
              </Button>
              <Button
                onClick={async () => {
                  setDeleteReviewOpen(false);
                  if (props.deleteReview) {
                    await props.deleteReview(props.review as IReview);
                    await props.getReviews();
                    history.back();
                    props.toggleSnackbar({
                      isOpen: true,
                      messageLocale:
                        "App.admin.reviews.reviewDetails.deleteReview.success",
                      severity: "success",
                    });
                  }
                }}
                color="primary"
                autoFocus
              >
                <FormattedMessage id="App.common.agree" />
              </Button>
            </DialogActions>
          </Dialog>
        </Page>
      </div>
    </div>
  );
};

const connector = connect(
  (state: RootState) => ({
    loading: reviewsSelectors.selectLoading(state),
    review: reviewsSelectors.selectReview(state),
  }),
  { getReview, getReviews, toggleSnackbar, deleteReview, updateReview }
);
const ReviewDetailsPage = connector(_ReviewDetailsPage);

export default ReviewDetailsPage;
