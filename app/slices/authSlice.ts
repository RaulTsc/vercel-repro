import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { dashboard } from "../helpers/navigation";
import cookieCutter from "cookie-cutter";
import { ACCESS_TOKEN_COOKIE_NAME } from "../helpers/constants";

interface ISliceState {}

const authSlice = createSlice({
  name: "auth",
  initialState: {} as ISliceState,
  reducers: {
    loginStart(state) {},
    loginSuccess(state) {},
    loginFailure(state) {},
  },
});

export interface ILoginCredentials {
  email: string;
  password: string;
}
export const login = (credentials: ILoginCredentials): AppThunk => async (
  dispatch
) => {
  dispatch(authSlice.actions.loginStart());
  try {
    const response = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    cookieCutter.set(ACCESS_TOKEN_COOKIE_NAME, data.accessToken);

    window.location.replace(dashboard());
  } catch (err) {
    dispatch(authSlice.actions.loginFailure());
  }
};

export const reducer = authSlice.reducer;
