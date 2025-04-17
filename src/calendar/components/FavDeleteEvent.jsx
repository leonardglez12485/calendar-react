
import { useCalendarStore } from "../../hooks";


export const FavDeleteEvent = () => {

   const { startDeletingEvent, hasEventSelected} = useCalendarStore();


   const handleClickDelete = () => {
      startDeletingEvent();
   }


  return (
    <button
      hidden={!hasEventSelected}
      className="btn btn-danger fab-danger"
      onClick={handleClickDelete}
    >
        <i className="fas fa-trash-alt"></i>
   </button>    
  )
}
