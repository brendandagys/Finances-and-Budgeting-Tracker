import React from 'react'
import Clock from '../widgets/clock/Clock'
import Calculator from '../widgets/calculator/Calculator'

const WidgetsScreen = ({ match, history }) => {
  return (
    <>
      <h1 className='text-center'>Widgets</h1>
      <br />

      <div className='alert alert-secondary text-center mx-auto'>
        <small>
          I built two widgets using vanilla JavaScript (HTML + CSS +
          JavaScript). It was a great and challenging exercise to convert these
          both into a form that could work with React, using Hooks to translate
          the logic.
        </small>
      </div>

      <Clock />
      <br />
      <Calculator />
    </>
  )
}

export default WidgetsScreen
