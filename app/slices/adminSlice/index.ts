import { combineReducers } from "@reduxjs/toolkit";
import { reducer as roomsReducer } from "./roomsSlice";
import { reducer as settingsReducer } from "./settingsSlice";

export const reducer = combineReducers({
  rooms: roomsReducer,
  settings: settingsReducer,
});
