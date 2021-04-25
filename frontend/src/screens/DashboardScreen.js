import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Card } from 'react-bootstrap'
import { getPurchases } from '../actions/purchaseActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Datepicker from '../components/Datepicker'
import MyLineChart from '../components/LineChart'
import moment from 'moment'

const DashboardScreen = () => {
  const [fromDate, setFromDate] = useState(() => moment().format('YYYY-MM-01'))
  const [toDate, setToDate] = useState(() => moment().format('YYYY-MM-DD'))

  const [applicableCategories, setApplicableCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const [applicablePurchases, setApplicablePurchases] = useState([])
  const [finalPurchases, setFinalPurchases] = useState([])

  const [sum, setSum] = useState(0)
  const [count, setCount] = useState(0)

  const [lineChartDataDaily, setLineChartDataDaily] = useState([])
  const [lineChartDataWeekly, setLineChartDataWeekly] = useState([])
  const [lineChartDataMonthly, setLineChartDataMonthly] = useState([])

  const [sortedPurchases, setSortedPurchases] = useState([])
  var [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const dispatch = useDispatch()

  const { loading, error, purchases } = useSelector(
    (state) => state.purchaseList
  )

  useEffect(() => {
    dispatch(getPurchases())
  }, [dispatch])

  useEffect(() => {
    if (fromDate > toDate) setFromDate(toDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate])

  useEffect(() => {
    if (fromDate > toDate) setToDate(fromDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toDate])

  useEffect(() => {
    setApplicablePurchases(
      purchases &&
        purchases.filter(({ timestamp }) => {
          let date = moment(timestamp).format('YYYY-MM-DD')
          return date >= fromDate && date <= toDate
        })
    )
  }, [purchases, fromDate, toDate])

  useEffect(() => {
    let tempArray = []
    applicablePurchases &&
      applicablePurchases.forEach((purchase) =>
        tempArray.push(purchase.category)
      )
    // console.log([...new Set(tempArray)])
    setApplicableCategories([...new Set(tempArray)])
    if (selectedCategories.length === 0)
      // Page load only
      setSelectedCategories([...new Set(tempArray)])
    // console.log(selectedCategories)
  }, [applicablePurchases, selectedCategories.length])

  useEffect(() => {
    applicablePurchases &&
      setFinalPurchases(
        applicablePurchases.filter((purchase) =>
          selectedCategories.includes(purchase.category)
        )
      )
  }, [applicablePurchases, selectedCategories])

  useEffect(() => {
    setSum(
      finalPurchases
        .reduce((a, b) => a + b.amount, 0)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    )
    setCount(finalPurchases.length)

    setSortedPurchases(
      finalPurchases.sort((a, b) =>
        a.timestamp > b.timestamp ? 1 : b.timestamp > a.timestamp ? -1 : 0
      )
    )
  }, [finalPurchases])

  useEffect(() => {
    if (sortedPurchases.length > 0) {
      // console.log(sortedPurchases)
      setStartDate(moment(sortedPurchases[0].timestamp).format('YYYY-MM-DD'))
      setEndDate(
        sortedPurchases[0] &&
          moment(sortedPurchases.slice(-1)[0].timestamp).format('YYYY-MM-DD')
      )
    }
  }, [sortedPurchases])

  useEffect(() => {
    if (startDate && endDate) {
      var datesArray = []

      var startDateCopy = startDate

      while (startDateCopy <= endDate) {
        datesArray.push(startDateCopy)

        startDateCopy = moment(startDateCopy)
          .add(1, 'day')
          .format()
          .slice(0, 10)
      }

      setLineChartDataDaily([])

      for (const date of datesArray) {
        const amount = sortedPurchases
          .filter(
            ({ timestamp }) => moment(timestamp).format('YYYY-MM-DD') === date
          )
          .reduce((a, b) => a + b.amount, 0)

        setLineChartDataDaily((prevState) => {
          return [...prevState, { date, Amount: parseFloat(amount.toFixed(2)) }]
        })
      }
    }
  }, [startDate, endDate, sortedPurchases])

  useEffect(() => {
    if (startDate && endDate) {
      var datesArray = []

      var startDateCopy = startDate

      while (startDateCopy <= endDate) {
        datesArray.push(startDateCopy)
        startDateCopy = moment(startDateCopy)
          .add(1, 'week')
          .format()
          .slice(0, 10)
      }

      setLineChartDataWeekly([])

      datesArray.forEach((date, index) => {
        const amount = sortedPurchases
          .filter(({ timestamp }) => {
            timestamp = moment(timestamp).format('YYYY-MM-DD')

            if (datesArray[index + 1] === undefined) {
              return timestamp.slice(0, 10) >= date
            } else
              return (
                timestamp.slice(0, 10) >= date &&
                timestamp.slice(0, 10) < datesArray[index + 1]
              )
          })
          .reduce((a, b) => a + b.amount, 0)

        setLineChartDataWeekly((prevState) => {
          return [
            ...prevState,
            {
              date: `${date} - ${
                datesArray[index + 1] === undefined
                  ? endDate
                  : moment(datesArray[index + 1])
                      .add(-1, 'day')
                      .format('YYYY-MM-DD')
              }`,
              Amount: parseFloat(amount.toFixed(2)),
            },
          ]
        })
      })
    }
  }, [startDate, endDate, sortedPurchases])

  useEffect(() => {
    if (startDate && endDate) {
      var datesArray = []

      var startDateCopy = startDate

      while (startDateCopy <= endDate) {
        datesArray.push(startDateCopy)
        startDateCopy = moment(startDateCopy)
          .add(1, 'month')
          .format()
          .slice(0, 10)
      }

      setLineChartDataMonthly([])

      datesArray.forEach((date, index) => {
        const amount = sortedPurchases
          .filter(({ timestamp }) => {
            timestamp = moment(timestamp).format('YYYY-MM-DD')

            if (datesArray[index + 1] === undefined) {
              return timestamp >= date
            } else return timestamp >= date && timestamp < datesArray[index + 1]
          })
          .reduce((a, b) => a + b.amount, 0)

        setLineChartDataMonthly((prevState) => {
          return [
            ...prevState,
            {
              date: `${date} - ${
                datesArray[index + 1] === undefined
                  ? endDate
                  : moment(datesArray[index + 1])
                      .add(-1, 'day')
                      .format('YYYY-MM-DD')
              }`,
              Amount: parseFloat(amount.toFixed(2)),
            },
          ]
        })
      })
    }
  }, [startDate, endDate, sortedPurchases])

  return (
    <>
      {/* {console.log(purchases)} */}
      <h1 className='text-center'>Dashboard</h1>
      <br />

      <div className='alert alert-primary text-center mx-auto'>
        <small>
          View customized spending patterns in the daily, weekly, and monthly
          charts below!
        </small>
      </div>

      <Container>
        <Row>
          <Datepicker
            dateValue={fromDate}
            setDateValue={setFromDate}
            label='From'
          />
          <Datepicker dateValue={toDate} setDateValue={setToDate} label='To' />
        </Row>
      </Container>

      {loading ? (
        <>
          <br />
          <Loader />
        </>
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : purchases.length === 0 ? (
        <Message variant='info'>You have not yet entered any purchases</Message>
      ) : (
        <>
          <Container>
            <Row>
              {applicableCategories.map((name) => (
                <Col key={name} className='text-center px-0 m-2'>
                  <button
                    id={name}
                    type='button'
                    className={`btn btn-sm ${
                      selectedCategories.includes(name)
                        ? 'btn-info'
                        : 'btn-secondary'
                    }`}
                    style={{ width: '100%' }}
                    onClick={(e) => {
                      if (selectedCategories.includes(e.target.id)) {
                        setSelectedCategories((prevState) =>
                          prevState.filter(
                            (category) => category !== e.target.id
                          )
                        )
                      } else {
                        setSelectedCategories((prevState) => [
                          ...prevState,
                          e.target.id,
                        ])
                      }
                    }}
                  >
                    {name}
                  </button>
                </Col>
              ))}
            </Row>
          </Container>
          <hr />
          <Row>
            <Col className='text-center'>
              <Card bg={'primary'} text={'white'} className='mb-2'>
                <Card.Header style={{ height: '55px' }}>
                  <h3>Total</h3>
                </Card.Header>
                <Card.Body className='pt-2' style={{ height: '42px' }}>
                  <h4>${sum}</h4>
                </Card.Body>
              </Card>
            </Col>
            <Col className='text-center'>
              <Card bg={'primary'} text={'white'} className='mb-2'>
                <Card.Header style={{ height: '55px' }}>
                  <h3>Count</h3>
                </Card.Header>
                <Card.Body className='pt-2' style={{ height: '42px' }}>
                  <h4>{count}</h4>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <br />

          <Row style={{ height: '400px' }} className='mb-4'>
            <Col className='text-center' xs={12}>
              <h3>Daily Purchase Trend</h3>
              <MyLineChart
                data={lineChartDataDaily}
                stroke={'dodgerblue'}
                bottomMargin={47}
                dy={27}
                ml={-22}
              />
            </Col>
          </Row>
          <br />
          <hr />
          <br />
          <Row style={{ height: '480px' }} className='mb-4'>
            <Col className='text-center' xs={12}>
              <h3>Weekly</h3>
              <MyLineChart
                data={lineChartDataWeekly}
                stroke={'#8884D8'}
                bottomMargin={120}
                dy={60}
                ml={-22}
              />
            </Col>
          </Row>
          <hr />
          <br />
          <Row style={{ height: '480px' }} className='mb-4'>
            <Col className='text-center' xs={12}>
              <h3>Monthly</h3>
              <MyLineChart
                data={lineChartDataMonthly}
                stroke={'green'}
                bottomMargin={120}
                dy={60}
                ml={-22}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default DashboardScreen
