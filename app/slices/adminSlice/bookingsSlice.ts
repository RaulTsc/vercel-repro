import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";
import { prismApi } from "./../../helpers/api";
import { IBooking, ISortFilterPaging, DateOrString } from "../../interfaces";
import { applyQueryFilters } from "@raultom/common-helpers/lib/helpers/navigation";

interface ISliceState {
  loading: boolean;
  error: string | null;
  bookings: IBooking[];
  creatingBooking: boolean;
  editingBooking: boolean;
  deletingBooking: boolean;
  booking: IBooking | null;
}

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    loading: false,
    error: null,
    bookings: [],
    creatingBooking: false,
    editingBooking: false,
    deletingBooking: false,
    booking: null,
  } as ISliceState,
  reducers: {
    getBookingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getBookingsSuccess(state, action: PayloadAction<IBooking[]>) {
      state.bookings = action.payload;
      state.loading = false;
      state.error = null;
    },
    getBookingsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createBookingStart(state) {
      state.creatingBooking = true;
      state.error = null;
    },
    createBookingSuccess(state) {
      state.creatingBooking = false;
      state.error = null;
    },
    createBookingFailure(state, action: PayloadAction<string>) {
      state.creatingBooking = false;
      state.error = action.payload;
    },
    deleteBookingStart(state) {
      state.deletingBooking = true;
      state.error = null;
    },
    deleteBookingSuccess(state) {
      state.deletingBooking = false;
      state.error = null;
    },
    deleteBookingFailure(state, action: PayloadAction<string>) {
      state.deletingBooking = false;
      state.error = action.payload;
    },
    getBookingStart(state) {
      state.loading = true;
      state.error = null;
    },
    getBookingSuccess(state, action: PayloadAction<IBooking>) {
      state.loading = false;
      state.booking = action.payload;
      state.error = null;
    },
    getBookingFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editBookingStart(state) {
      state.editingBooking = true;
      state.error = null;
    },
    editBookingSuccess(state) {
      state.editingBooking = false;
      state.error = null;
    },
    editBookingFailure(state, action: PayloadAction<string>) {
      state.editingBooking = false;
      state.error = action.payload;
    },
  },
});

export const reducer = bookingsSlice.reducer;

export interface IGetBookingsFilter {
  fullSearch?: string;
  startDate?: DateOrString;
  endDate?: DateOrString;
}
export const getBookings = (
  sortFilterPaging: ISortFilterPaging<IGetBookingsFilter> = {}
): AppThunk<Promise<IBooking[]>> => async (dispatch): Promise<IBooking[]> => {
  try {
    dispatch(bookingsSlice.actions.getBookingsStart());
    const result = await prismApi.get(
      applyQueryFilters(
        "/companies/me/bookings",
        sortFilterPaging.filter,
        sortFilterPaging.sort,
        sortFilterPaging.paging
      )
    );
    const bookings = await result.json();
    dispatch(bookingsSlice.actions.getBookingsSuccess(bookings));
    return bookings;
  } catch (err) {
    dispatch(bookingsSlice.actions.getBookingsFailure(err));
    return [];
  }
};

export const createBooking = (booking: IBooking | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!booking) {
      throw new Error("Cannot create a null booking");
    }

    dispatch(bookingsSlice.actions.createBookingStart());
    await prismApi.post("/companies/me/bookings", booking);
    dispatch(bookingsSlice.actions.createBookingSuccess());
  } catch (err) {
    dispatch(bookingsSlice.actions.createBookingFailure(err));
  }
};

export const getBooking = (bookingId: string | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!bookingId) {
      throw new Error("Cannot get a null booking");
    }

    dispatch(bookingsSlice.actions.getBookingStart());
    const response = await prismApi.get(`/companies/me/bookings/${bookingId}`);
    dispatch(bookingsSlice.actions.getBookingSuccess(await response.json()));
  } catch (err) {
    dispatch(bookingsSlice.actions.getBookingFailure(err));
  }
};

export const editBooking = (
  booking: Partial<IBooking> | null
): AppThunk => async (dispatch) => {
  try {
    if (!booking) {
      throw new Error("Cannot edit a null booking");
    }

    dispatch(bookingsSlice.actions.editBookingStart());
    await prismApi.patch(`/companies/me/bookings/${booking.id}`, booking);
    dispatch(bookingsSlice.actions.editBookingSuccess());
  } catch (err) {
    dispatch(bookingsSlice.actions.editBookingFailure(err));
  }
};

export const deleteBooking = (booking: IBooking | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!booking) {
      throw new Error("Cannot delete a null booking");
    }

    dispatch(bookingsSlice.actions.deleteBookingStart());
    await prismApi.delete(`/companies/me/bookings/${booking.id}`);
    dispatch(bookingsSlice.actions.deleteBookingSuccess());
  } catch (err) {
    dispatch(bookingsSlice.actions.deleteBookingFailure(err));
  }
};

export const selectors = {
  selectLoading: (state: RootState) => state.admin.bookings.loading,
  selectError: (state: RootState) => state.admin.bookings.error,
  selectCreatingBooking: (state: RootState) =>
    state.admin.bookings.creatingBooking,
  selectEditingBooking: (state: RootState) =>
    state.admin.bookings.editingBooking,
  selectDeletingBooking: (state: RootState) =>
    state.admin.bookings.deletingBooking,
  selectBookings: (state: RootState) => state.admin.bookings.bookings,
  selectBooking: (state: RootState) => state.admin.bookings.booking,
};
