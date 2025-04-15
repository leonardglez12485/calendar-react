import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { Navbar } from '../'
import { localizer, getMesagesES } from '../../helpers'
import { useState } from 'react'


const myEventsList = [{
  title: 'Big Meeting',
  note: 'Big Meeting',
  start: new Date(),
  end: addHours( new Date(), 2),
  backgroundColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Leonardo'
  }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const onViewChange = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
    }

    return {
      style
    }
  }

  return (
    <>
    <Navbar />
    <Calendar
      culture='es'
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      // style={{ height: 'calc(100vh - 80px)' }}
      style={{ height: 500 }}
      messages={getMesagesES()}
      eventPropGetter= {eventStyleGetter}
      onView={onViewChange}
      view={lastView}
       
    />
    </>
  )
}
