import React from "react";
import moment from "moment";
import { connect, ConnectedProps } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import FormDialog from "../FormDialog/FormDialog";
import Grid from "@material-ui/core/Grid";
import FormTextField from "../formFields/FormTextField";
import FormDatePicker from "../formFields/FormDatePicker";
import FormNumberTextField from "../formFields/FormNumberTextField/FormNumberTextField";
import * as dateService from "../../../services/dateService";

import { FormattedMessage } from "react-intl";
import { FormProps, useFormState } from "react-final-form";
import FormSelect from "../formFields/FormSelect";
import {
  IRoom,
  DateOrString,
  ITimestamps,
  IRoomBooking,
  IBooking,
} from "../../../interfaces";

import {
  selectors as roomsSelectors,
  getRooms,
} from "../../../slices/adminSlice/roomsSlice";
import { RootState } from "../../../store";

import { biggerThan, smallerThan } from "../../../services/validatorsService";

export const ADD_BOOKING_FORM_DIALOG = "ADD_BOOKING_FORM_DIALOG";

export const roomBookingToApiMapper = (
  roomBooking: Partial<IRoomBooking>
): Partial<IRoomBooking> => {
  return {
    ...roomBooking,
    checkinDate: moment(roomBooking.checkinDate)
      .set({
        hour: 18,
        minute: 0,
        second: 0,
      })
      .toISOString(),
    checkoutDate: moment(roomBooking.checkoutDate)
      .set({
        hour: 12,
        minute: 0,
        second: 0,
      })
      .toISOString(),
  };
};

export const formToApiMapper = (formPayload: ICreateBooking): IBooking => {
  const {
    checkinDate,
    checkoutDate,
    roomBookings,
    ...restFormPayload
  } = formPayload as ICreateBooking;

  return {
    ...restFormPayload,
    roomBookings: (roomBookings || []).map((roomId) =>
      roomBookingToApiMapper({
        roomId,
        checkinDate,
        checkoutDate,
      })
    ),
  };
};

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    fontSize: 14,
    color: theme.palette.error.main,
    padding: 8,
  },
}));

interface IAddBookingFormDialogInternalProps
  extends AddBookingFormDialogProps {}
const AddBookingFormDialogInternal = (
  props: IAddBookingFormDialogInternalProps
) => {
  const formState = useFormState();
  const [isPeriodChosen, setIsPeriodChosen] = React.useState(false);
  const classes = useStyles();

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
              setIsPeriodChosen(true);
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
              setIsPeriodChosen(true);
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
      {isPeriodChosen && (
        <>
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
          <Grid item sm={9} xs={12}>
            <FormSelect
              fullWidth
              required
              multiple
              name="roomBookings"
              margin="dense"
              data={(props.rooms || []).map((room: IRoom) => ({
                value: room.id,
                label: room.name as string,
              }))}
              renderValue={(selected) => {
                return (selected as any[])
                  .map(
                    (item) =>
                      props.rooms.find((room) => room.id === item)?.name || ""
                  )
                  .join(", ");
              }}
              label={<FormattedMessage id="App.bookings.booking.chooseRooms" />}
            />
          </Grid>
          <Grid item sm={3} xs={12}>
            <FormNumberTextField
              fullWidth
              disabled={props.loading}
              margin="dense"
              name="numberOfPersons"
              label={
                <FormattedMessage id="App.bookings.booking.numberOfPersons" />
              }
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
        </>
      )}
      {isPeriodChosen && !props.loading && props.rooms.length === 0 && (
        <span className={classes.errorMessage}>
          <FormattedMessage id="App.bookings.booking.noRoomsAvailableForThisPeriod" />
        </span>
      )}
    </Grid>
  );
};

export type ICreateBooking = ITimestamps & {
  id: string;
  companyId?: string;
  checkinDate: DateOrString;
  checkoutDate: DateOrString;
  code: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  roomBookings?: string[];
  numberOfPersons?: number;
  details?: string;
};

type PropsFromRedux = ConnectedProps<typeof connector>;
type AddBookingFormDialogFormProps = FormProps<ICreateBooking | null>;
export type AddBookingFormDialogProps = PropsFromRedux &
  AddBookingFormDialogFormProps & {
    loading?: boolean;
    name?: string;
  };
function AddBookingFormDialog(props: AddBookingFormDialogProps) {
  return (
    <FormDialog<ICreateBooking | null>
      name={props.name || ADD_BOOKING_FORM_DIALOG}
      title={<FormattedMessage id="App.bookings.booking.addBooking" />}
      {...props}
    >
      <AddBookingFormDialogInternal {...props} />
    </FormDialog>
  );
}

const connector = connect(
  (state: RootState) => ({
    rooms: roomsSelectors.selectRooms(state),
  }),
  { getRooms }
);
export default connector(AddBookingFormDialog);
