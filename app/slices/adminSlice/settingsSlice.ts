import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import { heimdall, partnerApi } from "../../helpers/api";
import { ICompany, IPartner } from "../../interfaces";

interface ISliceState {
  loading: boolean;
  company: ICompany | null;
  partner: IPartner | null;
  error: string | null;
}

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    loading: false,
    error: null,
    company: null,
    partner: null,
  } as ISliceState,
  reducers: {
    updateCompanyStart(state) {
      state.loading = true;
    },
    updateCompanySuccess(state) {
      state.loading = false;
    },
    updateCompanyFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getCompanyStart(state) {
      state.loading = true;
    },
    getCompanySuccess(state, action: PayloadAction<ICompany>) {
      state.loading = false;
      state.company = action.payload;
    },
    getCompanyFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getCurrentPartnerStart(state) {
      state.loading = true;
    },
    getCurrentPartnerSuccess(state, action: PayloadAction<IPartner>) {
      state.loading = false;
      state.partner = action.payload;
    },
    getCurrentPartnerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateCurrentPartnerStart(state) {
      state.loading = true;
    },
    updateCurrentPartnerSuccess(state) {
      state.loading = false;
    },
    updateCurrentPartnerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createCompanyStart(state) {
      state.loading = true;
    },
    createCompanySuccess(state) {
      state.loading = false;
    },
    createCompanyFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getCompanyInformation = (): AppThunk => async (dispatch) => {
  try {
    dispatch(bookingsSlice.actions.getCompanyStart());
    const response = await heimdall.get("/admin/company/current");
    const company: ICompany = await response.json();
    dispatch(bookingsSlice.actions.getCompanySuccess(company));
  } catch (err) {
    dispatch(bookingsSlice.actions.getCompanyFailure(err));
  }
};

export const updateCompanyInformation = (
  company: Partial<ICompany>
): AppThunk => async (dispatch) => {
  try {
    dispatch(bookingsSlice.actions.updateCompanyStart());
    await heimdall.put(`/admin/company/current`, company);
    dispatch(bookingsSlice.actions.updateCompanySuccess());
  } catch (err) {
    dispatch(bookingsSlice.actions.updateCompanyFailure(err));
  }
};

export const getCurrentPartner = (): AppThunk => async (dispatch) => {
  try {
    dispatch(bookingsSlice.actions.getCurrentPartnerStart());
    const response = await partnerApi.get("/partners/current");
    const partner: IPartner = await response.json();
    dispatch(bookingsSlice.actions.getCurrentPartnerSuccess(partner));
  } catch (err) {
    dispatch(bookingsSlice.actions.getCurrentPartnerFailure(err));
  }
};

export const updateCurrentPartner = (
  partner: Partial<IPartner>
): AppThunk => async (dispatch) => {
  try {
    dispatch(bookingsSlice.actions.updateCurrentPartnerStart());
    await partnerApi.put("/partners/current", partner);
    dispatch(bookingsSlice.actions.updateCurrentPartnerSuccess());
  } catch (err) {
    dispatch(bookingsSlice.actions.updateCurrentPartnerFailure(err));
  }
};

export const createCompany = (company: Partial<IPartner>): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(bookingsSlice.actions.createCompanyStart());
    await heimdall.post("/admin/company/current/companies", company);
    dispatch(bookingsSlice.actions.createCompanySuccess());
  } catch (err) {
    dispatch(bookingsSlice.actions.createCompanyFailure(err));
  }
};

export const reducer = bookingsSlice.reducer;

export const selectors = {
  selectLoading: (state: RootState) => state.admin.settings.loading,
  selectCompany: (state: RootState) => state.admin.settings.company,
  selectPartner: (state: RootState) => state.admin.settings.partner,
};
