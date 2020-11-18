import React from "react";
import moment from "moment";
import { connect, ConnectedProps } from "react-redux";
import FormDialog from "../../components/common/FormDialog/FormDialog";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FormTextField from "../../components/common/formFields/FormTextField";
import FormDatePicker from "../../components/common/formFields/FormDatePicker";
import { FormattedMessage } from "react-intl";
import { FormProps, useFormState } from "react-final-form";
import FormNumberTextField from "../../components/common/formFields/FormNumberTextField/FormNumberTextField";
import { RootState } from "../../store";
import {
  selectors as roomsSelectors,
  getRooms,
} from "../../slices/adminSlice/roomsSlice";
import {
  IRoom,
  IBooking,
  IRoomBooking,
  ITimestamps,
  DateOrString,
} from "../../interfaces";
import { FieldArray } from "react-final-form-arrays";
import CloseIcon from "@material-ui/icons/Close";

import { biggerThan, smallerThan } from "../../services/validatorsService";
import * as dateService from "../../services/dateService";
import FormSelect from "../../components/common/formFields/FormSelect";
import { editBooking } from "../../slices/adminSlice/bookingsSlice";
import { roomBookingToApiMapper } from "../../components/common/AddBookingFormDialog/AddBookingFormDialog";

export const EDIT_BOOKING_FORM_DIALOG = "EDIT_BOOKING_FORM_DIALOG";

export const formToApiMapper = (formPayload: IEditBooking): IBooking => {
  const { roomBookings, ...restFormPayload } = formPayload as IEditBooking;

  return {
    ...restFormPayload,
    roomBookings: (roomBookings || []).map((roomBooking) =>
      roomBookingToApiMapper(roomBooking)
    ),
  };
};

interface IEditBookingFormDialogInternalProps
  extends EditBookingFormDialogProps {}
