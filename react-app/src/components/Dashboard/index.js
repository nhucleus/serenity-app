import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "./Dashboard.css";
import "react-big-calendar/lib/css/react-big-calendar.css"


const localizer = momentLocalizer(moment);

function Dashboard() {
  return (
    <>
      <Calendar
        localizer={localizer}
        events={["Um what goes here?"]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
      />
    </>)
}

export default Dashboard;