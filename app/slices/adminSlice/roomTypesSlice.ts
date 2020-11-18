import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";
import { prismApi } from "./../../helpers/api";
import { IRoomType, ISortFilterPaging } from "../../interfaces";
import { applyQueryFilters } from "@raultom/common-helpers/lib/helpers/navigation";

interface ISliceState {
  loading: boolean;
  error: string | null;
  roomTypes: IRoomType[];
  creatingRoomType: boolean;
  editingRoomType: boolean;
  deletingRoomType: boolean;
  roomType: IRoomType | null;
}

const roomTypesSlice = createSlice({
  name: "roomTypes",
  initialState: {
    loading: false,
    error: null,
    roomTypes: [],
    creatingRoomType: false,
    editingRoomType: false,
    deletingRoomType: false,
    roomType: null,
  } as ISliceState,
  reducers: {
    getRoomTypesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRoomTypesSuccess(state, action: PayloadAction<IRoomType[]>) {
      state.roomTypes = action.payload;
      state.loading = false;
      state.error = null;
    },
    getRoomTypesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createRoomTypeStart(state) {
      state.creatingRoomType = true;
      state.error = null;
    },
    createRoomTypeSuccess(state) {
      state.creatingRoomType = false;
      state.error = null;
    },
    createRoomTypeFailure(state, action: PayloadAction<string>) {
      state.creatingRoomType = false;
      state.error = action.payload;
    },
    deleteRoomTypeStart(state) {
      state.deletingRoomType = true;
      state.error = null;
    },
    deleteRoomTypeSuccess(state) {
      state.deletingRoomType = false;
      state.error = null;
    },
    deleteRoomTypeFailure(state, action: PayloadAction<string>) {
      state.deletingRoomType = false;
      state.error = action.payload;
    },
    getRoomTypeStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRoomTypeSuccess(state, action: PayloadAction<IRoomType>) {
      state.loading = false;
      state.roomType = action.payload;
      state.error = null;
    },
    getRoomTypeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editRoomTypeStart(state) {
      state.editingRoomType = true;
      state.error = null;
    },
    editRoomTypeSuccess(state) {
      state.editingRoomType = false;
      state.error = null;
    },
    editRoomTypeFailure(state, action: PayloadAction<string>) {
      state.editingRoomType = false;
      state.error = action.payload;
    },
  },
});

export const reducer = roomTypesSlice.reducer;

export const getRoomTypes = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
): AppThunk<Promise<IRoomType[]>> => async (dispatch): Promise<IRoomType[]> => {
  try {
    dispatch(roomTypesSlice.actions.getRoomTypesStart());
    const result = await prismApi.get(
      applyQueryFilters(
        "/companies/me/room-types",
        sortFilterPaging.filter,
        sortFilterPaging.sort,
        sortFilterPaging.paging
      )
    );
    const roomTypes = await result.json();
    dispatch(roomTypesSlice.actions.getRoomTypesSuccess(roomTypes));
    return roomTypes;
  } catch (err) {
    dispatch(roomTypesSlice.actions.getRoomTypesFailure(err));
    return [];
  }
};

export const createRoomType = (roomType: IRoomType | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!roomType) {
      throw new Error("Cannot create a null room type");
    }

    dispatch(roomTypesSlice.actions.createRoomTypeStart());
    await prismApi.post("/companies/me/room-types", roomType);
    dispatch(roomTypesSlice.actions.createRoomTypeSuccess());
  } catch (err) {
    dispatch(roomTypesSlice.actions.createRoomTypeFailure(err));
  }
};

export const getRoomType = (roomTypeId: string | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!roomTypeId) {
      throw new Error("Cannot get a null room type");
    }

    dispatch(roomTypesSlice.actions.getRoomTypeStart());
    const response = await prismApi.get(
      `/companies/me/room-types/${roomTypeId}`
    );
    dispatch(roomTypesSlice.actions.getRoomTypeSuccess(await response.json()));
  } catch (err) {
    dispatch(roomTypesSlice.actions.getRoomTypeFailure(err));
  }
};

export const editRoomType = (roomType: IRoomType | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!roomType) {
      throw new Error("Cannot edit a null room type");
    }

    dispatch(roomTypesSlice.actions.editRoomTypeStart());
    await prismApi.patch(`/companies/me/room-types/${roomType.id}`, roomType);
    dispatch(roomTypesSlice.actions.editRoomTypeSuccess());
  } catch (err) {
    dispatch(roomTypesSlice.actions.editRoomTypeFailure(err));
  }
};

export const deleteRoomType = (roomType: IRoomType | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!roomType) {
      throw new Error("Cannot delete a null room type");
    }

    dispatch(roomTypesSlice.actions.deleteRoomTypeStart());
    await prismApi.delete(`/companies/me/room-types/${roomType.id}`);
    dispatch(roomTypesSlice.actions.deleteRoomTypeSuccess());
  } catch (err) {
    dispatch(roomTypesSlice.actions.deleteRoomTypeFailure(err));
  }
};

export const selectors = {
  selectLoading: (state: RootState) => state.admin.roomTypes.loading,
  selectError: (state: RootState) => state.admin.roomTypes.error,
  selectCreatingRoomType: (state: RootState) =>
    state.admin.roomTypes.creatingRoomType,
  selectEditingRoomType: (state: RootState) =>
    state.admin.roomTypes.editingRoomType,
  selectDeletingRoomType: (state: RootState) =>
    state.admin.roomTypes.deletingRoomType,
  selectRoomTypes: (state: RootState) => state.admin.roomTypes.roomTypes,
  selectRoomType: (state: RootState) => state.admin.roomTypes.roomType,
};
