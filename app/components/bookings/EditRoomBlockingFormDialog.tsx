import React from "react";
import { connect, ConnectedProps } from "react-redux";
import FormDialog, { FormDialogProps } from "../common/FormDialog/FormDialog";
import Grid from "@material-ui/core/Grid";
import FormDatePicker from "../common/formFields/FormDatePicker";
import { FormattedMessage } from "react-intl";
import { RootState } from "../../store";

import { biggerThan, smallerThan } from "../../services/validatorsService";
import { IRoomBlocking } from "../../interfaces";

export const EDIT_ROOM_BLOCKING_FORM_DIALOG = "EDIT_ROOM_BLOCKING_FORM_DIALOG";

interface IEditRoomBlockingFormDialogInternalProps
  extends EditRoomBlockingFormDialogProps {}
const EditRoomBlockingFormDialogInternal = (
  props: IEditRoomBlockingFormDialogInternalProps
) => {
  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <FormDatePicker
          fullWidth
          required
          minDate={new Date()}
          disabled={props.loading}
          name="startDate"
          variant="inline"
          label={<FormattedMessage id="App.admin.rooms.blockRooms.startDate" />}
          validate={[
            smallerThan(
              "endDate",
              "App.admin.rooms.blockRooms.startDate.smallerThanEndDate"
            ),
          ]}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormDatePicker
          fullWidth
          required
          minDate={new Date()}
          disabled={props.loading}
          name="endDate"
          variant="inline"
          label={<FormattedMessage id="App.admin.rooms.blockRooms.endDate" />}
          validate={[
            biggerThan(
              "startDate",
              "App.admin.rooms.blockRooms.endDate.biggerThanEndDate"
            ),
          ]}
        />
      </Grid>
    </Grid>
  );
};

type PropsFromRedux = ConnectedProps<typeof connector>;
export type EditRoomBlockingFormDialogProps = PropsFromRedux &
  Omit<
    FormDialogProps<IRoomBlocking | null>,
    "name" | "title" | "confirmLabel"
  > & {
    loading: boolean;
    onSubmit: any;
  };
function _EditRoomBlockingFormDialog(props: EditRoomBlockingFormDialogProps) {
  return (
    <FormDialog<IRoomBlocking | null>
      name={EDIT_ROOM_BLOCKING_FORM_DIALOG}
      title={
        <FormattedMessage id="App.calendar.roomBlockings.editRoomBlocking" />
      }
      confirmLabel={<FormattedMessage id="App.common.edit" />}
      {...props}
    >
      <EditRoomBlockingFormDialogInternal {...props} />
    </FormDialog>
  );
}

const connector = connect((state: RootState) => ({}), {});
export const EditRoomBlockingFormDialog = connector(
  _EditRoomBlockingFormDialog
);