const EditBookingFormDialogInternal = (
  props: IEditBookingFormDialogInternalProps
) => {
  React.useEffect(() => {
    // eslint-disable-next-line
  }, []);
  const formState = useFormState();

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <FormTextField
          fullWidth
          required
          disabled={props.loading}
          name="firstName"
          margin="dense"
          label={<FormattedMessage id="App.bookings.booking.firstName" />}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormTextField
          fullWidth
          required
          disabled={props.loading}
          name="lastName"
          margin="dense"
          label={<FormattedMessage id="App.bookings.booking.lastName" />}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormTextField
          fullWidth
          disabled={props.loading}
          name="phoneNumber"
          margin="dense"
          label={<FormattedMessage id="App.bookings.booking.phoneNumber" />}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormTextField
          fullWidth
          disabled={props.loading}
          name="email"
          margin="dense"
          label={<FormattedMessage id="App.bookings.booking.email" />}
        />
      </Grid>
      <Grid item xs={12}>
        <FormNumberTextField
          fullWidth
          disabled={props.loading}
          multiline
          margin="dense"
          name="numberOfPersons"
          label={<FormattedMessage id="App.bookings.booking.numberOfPersons" />}
          rowsMax={4}
        />
      </Grid>
      <Grid item xs={12}>
        <FormTextField
          fullWidth
          disabled={props.loading}
          multiline
          margin="dense"
          name="details"
          label={<FormattedMessage id="App.bookings.booking.details" />}
          rowsMax={4}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ marginBottom: "-8px", marginTop: "8px", fontWeight: 600 }}
        >
          <FormattedMessage id="App.rooms.title" />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FieldArray name="roomBookings">
          {({ fields }) => {
            const formFields = fields.map((name, index) => {
              const fieldValue = formState.values.roomBookings[index];
              const isRoomSelected = Boolean(fieldValue?.room?.name);

              return (
                <Grid container spacing={2} key={name}>
                  <Grid item sm={4} xs={12} style={{ paddingTop: 4 }}>
                    {isRoomSelected && (
                      <FormTextField
                        fullWidth
                        required
                        disabled
                        name={`${name}.room.name`}
                        margin="dense"
                        label={
                          <FormattedMessage id="App.bookings.booking.room" />
                        }
                      />
                    )}
                    {!isRoomSelected && (
                      <FormSelect
                        fullWidth
                        required
                        name={`${name}.roomId`}
                        margin="dense"
                        data={(props.rooms || []).map((room: IRoom) => ({
                          value: room.id,
                          label: room.name as string,
                        }))}
                        label={
                          <FormattedMessage id="App.bookings.booking.chooseRoom" />
                        }
                      />
                    )}
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <FormDatePicker
                      fullWidth
                      required
                      minDate={new Date()}
                      disabled={props.loading}
                      name={`${name}.checkinDate`}
                      variant="inline"
                      label={
                        <FormattedMessage id="App.bookings.booking.checkInDate" />
                      }
                      validate={[
                        smallerThan(
                          `${name}.checkoutDate`,
                          "App.bookings.booking.checkoutDate.smallerThanCheckoutDate"
                        ),
                      ]}
                      onChange={(value: any) => {
                        const availableFrom = dateService.toISOString(value);
                        const availableTo = dateService.toISOString(
                          fieldValue?.checkoutDate
                        );
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
                        }
                      }}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12} style={{ display: "flex" }}>
                    <FormDatePicker
                      fullWidth
                      required
                      minDate={new Date()}
                      disabled={props.loading}
                      name={`${name}.checkoutDate`}
                      variant="inline"
                      label={
                        <FormattedMessage id="App.bookings.booking.checkOutDate" />
                      }
                      validate={[
                        biggerThan(
                          `${name}.checkinDate`,
                          "App.bookings.booking.checkoutDate.biggerThanCheckinDate"
                        ),
                      ]}
                      onChange={(value: any) => {
                        const availableFrom = dateService.toISOString(
                          fieldValue?.checkinDate
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
                        }
                      }}
                    />
                    <div>
                      <IconButton
                        disabled={fields.length === 1}
                        onClick={() => fields.remove(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
              );
            });

            return (
              <div>
                <div>{formFields}</div>
                <Grid item xs={12} style={{ marginTop: "10px" }}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => {
                      const checkinDate =
                        formState.values.roomBookings[
                          formState.values.roomBookings.length - 1
                        ].checkinDate;
                      const checkoutDate =
                        formState.values.roomBookings[
                          formState.values.roomBookings.length - 1
                        ].checkoutDate;
                      const allRowsRoomSelected = formState.values.roomBookings.every(
                        (roomBooking: IRoomBooking) =>
                          Boolean(roomBooking.roomId)
                      );
                      if (!allRowsRoomSelected) {
                        return;
                      }

                      fields.push({
                        checkinDate,
                        checkoutDate,
                      });

                      props.getRooms({
                        filter: {
                          availableFrom: checkinDate,
                          availableTo: checkoutDate,
                        },
                      });
                    }}
                  >
                    <FormattedMessage id="App.admin.bookings.edit.addRoom" />
                  </Button>
                </Grid>
              </div>
            );
          }}
        </FieldArray>
      </Grid>
    </Grid>
  );
};

export type IEditBooking = ITimestamps & {
  id?: string;
  companyId?: string;
  checkinDate?: DateOrString;
  checkoutDate?: DateOrString;
  code?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  roomBookings?: IRoomBooking[];
  numberOfPersons?: number;
  details?: string;
};

type PropsFromRedux = ConnectedProps<typeof connector>;
export type EditBookingFormDialogProps = PropsFromRedux &
  FormProps<IEditBooking | null> & {
    loading: boolean;
  };
function EditBookingFormDialog(props: EditBookingFormDialogProps) {
  return (
    <FormDialog<IEditBooking | null>
      name={EDIT_BOOKING_FORM_DIALOG}
      title={<FormattedMessage id="App.bookings.booking.editBooking" />}
      confirmLabel={<FormattedMessage id="App.bookings.booking.edit" />}
      {...props}
    >
      <EditBookingFormDialogInternal {...props} />
    </FormDialog>
  );
}

const connector = connect(
  (state: RootState) => ({
    rooms: roomsSelectors.selectRooms(state),
  }),
  { getRooms, editBooking }
);
export default connector(EditBookingFormDialog);
