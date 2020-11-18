// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import "@testing-library/jest-dom";

import * as React from "react";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import {
  render,
  ByRoleMatcher,
  ByRoleOptions,
  SelectorMatcherOptions,
  Matcher,
} from "@testing-library/react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { IntlProvider } from "react-intl";
import getMessages from "../../utils/getMessages";
import { Provider } from "react-redux";
import { RootState, Store } from "../store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import MutationObserver from "@sheerun/mutationobserver-shim";
import { fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import { LANGUAGE } from "../interfaces";
window.MutationObserver = MutationObserver;

jest.mock("./appConfig", () => ({
  microservices: {
    prismApi: { baseUrl: "http://dev.usevisitor.com:2050/api/prism" },
    myApp: { baseUrl: "http://dev.usevisitor.com:2000" },
    heimdall: { baseUrl: "http://dev.usevisitor.com:9200/accounts" },
    templatesApi: { baseUrl: "http://dev.usevisitor.com:9200/accounts" },
    partnerApi: { baseUrl: "http://dev.usevisitor.com:9200/accounts" },
  },
}));

export let mockStore: MockStoreEnhanced<Partial<RootState>, {}>;

export interface ICustomRenderOptions {
  initialState?: Partial<RootState>;
  store?: Store;
}
const customRender = (
  ui: any,
  { initialState, ...renderOptions }: ICustomRenderOptions = {}
) => {
  mockStore = configureMockStore<Partial<RootState>>([thunk])(initialState);

  function Wrapper({ children }: any) {
    return (
      <ThemeProvider theme={createMuiTheme()}>
        <IntlProvider messages={{}} locale={LANGUAGE.EN_US}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Provider store={mockStore}>{children}</Provider>
          </MuiPickersUtilsProvider>
        </IntlProvider>
      </ThemeProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export const mockFetch = (response: any) => {
  jest.spyOn(global, "fetch").mockImplementation(
    () =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      }) as any
  );
};

export const selectMuiPickerDate = async (
  dateElement: HTMLElement,
  getAllByRole: (
    text: ByRoleMatcher,
    options?: ByRoleOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement[],
  getByText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement,
  date: "today" | "tomorrow" = "today"
) => {
  const classNameSelected = "MuiPickersDay-daySelected";

  fireEvent.click(dateElement);

  const buttons = getAllByRole("button");
  const currentDayIndex = buttons.findIndex((button: HTMLElement) => {
    return button.className.includes(classNameSelected);
  });
  const finalDayIndex =
    date === "today" ? currentDayIndex : currentDayIndex + 1;

  fireEvent.click(buttons[finalDayIndex]);

  await waitForElementToBeRemoved(() => getByText("2020"));
};

export * from "@testing-library/react";

export { customRender as render };
