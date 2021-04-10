import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getAccountUpdates } from '../actions/accountUpdateActions'
import AccountUpdateForm from '../components/AccountUpdateForm'
import { getCurrentDate } from '../components/PurchaseForm'

const AccountUpdateScreen = () => {
  const [dateFilter, setDateFilter] = useState(() => getCurrentDate())
  const [dateUpdated, setDateUpdated] = useState(true)

  const dispatch = useDispatch()

  const { accountUpdates } = useSelector((state) => state.accountUpdateList)

  useEffect(() => {
    if (dateUpdated) {
      dispatch(getAccountUpdates(dateFilter))
      setDateUpdated(false)
    }
  }, [dispatch, dateFilter, dateUpdated])

  return (
    <>
      <input
        type='date'
        className='form-control mb-2 text-center'
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        onBlur={() => setDateUpdated(true)}
      />
      <hr />
      {accountUpdates.map((account) => {
        return (
          <AccountUpdateForm
            key={account.id}
            accountId={account.id}
            name={account.name}
            value={account.value}
            dateFilter={dateFilter}
          />
        )
      })}
    </>
  )
}

export default AccountUpdateScreen
