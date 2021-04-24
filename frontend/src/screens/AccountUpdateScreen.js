import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  getAccountUpdates,
  getAllAccountUpdates,
} from '../actions/accountUpdateActions'
import AccountUpdateForm from '../components/AccountUpdateForm'
import { getCurrentDate } from '../components/PurchaseForm'
import MyLineChart from '../components/LineChart'

const AccountUpdateScreen = () => {
  const [dateFilter, setDateFilter] = useState(() => getCurrentDate())
  const [dateUpdated, setDateUpdated] = useState(true) // Run on first render
  const [sum, setSum] = useState(null)

  const dispatch = useDispatch()

  const itemsRef = useRef([])

  const { loading, error, accountUpdates } = useSelector(
    (state) => state.accountUpdateList
  )

  const {
    loading: loadingAll,
    error: errorAll,
    accountUpdates: accountUpdatesAll,
  } = useSelector((state) => state.accountUpdateListAll)

  const updateTotal = useCallback(() => {
    if (!error) {
      itemsRef.current = itemsRef.current.slice(0, accountUpdates.length)
      const checkSum = itemsRef.current.reduce(
        (a, b) =>
          a +
          (b.value === ''
            ? 0
            : b.attributes.credit.value === 'true'
            ? -1 * parseFloat(b.value)
            : parseFloat(b.value)),
        0
      )
      if (!isNaN(checkSum) && checkSum !== 0) {
        setSum('$' + checkSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
      } else setSum('')
    }
  }, [accountUpdates, error])

  useEffect(() => dispatch(getAllAccountUpdates()), [dispatch])

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
      <h1 className='text-center'>Accounts</h1>
      <br />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <>
          {loadingAll ? (
            <>
              <Loader />
              <br />
            </>
          ) : errorAll ? (
            <Message variant='secondary'>{errorAll}</Message>
          ) : (
            <Row style={{ height: '480px' }} className='mb-4'>
              <Col className='text-center' xs={12}>
                <h3>Net Worth</h3>
                <MyLineChart
                  data={accountUpdatesAll}
                  stroke={'green'}
                  bottomMargin={47}
                  dy={27}
                  ml={8}
                />
              </Col>
            </Row>
          )}
          <hr />

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
              credit={account.credit ? 'true' : 'false'}
              updateChart={getAllAccountUpdates}
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
