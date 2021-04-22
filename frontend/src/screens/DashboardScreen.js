import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import { getPurchases } from '../actions/purchaseActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Datepicker from '../components/Datepicker'
import PurchaseLineChart from '../components/PurchaseLineChart'

const DashboardScreen = () => {
  const [fromDate, setFromDate] = useState(
    () =>
      `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, '0')}-01`
  )
  const [toDate, setToDate] = useState(
    () =>
      `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`
  )

  const [applicableCategories, setApplicableCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const [applicablePurchases, setApplicablePurchases] = useState([])
  const [finalPurchases, setFinalPurchases] = useState([])

  const [sum, setSum] = useState(0)
  const [count, setCount] = useState(0)

  const [lineChartDataDaily, setLineChartDataDaily] = useState([])
  const [lineChartDataWeekly, setLineChartDataWeekly] = useState([])

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
    setApplicablePurchases(
      purchases &&
        purchases.filter((purchase) => {
          let date = new Date(purchase.timestamp)
          const year = date.getFullYear()
          const month = (date.getMonth() + 1).toString().padStart(2, '0')
          const day = date.getDate().toString().padStart(2, '0')

          date = `${year}-${month}-${day}`

          // console.log(fromDate)
          // console.log(toDate)
          // console.log(date)
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
        .reduce((a, b) => a + b['amount'], 0)
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
      setStartDate(sortedPurchases[0].timestamp.slice(0, 10))
      setEndDate(
        sortedPurchases[0] &&
          sortedPurchases.slice(-1)[0].timestamp.slice(0, 10)
      )
    }
  }, [sortedPurchases])

  useEffect(() => {
    if (startDate && endDate) {
      var datesArray = []

      var startDateCopy = startDate

      while (startDateCopy <= endDate) {
        datesArray.push(startDateCopy)

        startDateCopy = new Date(
          new Date(startDateCopy).setDate(
            new Date(startDateCopy).getDate() + 1
          ) +
            60 * 60 * 1000 // Add 1 hour because DST causes infinite loop
        )
          .toISOString()
          .slice(0, 10)
      }

      setLineChartDataDaily([])

      for (const date of datesArray) {
        const amount = sortedPurchases
          .filter(({ timestamp }) => timestamp.slice(0, 10) === date)
          .reduce((a, b) => a + b.amount, 0)

        setLineChartDataDaily((prevState) => {
          return [...prevState, { date, Amount: amount }]
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
        startDateCopy = new Date(
          new Date(startDateCopy).setDate(
            new Date(startDateCopy).getDate() + 6
          ) +
            60 * 60 * 1000 // Add 1 hour because DST causes infinite loop
        )
          .toISOString()
          .slice(0, 10)
      }

      setLineChartDataWeekly([])

      datesArray.forEach((date, index) => {
        const amount = sortedPurchases
          .filter(({ timestamp }) => {
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
                  : datesArray[index + 1]
              }`,
              Amount: amount,
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

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : purchases.length === 0 ? (
        <Message variant='info'>You have not yet entered any purchases</Message>
      ) : (
        <>
          <Container>
            <Row>
              <Datepicker
                dateValue={fromDate}
                setDateValue={setFromDate}
                label='From'
              />
              <Datepicker
                dateValue={toDate}
                setDateValue={setToDate}
                label='To'
              />
            </Row>
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
          <br />

          <Row style={{ height: '400px' }} className='mb-4'>
            <Col className='text-center' xs={12}>
              <h3>Daily Purchase Trend</h3>
              <PurchaseLineChart
                data={lineChartDataDaily}
                bottomMargin={47}
                dy={27}
              />
            </Col>
          </Row>
          <br />
          <br />
          <Row style={{ height: '400px' }} className='mb-4'>
            <Col className='text-center' xs={12}>
              <h3>Weekly Purchase Trend</h3>
              <PurchaseLineChart
                data={lineChartDataWeekly}
                bottomMargin={120}
                dy={60}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default DashboardScreen
