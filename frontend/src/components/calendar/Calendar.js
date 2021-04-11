import React from 'react'
import '../../calendar.css'

import Header from './Header'
import Weekdays from './Weekdays'
import DaysInMonth from './DaysInMonth'

const months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

const Calendar = ({
  year,
  month,
  values,
  setSelectedDate,
  setSelectedValue,
  toggleShow,
}) => {
  return (
    <>
      <div className='calendar-container mx-auto my-2'>
        <div className='calendar'>
          <Header yearMonth={`${months[month]} ${year}`} />
          <Weekdays />
          <DaysInMonth
            year={year}
            month={month}
            values={values}
            setSelectedDate={setSelectedDate}
            setSelectedValue={setSelectedValue}
            toggleShow={toggleShow}
          />
        </div>
      </div>
    </>
  )
}

export default Calendar
