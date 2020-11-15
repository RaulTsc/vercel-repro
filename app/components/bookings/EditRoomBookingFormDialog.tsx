import React from "react";
import moment from "moment";
import { connect, ConnectedProps } from "react-redux";
import FormDialog, { FormDialogProps } from "../common/FormDialog/FormDialog";
import Grid from "@material-ui/core/Grid";
import FormDatePicker from "../common/formFields/FormDatePicker";
import { FormattedMessage } from "react-intl";
import { useFormState, useForm } from "react-final-form";
import FormSelect from "../common/formFields/FormSelect";
import { RootState } from "../../store";
import {
  selectors as roomsSelectors,
  getRooms,
} from "../../slices/adminSlice/roomsSlice";
import { IRoom, ITimestamps, DateOrString } from "../../interfaces";

import { biggerThan, smallerThan } from "../../services/validatorsService";
import * as dateService from "../../services/dateService";

export const EDIT_ROOM_BOOKING_FORM_DIALOG = "EDIT_ROOM_BOOKING_FORM_DIALOG";

interface IEditRoomBookingFormDialogInternalProps
  extends EditRoomBookingFormDialogProps {}
const EditRoomBookingFormDialogInternal = (
  props: IEditRoomBookingFormDialogInternalProps
) => {
  React.useEffect(() => {
    props.getRooms({
      filter: {
        availableFrom: props.initialValues?.checkinDate as string,
        availableTo: props.initialValues?.checkoutDate as string,
      },
    });
    // eslint-disable-next-line
  }, []);
  const formState = useFormState();
  const form = useForm();

  const finalRooms = props.rooms.concat([
    {
      id: props.initialValues?.room?.id,
      name: props.initialValues?.room?.name,
    },
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <FormDatePicker
          fullWidth
          required
          minDate={new Date()}
          disabled={props.loading}
          name="checkinDate"
          variant="inline"
          label={<FormattedMessage id="App.bookings.booking.checkInDate" />}
          validate={[
            smallerThan(
              "checkoutDate",
              "App.bookings.booking.checkoutDate.smallerThanCheckoutDate"
            ),
          ]}
          onChange={(value: any) => {
            const availableFrom = dateService.toISOString(value);
            const availableTo = dateService.toISOString(
              formState.values.checkoutDate
            );
            if (
              availableFrom &&
              availableTo &&
              moment(availableFrom).isBefore(moment(availableTo))
            ) {
              props.getRooms({
                filter: {
                  availableFrom,
                  availableTo,
                },
              });
              form.change("roomBookings", []);
            }
          }}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormDatePicker
          fullWidth
          required
          minDate={new Date()}
          disabled={props.loading}
          name="checkoutDate"
          variant="inline"
          label={<FormattedMessage id="App.bookings.booking.checkOutDate" />}
          validate={[
            biggerThan(
              "checkinDate",
              "App.bookings.booking.checkoutDate.biggerThanCheckinDate"
            ),
          ]}
          onChange={(value: any) => {
            const availableFrom = dateService.toISOString(
              formState.values.checkinDate
            );
            const availableTo = dateService.toISOString(value);
            if (
              availableFrom &&
              availableTo &&
              moment(availableFrom).isBefore(availableTo)
            ) {
              props.getRooms({
                filter: {
                  availableFrom,
                  availableTo,
                },
              });
              form.change("roomBookings", []);
            }
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormSelect
          fullWidth
          required
          name="roomId"
          margin="dense"
          disabled={props.loading}
          data={finalRooms.map((room) => ({
            value: room.id,
            label: room.name as string,
          }))}
          label={
            <FormattedMessage id="App.bookings.booking.editRoomBooking.chooseRoom" />
          }
        />
      </Grid>
    </Grid>
  );
};

export type ICreateEditRoomBooking = ITimestamps & {
  id: string;
  roomId?: string;
  bookingId?: string;
  checkinDate: DateOrString;
  checkoutDate: DateOrString;
  room?: IRoom;
};
type PropsFromRedux = ConnectedProps<typeof connector>;
export type EditRoomBookingFormDialogProps = PropsFromRedux &
  Omit<
    FormDialogProps<ICreateEditRoomBooking | null>,
    "name" | "title" | "confirmLabel"
  > & {
    loading: boolean;
    onSubmit: any;
  };
function EditRoomBookingFormDialog(props: EditRoomBookingFormDialogProps) {
  return (
    <FormDialog<ICreateEditRoomBooking | null>
      name={EDIT_ROOM_BOOKING_FORM_DIALOG}
      title={<FormattedMessage id="App.bookings.booking.editBooking" />}
      confirmLabel={<FormattedMessage id="App.bookings.booking.edit" />}
      {...props}
    >
      <EditRoomBookingFormDialogInternal {...props} />
    </FormDialog>
  );
}

const connector = connect(
  (state: RootState) => ({
    rooms: roomsSelectors.selectRooms(state),
  }),
  { getRooms }
);
export default connector(EditRoomBookingFormDialog);
