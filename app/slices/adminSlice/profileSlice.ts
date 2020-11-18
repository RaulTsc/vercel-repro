import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { languageService } from "@raultom/common-helpers/lib/services";
import { RootState, AppThunk } from "../../store";
import cookieCutter from "cookie-cutter";

import { heimdall } from "../../helpers/api";
import { IUser } from "../../interfaces";
import {
  ACCESS_TOKEN_COOKIE_DOMAIN,
  ACCESS_TOKEN_COOKIE_PATH,
} from "../../helpers/constants";

interface ISliceState {
  loading: boolean;
  error: string | null;
}

const profileSlice = createSlice({
  name: "common",
  initialState: {
    loading: false,
    error: null,
  } as ISliceState,
  reducers: {
    updateUserStart(state) {
      state.loading = true;
    },
    updateUserSuccess(state) {
      state.loading = false;
    },
    updateUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const updateUser = (user: IUser): AppThunk => async (dispatch) => {
  try {
    dispatch(profileSlice.actions.updateUserStart());
    await heimdall.put(`/users/me`, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      language: user.language,
    });

    languageService.setCurrentLanguage({
      language: user.language,
    });

    cookieCutter.set("accept-language", user.language, {
      domain: ACCESS_TOKEN_COOKIE_DOMAIN,
      path: ACCESS_TOKEN_COOKIE_PATH,
      maxAge: 60 * 60 * 24 * 365,
    });

    if (window && window.location) {
      window.location.reload();
    }

    dispatch(profileSlice.actions.updateUserSuccess());
  } catch (err) {
    dispatch(profileSlice.actions.updateUserFailure(err));
  }
};

export const reducer = profileSlice.reducer;

export const selectors = {
  selectLoading: (state: RootState) => state.admin.profile.loading,
};
