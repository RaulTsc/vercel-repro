import { combineReducers } from "@reduxjs/toolkit";
import { reducer as roomsReducer } from "./roomsSlice";
import { reducer as settingsReducer } from "./settingsSlice";
import { reducer as dashboardReducer } from "./dashboardSlice";
import { reducer as calendarReducer } from "./calendarSlice";
import { reducer as bookingsReducer } from "./bookingsSlice";

export const reducer = combineReducers({
  rooms: roomsReducer,
  settings: settingsReducer,
  dashboard: dashboardReducer,
  calendar: calendarReducer,
  bookings: bookingsReducer,
});
