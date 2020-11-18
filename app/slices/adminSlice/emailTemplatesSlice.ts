import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import { templatesApi } from "../../helpers/api";

import { LANGUAGE, EMAIL_TYPE, IEmailTemplate } from "../../interfaces";

interface ISliceState {
  loading: boolean;
  error: string | null;
  emailTemplate: IEmailTemplate | null;
  emailTemplates: IEmailTemplate[];
}

const emailTemplatesSlice = createSlice({
  name: "emailTemplates",
  initialState: {
    loading: false,
    error: null,
    emailTemplate: null,
    emailTemplates: [],
  } as ISliceState,
  reducers: {
    getEmailTemplatesStart(state) {
      state.loading = true;
    },
    getEmailTemplatesSuccess(state, action: PayloadAction<IEmailTemplate[]>) {
      state.loading = false;
      state.emailTemplates = action.payload;
    },
    getEmailTemplatesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getEmailTemplateStart(state) {
      state.loading = true;
    },
    getEmailTemplateSuccess(state, action: PayloadAction<IEmailTemplate>) {
      state.loading = false;
      state.emailTemplate = action.payload;
    },
    getEmailTemplateFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    sendTestEmailStart(state) {
      state.loading = true;
    },
    sendTestEmailSuccess(state) {
      state.loading = false;
    },
    sendTestEmailFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateEmailTemplateStart(state) {
      state.loading = true;
    },
    updateEmailTemplateSuccess(state) {
      state.loading = false;
    },
    updateEmailTemplateFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    publishStart(state) {
      state.loading = true;
    },
    publishSuccess(state) {
      state.loading = false;
    },
    publishFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getEmailTemplates = (): AppThunk => async (dispatch) => {
  try {
    dispatch(emailTemplatesSlice.actions.getEmailTemplatesStart());
    const response = await templatesApi.get("/emails");
    const emailTemplates: IEmailTemplate[] = await response.json();
    dispatch(
      emailTemplatesSlice.actions.getEmailTemplatesSuccess(emailTemplates)
    );
  } catch (err) {
    dispatch(emailTemplatesSlice.actions.getEmailTemplatesFailure(err));
  }
};

export interface IGetEmailTemplateParam {
  type: EMAIL_TYPE;
  language: LANGUAGE;
}
export const getEmailTemplate = ({
  type,
  language,
}: IGetEmailTemplateParam): AppThunk<Promise<IEmailTemplate | null>> => async (
  dispatch
): Promise<IEmailTemplate | null> => {
  try {
    dispatch(emailTemplatesSlice.actions.getEmailTemplateStart());
    const response = await templatesApi.get(`/emails/${type}/${language}`);
    const emailTemplate: IEmailTemplate = await response.json();
    const mjmlHtmlResponse = await templatesApi.post(
      `/emails/${emailTemplate.language}/mjml`,
      { mjml: emailTemplate.mjml }
    );
    const mjmlHtml = await mjmlHtmlResponse.json();
    const finalEmailTemplate = {
      ...emailTemplate,
      mjmlHtml,
    };
    dispatch(
      emailTemplatesSlice.actions.getEmailTemplateSuccess(finalEmailTemplate)
    );

    return finalEmailTemplate;
  } catch (err) {
    dispatch(emailTemplatesSlice.actions.getEmailTemplateFailure(err));
    return null;
  }
};

export const updateEmailTemplate = (
  emailTemplate: Partial<IEmailTemplate>
): AppThunk => async (dispatch) => {
  try {
    dispatch(emailTemplatesSlice.actions.updateEmailTemplateStart());
    await templatesApi.post(
      `/emails/${emailTemplate.type}/${emailTemplate.language}`,
      emailTemplate
    );
    dispatch(emailTemplatesSlice.actions.updateEmailTemplateSuccess());
  } catch (err) {
    dispatch(emailTemplatesSlice.actions.updateEmailTemplateFailure(err));
  }
};

export const sendTestEmail = (
  emailTemplate: IEmailTemplate
): AppThunk => async (dispatch) => {
  try {
    dispatch(emailTemplatesSlice.actions.sendTestEmailStart());
    await templatesApi.post(
      `/test-email/${emailTemplate.type}/${emailTemplate.language}`,
      {}
    );
    dispatch(emailTemplatesSlice.actions.sendTestEmailSuccess());
  } catch (err) {
    dispatch(emailTemplatesSlice.actions.sendTestEmailFailure(err.toString()));
  }
};

export const publishEmailTemplate = (
  emailTemplate: Partial<IEmailTemplate>
): AppThunk => async (dispatch) => {
  try {
    dispatch(emailTemplatesSlice.actions.publishStart());
    await templatesApi.post(
      `/emails/${emailTemplate.type}/${emailTemplate.language}/publish`,
      {}
    );
    dispatch(emailTemplatesSlice.actions.publishSuccess());
  } catch (err) {
    dispatch(emailTemplatesSlice.actions.publishFailure(err));
  }
};

export const reducer = emailTemplatesSlice.reducer;

export const selectors = {
  selectLoading: (state: RootState) => state.admin.emailTemplates.loading,
  selectEmailTemplate: (state: RootState) =>
    state.admin.emailTemplates.emailTemplate,
  selectEmailTemplates: (state: RootState) =>
    state.admin.emailTemplates.emailTemplates,
};
