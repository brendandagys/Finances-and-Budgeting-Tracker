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
    <div className='clockbody'>
      <div className='clock'>
        <div ref={hourRef} className='hand hour' data-hour-hand></div>
        <div ref={minuteRef} className='hand minute' data-minute-hand></div>
        <div ref={secondRef} className='hand second' data-second-hand></div>

        <div className='number number1'>1</div>
        <div className='number number2'>2</div>
        <div className='number number3'>3</div>
        <div className='number number4'>4</div>
        <div className='number number5'>5</div>
        <div className='number number6'>6</div>
        <div className='number number7'>7</div>
        <div className='number number8'>8</div>
        <div className='number number9'>9</div>
        <div className='number number10'>10</div>
        <div className='number number11'>11</div>
        <div className='number number12'>12</div>
      </div>
    </div>
  )
}

export default Clock
