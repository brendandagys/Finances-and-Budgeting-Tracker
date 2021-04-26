import React from 'react'
import Clock from '../widgets/clock/Clock'
import Calculator from '../widgets/calculator/Calculator'

const WidgetsScreen = ({ match, history }) => {
  return (
    <>
      <h1 className='text-center'>Widgets</h1>
      <br />

      <Clock />
      <br />
      <Calculator />
    </>
  )
}

export default WidgetsScreen
