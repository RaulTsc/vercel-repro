import moment from "moment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import { prismApi } from "../../helpers/api";
import { IBooking } from "../../interfaces";
import { applyQueryFilters } from "@raultom/common-helpers/lib/helpers/navigation";

interface ISliceState {
  loading: boolean;
  bookingsCheckinToday: IBooking[];
  bookingsCheckoutToday: IBooking[];
  bookingRequests: IBooking[];
  error: string | null;
}

const dashboardSlice = createSlice({
  name: "bookings",
  initialState: {
    loading: false,
    error: null,
    bookingsCheckinToday: [],
    bookingsCheckoutToday: [],
    bookingRequests: [],
  } as ISliceState,
  reducers: {
    getBookingsCheckinTodayStart(state) {
      state.loading = true;
    },
    getBookingsCheckinTodaySuccess(state, action: PayloadAction<IBooking[]>) {
      state.loading = false;
      state.bookingsCheckinToday = action.payload;
    },
    getBookingsCheckinTodayFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getBookingsCheckoutTodayStart(state) {
      state.loading = true;
    },
    getBookingsCheckoutTodaySuccess(state, action: PayloadAction<IBooking[]>) {
      state.loading = false;
      state.bookingsCheckoutToday = action.payload;
    },
    getBookingsCheckoutTodayFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getBookingRequestsStart(state) {
      state.loading = true;
    },
    getBookingRequestsSuccess(state, action: PayloadAction<IBooking[]>) {
      state.loading = false;
      state.bookingRequests = action.payload;
    },
    getBookingRequestsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getBookingsCheckinToday = (): AppThunk => async (dispatch) => {
  try {
    dispatch(dashboardSlice.actions.getBookingsCheckinTodayStart());

    const response = await prismApi.get(
      applyQueryFilters("/companies/me/bookings", {
        checkinDateStart: moment()
          .set({
            hour: 1,
            minute: 0,
            second: 0,
          })
          .toISOString(),
        checkinDateEnd: moment()
          .set({
            hour: 23,
            minute: 59,
            second: 59,
          })
          .toISOString(),
      })
    );
    const bookings: IBooking[] = await response.json();
    dispatch(dashboardSlice.actions.getBookingsCheckinTodaySuccess(bookings));
  } catch (err) {
    dispatch(dashboardSlice.actions.getBookingsCheckinTodayFailure(err));
  }
};

export const getBookingsCheckoutToday = (): AppThunk => async (dispatch) => {
  try {
    dispatch(dashboardSlice.actions.getBookingsCheckoutTodayStart());
    const response = await prismApi.get(
      applyQueryFilters("/companies/me/bookings", {
        checkoutDateStart: moment()
          .set({
            hour: 0,
            minute: 0,
            second: 0,
          })
          .toISOString(),
        checkoutDateEnd: moment()
          .set({
            hour: 23,
            minute: 59,
            second: 59,
          })
          .toISOString(),
      })
    );
    const bookings: IBooking[] = await response.json();
    dispatch(dashboardSlice.actions.getBookingsCheckoutTodaySuccess(bookings));
  } catch (err) {
    dispatch(dashboardSlice.actions.getBookingsCheckoutTodayFailure(err));
  }
};

export const getBookingRequests = (): AppThunk => async (dispatch) => {
  try {
    dispatch(dashboardSlice.actions.getBookingRequestsStart());

    const response = await prismApi.get(
      applyQueryFilters("/companies/me/bookings", {
        isConfirmed: false,
      })
    );
    const bookings: IBooking[] = await response.json();
    dispatch(dashboardSlice.actions.getBookingRequestsSuccess(bookings));
  } catch (err) {
    dispatch(dashboardSlice.actions.getBookingRequestsFailure(err));
  }
};

export const reducer = dashboardSlice.reducer;

export const selectors = {
  selectBookingsCheckinToday: (state: RootState) =>
    state.admin.dashboard.bookingsCheckinToday,
  selectBookingsCheckoutToday: (state: RootState) =>
    state.admin.dashboard.bookingsCheckoutToday,
  selectBookingRequests: (state: RootState) =>
    state.admin.dashboard.bookingRequests,
};
