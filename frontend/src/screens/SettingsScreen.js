import React from 'react'
import { useSelector } from 'react-redux'
import Message from '../components/Message'
import PurchaseCategoryTable from '../components/PurchaseCategoryTable'
import AccountTable from '../components/AccountTable'

const SettingsScreen = ({ match, history }) => {
  const { error } = useSelector((state) => state.purchaseCategoryList)

  return (
    <>
      <h1 className='text-center'>Settings</h1>
      <br />
      {error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <>
          <div className='my-3'>
            <PurchaseCategoryTable />
          </div>
          <div className='mt-5'>
            <AccountTable />
          </div>
        </>
      )}
    </>
  )
}

export default SettingsScreen
