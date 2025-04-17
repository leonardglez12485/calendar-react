
import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore} from '../../hooks';




const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const [formSubmited, setformSubmited] = useState(false)

  const { isDateModalOpen, closeDateModal } = useUiStore();

  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formValues, setFormValues] = useState({
    title: 'Event Title',
    notes: 'Description',
    start: new Date(),
    end: addHours(new Date(), 2),
  })

  const titleClass = useMemo(() => {
    if(!formSubmited) return '';
    return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid';
  },
  [formValues.title, formSubmited])

  useEffect(() => {

    if(activeEvent !== null) {
      setFormValues({
        ...activeEvent,
      })
    }
    
  }, [activeEvent])
  

  const onCloseModal = () => {
    closeDateModal();
  }

  const onnInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onSubmit = async(event) => {
    event.preventDefault();
    setformSubmited(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid dates',
        showConfirmButton: true,
        timer: 2500,
      });
      return;
    }
    if (formValues.title.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Title is required',
        showConfirmButton: true,
        timer: 2500,
      });
      return;
    }
    await startSavingEvent(formValues);
    closeDateModal();
    setformSubmited(false);
   
  }

  return (
    <Modal
    isOpen={isDateModalOpen}
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
    onRequestClose={onCloseModal}
    style={customStyles}
    >
   
   <h1> New Event </h1>
<hr />
<form className="container" onSubmit={onSubmit}>

    <div className="form-group mb-2">
        <label>Start Time</label>
        <br />
        <DatePicker
        selected={formValues.start}
        className='form-control'
        onChange={(event) => onDateChange(event, 'start')}
        dateFormat="Pp"
        showTimeSelect
        />
    </div>

    <div className="form-group mb-2">
        <label>End Time</label>
        <br />
        <DatePicker
        selected={formValues.end}
        minDate={formValues.start}
        className='form-control'
        onChange={(event) => onDateChange(event, 'end')}
        dateFormat="Pp"
        showTimeSelect
        />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Title and Notes</label>
        <input 
            type="text" 
            className={`form-control ${titleClass}`}
            placeholder="Event Title"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onnInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Text a short description</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onnInputChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Aditional Info</small>
    </div>

    <button
        type="submit"

        className="btn btn-primary"
    >
        <i className="far fa-save"></i>
        <span> Save</span>
    </button>

</form>

    </Modal>
  )
}
