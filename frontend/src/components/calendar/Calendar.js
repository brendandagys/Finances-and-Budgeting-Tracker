import React from 'react'
import '../../calendar.css'

import Header from './Header'
import Weekdays from './Weekdays'
import DaysInMonth from './DaysInMonth'

const Calendar = ({ year, month }) => {
  return (
    <>
      <div className='calendar-container mx-auto'>
        <div className='calendar'>
          <Header yearMonth='April 2021' />
          <Weekdays />
          <DaysInMonth year='2021' month='04' />
        </div>
      </div>
    </>
  )
}

export default Calendar
