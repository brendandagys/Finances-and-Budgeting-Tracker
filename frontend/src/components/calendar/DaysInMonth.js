import React from 'react'

function daysInMonth(year, month) {
  const date = new Date(year, month, 0)
  return date.getDate() // 1-based
}

function firstDayOfMonth(year, month) {
  const date = new Date(year, month - 1, 1)
  return date.getDay() // 0-based
}

const colors = {
  1: '#811701',
  2: '#893101',
  3: '#904F02',
  4: '#986F02',
  5: '#A09102',
  6: '#98A703',
  7: '#398B34',
  8: '#2F9B3B',
  9: '#1BBC4A',
  10: '#06DD58',
}

const DaysInMonth = ({
  year,
  month,
  values,
  setSelectedDate,
  setSelectedValue,
  toggleShow,
}) => {
  // Month is provided 1-based
  return [...Array(daysInMonth(year, month)).keys()].map((day, i) => {
    let styleObject =
      i === 0 ? { gridColumnStart: firstDayOfMonth(year, month) + 1 } : {}

    if (values[i + 1]) {
      styleObject['background'] = colors[values[i + 1]]
    }

    return (
      <span
        className='day'
        key={i}
        style={styleObject}
        onClick={(e) => {
          setSelectedDate(
            `${year}-${month}-${(day + 1).toString().padStart(2, '0')}`
          )
          setSelectedValue((values[i + 1] && values[i + 1].toString()) || '5')
          toggleShow()
        }}
      >
        {day + 1}
      </span>
    )
  })
}

export default DaysInMonth
