import * as uuid from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import getConfig from "next/config";

import { myApp, heimdall, prismApi } from "./../helpers/api";
import { getUrlWithSubdomain } from "@raultom/common-helpers/lib/helpers/navigation";
import { ICompany, IUser } from "../interfaces";

type SnackbarSeverity = "success" | "info" | "warning" | "error" | undefined;
interface ISliceState {
  loading: boolean;
  user: IUser | null;
  company: ICompany | null;
  navigationDrawerOpen: boolean;
  snackbarOpen: boolean;
  snackbarMessageLocale: string | null;
  snackbarMessageValues: any;
  snackbarSeverity: SnackbarSeverity;
  error: string | null;
}

const commonSlice = createSlice({
  name: "common",
  initialState: {
    loading: false,
    user: null,
    company: null,
    navigationDrawerOpen: false,
    snackbarOpen: false,
    snackbarMessageLocale: null,
    snackbarMessageValues: null,
    snackbarSeverity: undefined,
    error: null,
  } as ISliceState,
  reducers: {
    toggleNavigationDrawer(state, action: PayloadAction<{ isOpen: boolean }>) {
      state.navigationDrawerOpen = Boolean(action.payload.isOpen);
    },
    toggleSnackbar(
      state,
      action: PayloadAction<{
        isOpen: boolean;
        messageLocale?: string;
        messageValues?: any;
        severity?: SnackbarSeverity;
      }>
    ) {
      if (
        Boolean(action.payload.isOpen) &&
        Boolean(action.payload.messageLocale)
      ) {
        state.snackbarOpen = Boolean(action.payload.isOpen);
        state.snackbarMessageLocale = action.payload.messageLocale || null;
        state.snackbarMessageValues = action.payload.messageValues || null;
        state.snackbarSeverity = action.payload.severity;
      } else {
        state.snackbarOpen = false;
        state.snackbarMessageLocale = null;
        state.snackbarSeverity = undefined;
      }
    },
    logoutSuccess(state) {},
    logoutError(state) {},
    getCurrentUserStart(state) {
      state.loading = true;
    },
    getCurrentUserSuccess(state, action: PayloadAction<IUser>) {
      state.loading = false;
      state.user = action.payload;
    },
    getCurrentUserFailure(state, _action: PayloadAction<string>) {
      state.loading = false;
    },
    getCurrentCompanyStart(state) {
      state.loading = true;
    },
    getCurrentCompanySuccess(state, action: PayloadAction<ICompany>) {
      state.loading = false;
      state.company = action.payload;
    },
    getCurrentCompanyFailure(state, _action: PayloadAction<string>) {
      state.loading = false;
    },
    uploadFileStart(state) {
      state.loading = true;
    },
    uploadFileSuccess(state, _action: PayloadAction<any>) {
      state.loading = false;
    },
    uploadFileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    changeCurrentCompanyStart(state) {
      state.loading = true;
    },
    changeCurrentCompanySuccess(state) {
      state.loading = false;
    },
    changeCurrentCompanyFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const logout = (redirectUrl: string = ""): AppThunk => async (
  dispatch
) => {
  try {
    await fetch("/api/logout", {
      method: "post",
    });
    dispatch(commonSlice.actions.logoutSuccess());
    window.location.href = "/login";
  } catch (err) {
    dispatch(commonSlice.actions.logoutError());
  }
};

export const getCurrentUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(commonSlice.actions.getCurrentUserStart());
    const response = await heimdall.get(`/userinfo`);
    const user = await response.json();
    dispatch(commonSlice.actions.getCurrentUserSuccess(user));
  } catch (err) {
    dispatch(commonSlice.actions.getCurrentUserFailure(err));
  }
};

export const getCurrentCompany = (): AppThunk => async (dispatch) => {
  try {
    dispatch(commonSlice.actions.getCurrentCompanyStart());
    const response = await heimdall.get("/admin/company/current");
    const company: ICompany = await response.json();
    dispatch(commonSlice.actions.getCurrentCompanySuccess(company));
  } catch (err) {
    dispatch(commonSlice.actions.getCurrentCompanyFailure(err));
  }
};

export const changeCurrentCompany = (companyId: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(commonSlice.actions.changeCurrentCompanyStart());
    await heimdall.post(`/admin/company/current/${companyId}`, {});
    dispatch(commonSlice.actions.changeCurrentCompanySuccess());
  } catch (err) {
    dispatch(commonSlice.actions.changeCurrentCompanyFailure(err));
  }
};

export interface IBlob extends Blob {
  name?: string;
  preview?: string;
  order?: number;
  resourceId?: string;
}
interface IBlobWithMetadataExtended {
  file: IBlob;
  resourcePath: string;
  signedRequest: string;
}
interface IOptions {
  baseResourcePath: string;
}
export const uploadFile = (file: IBlob, options: IOptions): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(commonSlice.actions.uploadFileStart());
    const resourceId: string = file.resourceId || uuid.v4();
    const signPayload = [
      {
        fileType: file.type,
        key: `${options.baseResourcePath}/${resourceId}`,
      },
    ];
    const response = await prismApi.post("/file/sign", signPayload);
    const signedRequests: string[] = await response.json();
    const fileToBeUploaded: IBlobWithMetadataExtended = {
      file,
      resourcePath: signPayload[0].key,
      signedRequest: signedRequests[0],
    };

    await fetch(fileToBeUploaded.signedRequest, {
      method: "put",
      headers: {
        "Content-Type": fileToBeUploaded.file.type,
      },
      body: file,
    });

    const result = {
      name: fileToBeUploaded.file.name,
      resourcePath: fileToBeUploaded.resourcePath,
      size: fileToBeUploaded.file.size,
      type: fileToBeUploaded.file.type,
      order: fileToBeUploaded.file.order,
    };
    dispatch(commonSlice.actions.uploadFileSuccess(result));
    return result;
  } catch (err) {
    dispatch(commonSlice.actions.uploadFileFailure(err.toString()));
    return null;
  }
};

export const { toggleNavigationDrawer, toggleSnackbar } = commonSlice.actions;

export const reducer = commonSlice.reducer;

export const selectors = {
  selectLoading: (state: RootState) => state.common.loading,
  selectUser: (state: RootState) => state.common.user,
  selectCompany: (state: RootState) => state.common.company,
  selectIsAdmin: (state: RootState) => Boolean(state.common.user),
  selectNavigationDrawerOpen: (state: RootState) =>
    state.common.navigationDrawerOpen,
  selectSnackbarOpen: (state: RootState) => state.common.snackbarOpen,
  selectSnackbarMessageLocale: (state: RootState) =>
    state.common.snackbarMessageLocale,
  selectSnackbarMessageValues: (state: RootState) =>
    state.common.snackbarMessageValues,
  selectSnackbarSeverity: (state: RootState) => state.common.snackbarSeverity,
};
