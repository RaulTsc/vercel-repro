import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISliceState {
  [key: string]: { isOpen: boolean };
}

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState: {} as ISliceState,
  reducers: {
    toggleDialogByName(
      state,
      action: PayloadAction<{ name: string; isOpen: boolean }>
    ) {
      state[action.payload.name] = {
        isOpen: action.payload.isOpen,
      };
    },
  },
});

export const { toggleDialogByName } = dialogsSlice.actions;
export const reducer = dialogsSlice.reducer;
