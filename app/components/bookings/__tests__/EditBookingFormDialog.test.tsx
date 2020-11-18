import React from "react";
import {
  render,
  selectMuiPickerDate,
  mockStore,
  mockFetch,
} from "../../../helpers/setupTests";

import EditBookingFormDialog, {
  EDIT_BOOKING_FORM_DIALOG,
} from "./../EditBookingFormDialog";

const initialState: any = {
  components: {
    [EDIT_BOOKING_FORM_DIALOG]: {
      isOpen: true,
    },
  },
  admin: {
    rooms: {
      rooms: [],
    },
  },
};

const roomsMock = [{ id: "1234", name: "Room 1" }];
mockFetch(roomsMock);

const selectDates = async (
  checkinDate: "today" | "tomorrow",
  checkoutDate: "today" | "tomorrow"
) => {
  const {
    getByLabelText,
    getAllByRole,
    getByText,
    queryByText,
    queryAllByRole,
    debug,
  } = render(
    <EditBookingFormDialog
      initialValues={{ roomBookings: [{}] }}
      loading={false}
      onSubmit={() => ({})}
    />,
    {
      initialState,
    }
  );

  const checkinDateDom = getByLabelText("roomBookings.0.checkinDate");
  const checkoutDateDom = getByLabelText("roomBookings.0.checkoutDate");

  await selectMuiPickerDate(
    checkinDateDom,
    getAllByRole,
    getByText,
    checkinDate
  );
  await selectMuiPickerDate(
    checkoutDateDom,
    getAllByRole,
    getByText,
    checkoutDate
  );

  return { queryByText, queryAllByRole, debug };
};

it("SHOULD render all fields initially", () => {
  const { queryAllByRole } = render(
    <EditBookingFormDialog
      initialValues={{ roomBookings: [{}] }}
      loading={false}
      onSubmit={() => ({})}
    />,
    {
      initialState,
    }
  );
  expect(queryAllByRole("textbox")).toHaveLength(9);
});

describe("WHEN check-in date > checkout date (invalid)", () => {
  it("SHOULD not dispatch any actions", async () => {
    await selectDates("tomorrow", "today");
    expect(mockStore.getActions()).toHaveLength(0);
  });

  it("SHOULD show an error to the user", async () => {
    const { queryByText } = await selectDates("tomorrow", "today");
    expect(
      queryByText("Must be smaller than the checkout date")
    ).toBeInTheDocument();
    expect(
      queryByText("Must be bigger than the check-in date")
    ).toBeInTheDocument();
  });
});

describe("WHEN check-in date < checkout date (valid)", () => {
  it("SHOULD not show an error to the user", async () => {
    const { queryByText } = await selectDates("today", "tomorrow");
    expect(
      queryByText("Must be smaller than the checkout date")
    ).not.toBeInTheDocument();
    expect(
      queryByText("Must be bigger than the check-in date")
    ).not.toBeInTheDocument();
  });
});
