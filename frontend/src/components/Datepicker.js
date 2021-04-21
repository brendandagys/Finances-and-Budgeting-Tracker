import React from 'react'
import { Col } from 'react-bootstrap'

const Datepicker = ({ dateValue, setDateValue, label }) => {
  return (
    <Col className='text-center'>
      <label>
        <b>{label}</b>
      </label>
      <input
        type='date'
        className='form-control mb-4 text-center'
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
        // onBlur={() => setDateUpdated(true)}
      />
    </Col>
  )
}

export default Datepicker
