import React from 'react'

const Weekdays = () => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className='weekrow'>
      {weekdays.map((weekday) => {
        return (
          <span key={weekday} className='weekday'>
            {weekday}
          </span>
        )
      })}
    </div>
  )
}

export default Weekdays
