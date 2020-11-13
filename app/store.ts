import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, Action } from "redux";
import { useDispatch } from "react-redux";
import { reducer as componentsReducer } from "./slices/componentsSlice";
import { reducer as commonReducer } from "./slices/commonSlice";
import { reducer as adminReducer } from "./slices/adminSlice";
// import { reducer as publicReducer } from "./public/publicSlice";

export const reducer = combineReducers({
  components: componentsReducer,
  common: commonReducer,
  admin: adminReducer,
  // public: publicReducer,
});

const store = configureStore({
  reducer,
  devTools: true,
});

export type Store = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
