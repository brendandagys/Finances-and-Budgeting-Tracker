import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Row, Col, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap'
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

// import { exchangeRates } from 'exchange-rates-api'

// const getExchangeRate = async (base) =>
//   await exchangeRates().latest().base(base).symbols('CAD').fetch()

const getExchangeRate = (base) => {
  return base === 'USD' ? 1.21 : base === 'EUR' ? 1.47 : 1
}

const AccountUpdateScreen = () => {
  const [dateFilter, setDateFilter] = useState(() => getCurrentDate())
  const [dateUpdated, setDateUpdated] = useState(true) // Run on first render
  const [sum, setSum] = useState(0)
  const [sumColor, setSumColor] = useState('#5A5A5A')

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

  const updateTotal = useCallback(async () => {
    setSumColor('#5A5A5A')

    if (!error) {
      itemsRef.current = itemsRef.current.slice(0, accountUpdates.length)

      var USD_TO_CAD = getExchangeRate('USD') // Removed await when removing API
      var EUR_TO_CAD = getExchangeRate('EUR') // Removed await when removing API

      const checkSum = itemsRef.current.reduce((a, b) => {
        let conversionFactor =
          b.attributes.currency.value === 'USD'
            ? USD_TO_CAD
            : b.attributes.currency.value === 'EUR'
            ? EUR_TO_CAD
            : 1
        return (
          a +
          (b.value === ''
            ? 0
            : b.attributes.credit.value === 'true'
            ? -1 * parseFloat(b.value) * conversionFactor
            : parseFloat(b.value) * conversionFactor)
        )
      }, 0)

      if (!isNaN(checkSum)) setSum(checkSum)
      else setSum(0)
    }
  }, [accountUpdates, error])

  useEffect(() => dispatch(getAllAccountUpdates()), [dispatch])

  useEffect(() => {
    if (accountUpdatesAll && accountUpdatesAll.length > 1) {
      var applicableUpdateObjects = accountUpdatesAll.filter(
        (netWorthOnDate) => {
          return netWorthOnDate.date <= dateFilter
        }
      )

      if (applicableUpdateObjects.length > 1) {
        var secondLastAmount = applicableUpdateObjects.slice(-2)[0].Amount
        var lastAmount = applicableUpdateObjects.slice(-1)[0].Amount
      }

      if (lastAmount > secondLastAmount) setSumColor('green')
      else if (lastAmount < secondLastAmount) setSumColor('red')
      else setSumColor('#5A5A5A')
    }
  }, [sum, accountUpdatesAll, dateFilter])

  useEffect(() => {
    const fetchData = async () => dispatch(getAccountUpdates(dateFilter))

    if (dateUpdated) {
      fetchData()
      setDateUpdated(false)
    }
    updateTotal()
  }, [dispatch, dateFilter, dateUpdated, updateTotal])

  const renderTooltip = (props) => (
    <Tooltip className='ml-2' id='button-tooltip' {...props}>
      {sumColor === 'green'
        ? 'Green text indicates that the sum is greater than the day before.'
        : sumColor === 'red'
        ? 'Red text indicates that the sum is less than the day before.'
        : 'Black text indicates that the sum is the same as the previous day.'}
    </Tooltip>
  )

  return (
    <>
      <h1 className='text-center'>Accounts</h1>
      <br />

      <div className='alert alert-primary text-center mx-auto mb-5'>
        <small>
          Track your net worth! Update the values of your accounts and view your
          progress in the chart below.
        </small>
      </div>

      <div className='text-center'>
        <h3>
          Net Worth:{' '}
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <span style={{ color: sumColor }}>
              {sum === 0 ? (
                <Spinner
                  animation='border'
                  role='status'
                  style={{
                    width: '30px',
                    height: '30px',
                    margin: 'auto',
                    display: 'inline-block',
                  }}
                ></Spinner>
              ) : (
                '$' + sum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              )}
            </span>
          </OverlayTrigger>
        </h3>
      </div>
      <br />
      {loadingAll ? (
        <>
          <Loader />
          <br />
          <br />
        </>
      ) : errorAll ? (
        <Message variant='info'>{errorAll}</Message>
      ) : accountUpdatesAll === '' ? (
        <Message variant='info'>
          Populate some values below to see a line chart of your net worth
          trend!
        </Message>
      ) : (
        <Row style={{ height: '480px' }} className='mb-4'>
          <Col className='text-center' xs={12}>
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

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <>
          <div className='text-center'>
            <small>Account Values on Date</small>
          </div>
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
              currency={account.currency}
              updateChart={getAllAccountUpdates}
            />
          ))}
        </>
      )}
    </>
  )
}

export default AccountUpdateScreen
