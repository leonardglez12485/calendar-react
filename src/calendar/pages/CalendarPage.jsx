import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Navbar,
  CalendarEventBox,
  CalendarModal,
  FavNewAdd,
  FavDeleteEvent,
} from "../";
import { localizer, getMesagesES } from "../../helpers";
import { useEffect, useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const onViewChange = (e) => {
    localStorage.setItem("lastView", e);
    setLastView(e);
  };

  const onDoubleClick = () => {
    //console.log({ doubleClick: e });
    openDateModal();
  };

  const onSelect = (e) => {
    setActiveEvent(e);
  };

  const eventStyleGetter = (event) => {
    const myEvents = user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: myEvents ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
    };

    return {
      style,
    };
  };

  useEffect(() => {
    startLoadingEvents();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        // defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        // style={{ height: 'calc(100vh - 80px)' }}
        style={{ height: 500 }}
        messages={getMesagesES()}
        eventPropGetter={eventStyleGetter}
        onView={onViewChange}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        view={lastView}
        components={{
          event: CalendarEventBox,
        }}
      />
      <CalendarModal />
      <FavNewAdd />
      <FavDeleteEvent />
    </>
  );
};
