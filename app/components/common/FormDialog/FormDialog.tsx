import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, FormProps } from "react-final-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { toggleDialogByName } from "../../../slices/componentsSlice";
import { FormattedMessage } from "react-intl";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import arrayMutators from "final-form-arrays";

const useStyles = makeStyles((theme) => ({
  confirmWrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

type PropsFromRedux = Partial<ConnectedProps<typeof connector>>;
export type FormDialogProps<T> = FormProps<T> & {
  name: string;
  loading?: boolean;
  showActionButtons?: boolean;
  showTitle?: boolean;
  style?: React.CSSProperties;
  title: React.ReactNode;
  children?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  leftButton?: React.ReactNode;
};
type FormDialogPropsInternal<T> = FormDialogProps<T>;
function FormDialogInternal<T>(
  props: FormDialogPropsInternal<T> & PropsFromRedux
) {
  const dialogState = useSelector(
    (state: RootState) => state.components[props.name]
  );
  const classes = useStyles();
  const { name, children, ...restProps } = props;
  let submit: any;

  const showActionButtons = props.showActionButtons ?? true;
  const showTitle = props.showTitle || true;

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={() => {
          if (props.toggleDialogByName) {
            props.toggleDialogByName({ name: props.name, isOpen: false });
          }
        }}
        open={Boolean(dialogState?.isOpen)}
        aria-labelledby="form-dialog-title"
      >
        {showTitle && (
          <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        )}
        <DialogContent>
          <Form
            {...restProps}
            mutators={{ ...arrayMutators }}
            destroyOnUnregister={restProps.destroyOnUnregister || true}
            render={({ handleSubmit, values }: any) => {
              submit = handleSubmit;
              return <form>{props.children}</form>;
            }}
          />
        </DialogContent>
        {showActionButtons && (
          <DialogActions
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>{props.leftButton}</div>
            <div style={{ display: "flex" }}>
              <Button
                color="primary"
                disabled={props.loading}
                onClick={() => {
                  if (props.toggleDialogByName) {
                    props.toggleDialogByName({
                      name: props.name,
                      isOpen: false,
                    });
                  }
                }}
              >
                <FormattedMessage id="App.common.cancel" />
              </Button>
              <div className={classes.confirmWrapper}>
                <Button
                  color="primary"
                  disabled={props.loading}
                  onClick={(event) => submit(event)}
                >
                  <span
                    style={{ visibility: props.loading ? "hidden" : "initial" }}
                  >
                    {props.confirmLabel || (
                      <FormattedMessage id="App.common.add" />
                    )}
                  </span>
                </Button>
                {props.loading && (
                  <CircularProgress
                    size={20}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

const connector = connect(null, { toggleDialogByName });
const ConnectedFormDialogInternal: any = connector(FormDialogInternal);
function FormDialog<T>(props: FormDialogPropsInternal<T> & PropsFromRedux) {
  return <ConnectedFormDialogInternal {...props} />;
}

export default FormDialog;
