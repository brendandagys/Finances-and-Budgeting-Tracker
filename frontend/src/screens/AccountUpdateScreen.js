import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getAccountUpdates } from '../actions/accountUpdateActions'
import AccountUpdateForm from '../components/AccountUpdateForm'
import { getCurrentDate } from '../components/PurchaseForm'

const AccountUpdateScreen = () => {
  const [dateFilter, setDateFilter] = useState(() => getCurrentDate())
  const [dateUpdated, setDateUpdated] = useState(true) // Run on first render
  const [sum, setSum] = useState(null)

  const dispatch = useDispatch()

  const itemsRef = useRef([])

  const { loading, error, accountUpdates } = useSelector(
    (state) => state.accountUpdateList
  )

  const updateTotal = useCallback(() => {
    if (!error) {
      itemsRef.current = itemsRef.current.slice(0, accountUpdates.length)
      const checkSum = itemsRef.current.reduce(
        (a, b) => a + (b['value'] === '' ? 0 : parseFloat(b['value'])),
        0
      )
      if (!isNaN(checkSum) && checkSum !== 0) {
        setSum('$' + checkSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
      } else setSum('')
    }
  }, [accountUpdates, error])

  useEffect(() => {
    const fetchData = async () => dispatch(getAccountUpdates(dateFilter))

    if (dateUpdated) {
      fetchData()
      setDateUpdated(false)
    }
    updateTotal()
  }, [dispatch, dateFilter, dateUpdated, updateTotal])

  return (
    <>
      <h1 className='text-center'>Account Updates</h1>
      <br />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <>
          <input
            type='date'
            className='form-control mb-2 text-center'
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            onBlur={() => setDateUpdated(true)}
          />
          <hr />

          {accountUpdates.map((account, i) => (
            <AccountUpdateForm
              key={account.id}
              ref={(el) => (itemsRef.current[i] = el)}
              accountId={account.id}
              name={account.name}
              value={account.value}
              dateFilter={dateFilter}
              updateTotal={updateTotal}
            />
          ))}
          <div className='mt-5 text-center'>
            <h1>{sum}</h1>
          </div>
        </>
      )}
    </>
  )
}

export default AccountUpdateScreen
