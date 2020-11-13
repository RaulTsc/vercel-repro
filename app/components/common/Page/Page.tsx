import React from "react";
import { FormattedMessage } from "react-intl";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AddBookingFormDialog, {
  ICreateBooking,
} from "../AddBookingFormDialog/AddBookingFormDialog";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 1000,
      width: "100%",
      padding: "20px",
      [theme.breakpoints.up("sm")]: {
        padding: "104px 40px 40px 40px",
      },
      margin: "0px auto",
      paddingTop: "104px",
    },
    titleBreadcrumbsContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    backLink: {
      cursor: "pointer",
      color: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",

      "&:hover": {
        textDecoration: "underline",
      },
    },
    titleBreadcrumbs: (props: PageProps) => ({
      [theme.breakpoints.down("xs")]: {
        display: props.hideTitleOnXs ? "none" : "block",
      },
    }),
    hr: {
      border: "none",
      borderBottom: "1px solid rgba(0,0,0,0.12)",
      margin: "12px 0px 20px 0px",
    },
    actions: {
      display: "flex",
    },
  })
);

export interface PageProps {
  hideTitleOnXs?: boolean;
  title?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  titleLocale?: string;
  backTitleLocale?: string;
  actions?: Array<React.ReactNode>;
  children?: React.ReactNode;
}
function Page(props: PageProps) {
  const classes = useStyles(props);
  const router = useRouter();

  return (
    <div className={classes.root}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={classes.titleBreadcrumbsContainer}>
          <div className={classes.titleBreadcrumbs}>
            {props.backTitleLocale && (
              <div className={classes.backLink} onClick={() => router.back()}>
                <KeyboardBackspaceIcon style={{ marginRight: 8 }} />
                <FormattedMessage id={props.backTitleLocale} />
              </div>
            )}
            {props.breadcrumbs}
            <div>
              {!props.title && props.titleLocale && (
                <Typography variant="h6">
                  {<FormattedMessage id={props.titleLocale} />}
                </Typography>
              )}
              {props.title}
            </div>
          </div>
        </div>

        <div className={classes.actions}>{props.actions}</div>
      </div>

      <hr className={classes.hr} />

      {props.children}

      <AddBookingFormDialog
        loading={false}
        onSubmit={async (booking: ICreateBooking | null) => {
          console.log("booking", booking);
          // await props.createBooking(
          //   mapBookingForApi(booking as ICreateBooking)
          // );
          // props.toggleDialogByName({
          //   name: ADD_BOOKING_FORM_DIALOG,
          //   isOpen: false,
          // });
          // await props.getBookings();
        }}
      />
    </div>
  );
}

export default Page;
