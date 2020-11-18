import React from "react";
import { connect, ConnectedProps } from "react-redux";
import FormDialog from "../common/FormDialog/FormDialog";
import Grid from "@material-ui/core/Grid";
import FormTextField from "../common/formFields/FormTextField";
import FormNumberTextField from "../common/formFields/FormNumberTextField/FormNumberTextField";
import { FormattedMessage } from "react-intl";
import { FormProps } from "react-final-form";
import { IRoom } from "../../interfaces";
import FormSelect from "../common/formFields/FormSelect";
import {
  getRoomTypes,
  selectors as roomTypesSelectors,
} from "../../slices/adminSlice/roomTypesSlice";
import { RootState } from "../../store";
import { FormUploadField } from "../common/formFields/FormUploadField";

export const ADD_EDIT_ROOM_FORM_DIALOG = "ADD_EDIT_ROOM_FORM_DIALOG";

type PropsFromRedux = ConnectedProps<typeof connector>;
type AddEditRoomFormDialogFormProps = PropsFromRedux & FormProps<IRoom | null>;
export type AddEditRoomFormDialogProps = AddEditRoomFormDialogFormProps & {
  loading?: boolean;
};
function AddEditRoomFormDialog(props: AddEditRoomFormDialogProps) {
  const isEdit = Boolean(props.initialValues?.id);

  React.useEffect(() => {
    props.getRoomTypes();
    // eslint-disable-next-line
  }, []);

  return (
    <FormDialog<IRoom | null>
      name={ADD_EDIT_ROOM_FORM_DIALOG}
      title={
        <FormattedMessage
          id={isEdit ? "App.rooms.room.editRoom" : "App.rooms.room.addRoom"}
        />
      }
      confirmLabel={isEdit ? <FormattedMessage id="App.common.edit" /> : null}
      {...props}
    >
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <FormTextField
            fullWidth
            required
            disabled={props.loading}
            name="name"
            margin="dense"
            label={<FormattedMessage id="App.rooms.room.name" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormSelect
            fullWidth
            required
            name="roomTypeId"
            margin="dense"
            data={props.roomTypes.map((roomType) => ({
              value: roomType.id,
              label: roomType.name,
            }))}
            label={<FormattedMessage id="App.rooms.room.roomType" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormNumberTextField
            fullWidth
            required
            disabled={props.loading}
            name="numberOfBeds"
            margin="dense"
            label={<FormattedMessage id="App.rooms.room.numberOfBeds" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormNumberTextField
            fullWidth
            disabled={props.loading}
            margin="dense"
            name="numberOfBathrooms"
            label={<FormattedMessage id="App.rooms.room.numberOfBathrooms" />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormUploadField name="images" fileType="image/*" />
        </Grid>
      </Grid>
    </FormDialog>
  );
}

const connector = connect(
  (state: RootState) => ({
    roomTypes: roomTypesSelectors.selectRoomTypes(state),
  }),
  { getRoomTypes }
);
export default connector(AddEditRoomFormDialog);
