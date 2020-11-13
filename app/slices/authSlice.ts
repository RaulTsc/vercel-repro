import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { dashboard } from "../helpers/navigation";

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
    window.location.replace(dashboard());
    console.log("got data", data);
  } catch (err) {
    dispatch(authSlice.actions.loginFailure());
  }
};

export const reducer = authSlice.reducer;
