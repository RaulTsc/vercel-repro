import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ISortFilterPaging,
  DateOrString,
  IRoomBooking,
  IRoom,
} from "../../interfaces";
import { AppThunk, RootState } from "../../store";
import { applyQueryFilters } from "@raultom/common-helpers/lib/helpers/navigation";
import { prismApi } from "../../helpers/api";

interface ISliceState {
  rooms: IRoom[];
  roomBookings: IRoomBooking[];
  loading: boolean;
  error: any;
}

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    loading: false,
    error: null,
    rooms: [],
    roomBookings: [],
  } as ISliceState,
  reducers: {
    getRoomsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRoomsSuccess(state, action: PayloadAction<IRoom[]>) {
      state.rooms = action.payload;
      state.loading = false;
      state.error = null;
    },
    getRoomsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    getRoomBookingsStart(state) {
      state.error = null;
    },
    getRoomBookingsSuccess(state, action: PayloadAction<IRoomBooking[]>) {
      state.roomBookings = action.payload;
      state.error = null;
    },
    getRoomBookingsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    patchRoomBookingStart(state) {
      state.error = null;
    },
    patchRoomBookingSuccess(state) {
      state.error = null;
    },
    patchRoomBookingFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    deleteRoomBookingStart(state) {
      state.error = null;
    },
    deleteRoomBookingSuccess(state) {
      state.error = null;
    },
    deleteRoomBookingFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export interface IGetRoomsFilter {
  fullSearch?: string;
  availableFrom?: string;
  availableTo?: string;
}
export const getRooms = (
  sortFilterPaging: ISortFilterPaging<IGetRoomsFilter> = {}
): AppThunk<Promise<IRoom[]>> => async (dispatch): Promise<IRoom[]> => {
  try {
    dispatch(calendarSlice.actions.getRoomsStart());
    const result = await prismApi.get(
      applyQueryFilters(
        "/companies/me/rooms",
        sortFilterPaging.filter,
        sortFilterPaging.sort,
        sortFilterPaging.paging
      )
    );
    const rooms = await result.json();
    dispatch(calendarSlice.actions.getRoomsSuccess(rooms));
    return rooms;
  } catch (err) {
    dispatch(calendarSlice.actions.getRoomsFailure(err));
    return [];
  }
};

export interface IGetRoomsFilter {
  startDate?: DateOrString;
  endDate?: DateOrString;
}
export const getRoomBookings = (
  sortFilterPaging: ISortFilterPaging<IGetRoomsFilter> = {}
): AppThunk<Promise<IRoomBooking[]>> => async (
  dispatch
): Promise<IRoomBooking[]> => {
  try {
    dispatch(calendarSlice.actions.getRoomBookingsStart());
    const result = await prismApi.get(
      applyQueryFilters(
        "/companies/me/room-bookings",
        sortFilterPaging.filter,
        sortFilterPaging.sort,
        sortFilterPaging.paging
      )
    );
    const roomBookings = await result.json();
    dispatch(calendarSlice.actions.getRoomBookingsSuccess(roomBookings));
    return roomBookings;
  } catch (err) {
    dispatch(calendarSlice.actions.getRoomBookingsFailure(err));
    return [];
  }
};

export interface IGetRoomsFilter {
  startDate?: DateOrString;
  endDate?: DateOrString;
}
export const patchRoomBooking = (
  bookingId: string,
  roomBookingId: string,
  roomBooking: Partial<IRoomBooking>
): AppThunk<Promise<void>> => async (dispatch): Promise<void> => {
  try {
    dispatch(calendarSlice.actions.patchRoomBookingStart());
    await prismApi.patch(
      `/companies/me/bookings/${bookingId}/room-bookings/${roomBookingId}`,
      roomBooking
    );
    dispatch(calendarSlice.actions.patchRoomBookingSuccess());
  } catch (err) {
    dispatch(calendarSlice.actions.patchRoomBookingFailure(err));
  }
};

export const deleteRoomBooking = (
  roomBooking: IRoomBooking
): AppThunk<Promise<void>> => async (dispatch): Promise<void> => {
  try {
    dispatch(calendarSlice.actions.deleteRoomBookingStart());
    await prismApi.delete(
      `/companies/me/bookings/${roomBooking.bookingId}/room-bookings/${roomBooking.id}`
    );
    dispatch(calendarSlice.actions.deleteRoomBookingSuccess());
  } catch (err) {
    dispatch(calendarSlice.actions.deleteRoomBookingFailure(err));
  }
};

export const reducer = calendarSlice.reducer;

export const selectors = {
  selectLoading: (state: RootState) => state.admin.calendar.loading,
  selectError: (state: RootState) => state.admin.calendar.error,
  selectRooms: (state: RootState) => state.admin.calendar.rooms,
  selectRoomBookings: (state: RootState) => state.admin.calendar.roomBookings,
};
