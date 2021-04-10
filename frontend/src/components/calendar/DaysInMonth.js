import React from 'react'

function daysInMonth(year, month) {
  const date = new Date(year, month, 0)
  return date.getDate() // 1-based
}

function firstDayOfMonth(year, month) {
  const date = new Date(year, month - 1, 1)
  return date.getDay() // 0-based
}

const DaysInMonth = ({ year, month }) => {
  // Month is provided 1-based
  return [...Array(daysInMonth(year, month)).keys()].map((day, i) => {
    return (
      <span
        className='day'
        key={i}
        style={
          i === 0 ? { gridColumnStart: firstDayOfMonth(year, month) + 1 } : {}
        }
      >
        {day + 1}
      </span>
    )
  })
}

export default DaysInMonth
