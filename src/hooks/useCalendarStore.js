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
      dispatch(onUpdateEvent({ ...calendarEvent, user}));
      return;
    } 
      // Crear
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.eventCreated.id, user }));
   } catch (error) {
    console.log(error)
    Swal.fire(
      "Error al guardar",
      error.response.data.message || "Error al guardar el evento",
      "error"
    );
   }
  };
  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
     const { data } = await calendarApi.get("/events");
     const events = convertDateString(data.data.events);
     dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error)
    }
  }

  return {
    //*Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  };
};
