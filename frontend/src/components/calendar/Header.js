import React from 'react'

const Header = ({ yearMonth }) => {
  return (
    <div className='header'>
      <b>{yearMonth}</b>
    </div>
  )
}

export default Header
