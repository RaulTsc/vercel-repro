import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";
import { prismApi } from "../../helpers/api";
import {
  IRoomBlocking,
  IRoom,
  ISortFilterPaging,
  DateOrString,
} from "../../interfaces";
import { applyQueryFilters } from "@raultom/common-helpers/lib/helpers/navigation";

interface ISliceState {
  loading: boolean;
  error: string | null;
  totalRooms: number;
  rooms: IRoom[];
  creatingRoom: boolean;
  editingRoom: boolean;
  deletingRoom: boolean;
  room: IRoom | null;
  roomBlockings: IRoomBlocking[];
}

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    loading: false,
    error: null,
    totalRooms: 0,
    rooms: [],
    creatingRoom: false,
    editingRoom: false,
    deletingRoom: false,
    room: null,
    roomBlockings: [],
  } as ISliceState,
  reducers: {
    getRoomsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRoomsSuccess(
      state,
      action: PayloadAction<{ totalRooms: number; rooms: IRoom[] }>
    ) {
      state.totalRooms = action.payload.totalRooms;
      state.rooms = action.payload.rooms;
      state.loading = false;
      state.error = null;
    },
    getRoomsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createRoomStart(state) {
      state.creatingRoom = true;
      state.error = null;
    },
    createRoomSuccess(state) {
      state.creatingRoom = false;
      state.error = null;
    },
    createRoomFailure(state, action: PayloadAction<string>) {
      state.creatingRoom = false;
      state.error = action.payload;
    },
    deleteRoomStart(state) {
      state.deletingRoom = true;
      state.error = null;
    },
    deleteRoomSuccess(state) {
      state.deletingRoom = false;
      state.error = null;
    },
    deleteRoomFailure(state, action: PayloadAction<string>) {
      state.deletingRoom = false;
      state.error = action.payload;
    },
    getRoomStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRoomSuccess(state, action: PayloadAction<IRoom>) {
      state.loading = false;
      state.room = action.payload;
      state.error = null;
    },
    getRoomFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editRoomStart(state) {
      state.editingRoom = true;
      state.error = null;
    },
    editRoomSuccess(state) {
      state.editingRoom = false;
      state.error = null;
    },
    editRoomFailure(state, action: PayloadAction<string>) {
      state.editingRoom = false;
      state.error = action.payload;
    },
    blockRoomsStart(state) {
      state.loading = true;
    },
    blockRoomsSuccess(state) {
      state.loading = false;
    },
    blockRoomsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getRoomBlockingsStart(state) {},
    getRoomBlockingsSuccess(state, action: PayloadAction<IRoomBlocking[]>) {
      state.roomBlockings = action.payload;
    },
    getRoomBlockingsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    patchRoomBlockingStart(state) {
      state.loading = true;
    },
    patchRoomBlockingSuccess(state) {
      state.loading = false;
    },
    patchRoomBlockingFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    deleteRoomBlockingStart(state) {
      state.loading = true;
    },
    deleteRoomBlockingSuccess(state) {
      state.loading = false;
    },
    deleteRoomBlockingFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const reducer = roomsSlice.reducer;
export const actions = roomsSlice.actions;

export interface IGetRoomsFilter {
  fullSearch?: string;
  availableFrom?: string;
  availableTo?: string;
}
export const getRooms = (
  sortFilterPaging: ISortFilterPaging<IGetRoomsFilter> = {}
): AppThunk<Promise<IRoom[]>> => async (dispatch): Promise<IRoom[]> => {
  try {
    dispatch(roomsSlice.actions.getRoomsStart());
    const result = await prismApi.get(
      applyQueryFilters(
        "/companies/me/rooms",
        sortFilterPaging.filter,
        sortFilterPaging.sort,
        sortFilterPaging.paging
      )
    );
    const totalRooms: number = parseInt(
      result.headers.get("x-total-count") as string,
      10
    );
    const rooms = await result.json();
    dispatch(roomsSlice.actions.getRoomsSuccess({ totalRooms, rooms }));
    return rooms;
  } catch (err) {
    dispatch(roomsSlice.actions.getRoomsFailure(err));
    return [];
  }
};

export const createRoom = (room: IRoom | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!room) {
      throw new Error("Cannot create a null room type");
    }

    dispatch(roomsSlice.actions.createRoomStart());
    await prismApi.post("/companies/me/rooms", room);
    dispatch(roomsSlice.actions.createRoomSuccess());
  } catch (err) {
    dispatch(roomsSlice.actions.createRoomFailure(err));
  }
};

