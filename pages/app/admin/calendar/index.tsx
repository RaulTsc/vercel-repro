import React from "react";
import NoSsr from "../../../../app/components/common/NoSsr/NoSsr";

import dynamic from "next/dynamic";

const CalendarPage = dynamic(
  () => import("../../../../app/components/calendar/CalendarPage/CalendarPage"),
  {
    ssr: false,
  }
);

const Calendar = () => {
  return (
    <NoSsr>
      <CalendarPage />
    </NoSsr>
  );
};

export default Calendar;
