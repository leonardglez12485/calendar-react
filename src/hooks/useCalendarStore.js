import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      // Actualizar
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Crear
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };
  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent());
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
  };
};
