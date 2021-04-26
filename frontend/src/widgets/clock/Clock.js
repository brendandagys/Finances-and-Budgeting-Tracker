import React, { useRef, useEffect } from 'react'
import './style.css'

const Clock = () => {
  const hourRef = useRef(null)
  const minuteRef = useRef(null)
  const secondRef = useRef(null)

  useEffect(() => {
    const setRotation = (element, rotationRatio) => {
      element.style.setProperty('--rotation', rotationRatio * 360)
    }

    const setClock = () => {
      const currentDate = new Date()
      const secondsRatio = currentDate.getSeconds() / 60
      const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
      const hoursRatio = (minutesRatio + currentDate.getHours()) / 12

      setRotation(hourRef.current, hoursRatio)
      setRotation(minuteRef.current, minutesRatio)
      setRotation(secondRef.current, secondsRatio)
    }

    const interval = setInterval(() => {
      setClock()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <body className='clockbody'>
      <div class='clock'>
        <div ref={hourRef} class='hand hour' data-hour-hand></div>
        <div ref={minuteRef} class='hand minute' data-minute-hand></div>
        <div ref={secondRef} class='hand second' data-second-hand></div>

        <div class='number number1'>1</div>
        <div class='number number2'>2</div>
        <div class='number number3'>3</div>
        <div class='number number4'>4</div>
        <div class='number number5'>5</div>
        <div class='number number6'>6</div>
        <div class='number number7'>7</div>
        <div class='number number8'>8</div>
        <div class='number number9'>9</div>
        <div class='number number10'>10</div>
        <div class='number number11'>11</div>
        <div class='number number12'>12</div>
      </div>
    </body>
  )
}

export default Clock
