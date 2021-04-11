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
  4: '#986f02',
  5: '#a09102',
  6: '#98a703',
  7: '#398b34',
  8: '#2f9b3b',
  9: '#1bbc4a',
  10: '#06dd58',
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
          setSelectedValue(values[i + 1] || 5)
          toggleShow()
        }}
      >
        {day + 1}
      </span>
    )
  })
}

export default DaysInMonth
