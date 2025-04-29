import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertDateString } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Actualizar
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        Swal.fire("Updated", "Event updated succesfully", "success");
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // Crear
      const { data } = await calendarApi.post("/events", calendarEvent);
      Swal.fire("Created", "Event created succesfully", "success");
      dispatch(
        onAddNewEvent({ ...calendarEvent, id: data.eventCreated.id, user })
      );
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al guardar",
        error.response.data.message || "Error al guardar el evento",
        "error"
      );
    }
  };
  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
      Swal.fire("Deleted", "Event deleted succesfully", "success");
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al guardar",
        error.response.data.message || "Error al guardar el evento",
        "error"
      );
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertDateString(data.data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //*Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
