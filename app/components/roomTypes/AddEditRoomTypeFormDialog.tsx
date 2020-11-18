import React from "react";
import { connect, ConnectedProps } from "react-redux";
import FormDialog from "../common/FormDialog/FormDialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormTextField from "../common/formFields/FormTextField";
import FormNumberTextField from "../common/formFields//FormNumberTextField/FormNumberTextField";
import { FormattedMessage } from "react-intl";
import { FormProps } from "react-final-form";
import { IRoomType, IRoomTypeAmenity } from "../../interfaces";
import { FormCheckbox } from "../common/formFields/FormCheckbox";
import { FormUploadField } from "../common/formFields/FormUploadField";

export const ADD_EDIT_ROOM_TYPE_FORM_DIALOG = "ADD_EDIT_ROOM_TYPE_FORM_DIALOG";

type PropsFromRedux = ConnectedProps<typeof connector>;
type AddEditRoomTypeFormDialogFormProps = PropsFromRedux &
  FormProps<IRoomType | null>;
export type AddEditRoomTypeFormDialogProps = AddEditRoomTypeFormDialogFormProps & {
  loading?: boolean;
};
function AddEditRoomTypeFormDialog(props: AddEditRoomTypeFormDialogProps) {
  const isEdit = Boolean(props.initialValues?.id);

  return (
    <FormDialog<IRoomType | null>
      name={ADD_EDIT_ROOM_TYPE_FORM_DIALOG}
      title={
        <FormattedMessage
          id={
            isEdit
              ? "App.roomTypes.roomType.editRoomType"
              : "App.roomTypes.roomType.addRoomType"
          }
        />
      }
      confirmLabel={isEdit ? <FormattedMessage id="App.common.edit" /> : null}
      {...props}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormTextField
            fullWidth
            required
            disabled={props.loading}
            name="name"
            margin="dense"
            label={<FormattedMessage id="App.roomTypes.roomType.name" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormNumberTextField
            fullWidth
            isDouble
            required
            disabled={props.loading}
            name="rate"
            margin="dense"
            label={<FormattedMessage id="App.roomTypes.roomType.rate" />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormNumberTextField
            fullWidth
            required
            disabled={props.loading}
            name="maxNumberOfGuests"
            margin="dense"
            label={
              <FormattedMessage id="App.roomTypes.roomType.maxNumberOfGuests" />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            fullWidth
            disabled={props.loading}
            multiline
            margin="dense"
            name="description"
            label={<FormattedMessage id="App.roomTypes.roomType.details" />}
            rows={4}
            rowsMax={10}
          />
        </Grid>
        <Grid item xs={12}>
          <FormUploadField name="images" fileType="image/*" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
            <FormattedMessage id="App.common.amenities" />
          </Typography>
          <Grid container spacing={2} style={{ margin: "0px" }}>
            {(props.initialValues?.amenities || []).map(
              (amenity: IRoomTypeAmenity, index: number) => (
                <Grid item xs={12} sm={4} style={{ padding: "0px" }}>
                  <FormCheckbox
                    fullWidth
                    required
                    disabled={props.loading}
                    name={`amenities.${index}.isSelected`}
                    label={
                      amenity.locale ? (
                        <FormattedMessage id={amenity.locale} />
                      ) : null
                    }
                  />
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      </Grid>
    </FormDialog>
  );
}

const connector = connect(null, {});
export default connector(AddEditRoomTypeFormDialog);
