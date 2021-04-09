import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { MyInput } from '../fields'
import { getAccountUpdates } from '../actions/accountUpdateActions'
import { getAccounts } from '../actions/accountActions'
import AccountUpdateForm from '../components/AccountUpdateForm'
import { getCurrentDate } from '../components/PurchaseForm'

const AccountUpdateScreen = () => {
  const [dateFilter, setDateFilter] = useState(() => getCurrentDate())

  const dispatch = useDispatch()

  const { accounts } = useSelector((state) => state.accountList)

  const { accountUpdates } = useSelector((state) => state.accountUpdateList)

  useEffect(() => {
    dispatch(getAccounts())
    dispatch(getAccountUpdates())
  }, [dispatch])

  return (
    <>
      <input
        type='date'
        className='form-control mb-2 text-center'
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />
      <hr />
      {accounts.map((account) => {
        return (
          <AccountUpdateForm
            key={account._id}
            accountId={account._id}
            name={account.name}
          />
        )
      })}
    </>
  )
}

export default AccountUpdateScreen