export const getRoom = (roomId: string | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!roomId) {
      throw new Error("Cannot get a null room type");
    }

    dispatch(roomsSlice.actions.getRoomStart());
    const response = await prismApi.get(`/companies/me/rooms/${roomId}`);
    dispatch(roomsSlice.actions.getRoomSuccess(await response.json()));
  } catch (err) {
    dispatch(roomsSlice.actions.getRoomFailure(err));
  }
};

export const editRoom = (room: IRoom | null): AppThunk => async (dispatch) => {
  try {
    if (!room) {
      throw new Error("Cannot edit a null room type");
    }

    dispatch(roomsSlice.actions.editRoomStart());
    await prismApi.patch(`/companies/me/rooms/${room.id}`, room);
    dispatch(roomsSlice.actions.editRoomSuccess());
  } catch (err) {
    dispatch(roomsSlice.actions.editRoomFailure(err));
  }
};

export const deleteRoom = (room: IRoom | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!room) {
      throw new Error("Cannot delete a null room type");
    }

    dispatch(roomsSlice.actions.deleteRoomStart());
    await prismApi.delete(`/companies/me/rooms/${room.id}`);
    dispatch(roomsSlice.actions.deleteRoomSuccess());
  } catch (err) {
    dispatch(roomsSlice.actions.deleteRoomFailure(err));
  }
};

export interface IGetRoomBlockingsFilter {
  roomIds?: string[];
  startDate?: DateOrString;
  endDate?: DateOrString;
}
export const getRoomBlockings = (
  sortFilterPaging: ISortFilterPaging<IGetRoomBlockingsFilter> = {}
): AppThunk => async (dispatch) => {
  try {
    dispatch(roomsSlice.actions.getRoomBlockingsStart());
    const response = await prismApi.get(
      applyQueryFilters(
        "/companies/me/room-blockings",
        sortFilterPaging.filter,
        sortFilterPaging.sort,
        sortFilterPaging.paging
      )
    );
    const roomBlockings: IRoomBlocking[] = await response.json();
    dispatch(roomsSlice.actions.getRoomBlockingsSuccess(roomBlockings));
  } catch (err) {
    dispatch(roomsSlice.actions.getRoomBlockingsFailure(err));
  }
};

export const blockRooms = (
  roomBlockings: [{ roomId: string; roomBlockings: IRoomBlocking[] }]
): AppThunk => async (dispatch) => {
  try {
    dispatch(roomsSlice.actions.blockRoomsStart());
    await prismApi.post("/companies/me/room-blockings", roomBlockings);
    dispatch(roomsSlice.actions.blockRoomsSuccess());
  } catch (err) {
    dispatch(roomsSlice.actions.blockRoomsFailure(err));
  }
};

export const patchRoomBlocking = (
  roomBlockingId: string,
  roomBlocking: Partial<IRoomBlocking>
): AppThunk => async (dispatch) => {
  try {
    dispatch(roomsSlice.actions.patchRoomBlockingStart());
    await prismApi.patch(
      `/companies/me/room-blockings/${roomBlockingId}`,
      roomBlocking
    );
    dispatch(roomsSlice.actions.patchRoomBlockingSuccess());
  } catch (err) {
    dispatch(roomsSlice.actions.patchRoomBlockingFailure(err));
  }
};

export const deleteRoomBlocking = (
  roomBlocking: IRoomBlocking
): AppThunk => async (dispatch) => {
  try {
    dispatch(roomsSlice.actions.deleteRoomBlockingStart());
    await prismApi.delete(
      `/companies/me/room-blockings/${roomBlocking.id as string}`
    );
    dispatch(roomsSlice.actions.deleteRoomBlockingSuccess());
  } catch (err) {
    dispatch(roomsSlice.actions.deleteRoomBlockingFailure(err));
  }
};

export const selectors = {
  selectLoading: (state: RootState) => state.admin.rooms.loading,
  selectError: (state: RootState) => state.admin.rooms.error,
  selectCreatingRoom: (state: RootState) => state.admin.rooms.creatingRoom,
  selectEditingRoom: (state: RootState) => state.admin.rooms.editingRoom,
  selectDeletingRoom: (state: RootState) => state.admin.rooms.deletingRoom,
  selectTotalRooms: (state: RootState) => state.admin.rooms.totalRooms,
  selectRooms: (state: RootState) => state.admin.rooms.rooms,
  selectRoom: (state: RootState) => state.admin.rooms.room,
  selectRoomBlockings: (state: RootState) => state.admin.rooms.roomBlockings,
};
