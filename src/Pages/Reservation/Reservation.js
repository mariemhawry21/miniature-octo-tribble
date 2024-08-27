import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Paper, Stack, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { formatDate } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Reservation.css";

function ConfirmationDialog({ open, handleClose, handleConfirm }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

const Reservation = () => {
  const [currentEvents, setcurrentEvents] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [eventToRemove, setEventToRemove] = useState(null);


  let eventGuid = 0;
  function createEventId() {
    return String(eventGuid++);
  }

  const handleDateSelect = (selectInfo) => {
    let title = prompt("من فضلك ادخل الاسم الخاص بالحجز");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    setEventToRemove(clickInfo.event);
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (eventToRemove) {
      eventToRemove.remove();
      setEventToRemove(null);
      setConfirmationOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setEventToRemove(null);
    setConfirmationOpen(false);
  };

  const handleEvents = (events) => {
    setcurrentEvents(events);
  };

  return (
    <Stack direction={"row"}>
      <Paper className="demo-app-sidebar">
        <h2 style={{ textAlign: "center" }}>مواعيد الحجز({currentEvents.length})</h2>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul>
      </Paper>

      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>

      <ConfirmationDialog
        open={confirmationOpen}
        handleClose={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
      />
    </Stack>
  );
};

export default Reservation;