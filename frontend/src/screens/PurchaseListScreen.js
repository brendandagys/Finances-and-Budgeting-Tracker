import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { getPurchases, getPurchaseDetails } from '../actions/purchaseActions'
import Purchase from '../components/Purchase'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Datepicker from '../components/Datepicker'
import PurchaseForm from '../components/PurchaseForm'
import PurchaseCategoryPieChart from '../components/PurchaseCategoryPieChart'
import moment from 'moment'

const PurchaseListScreen = () => {
  const [fromDate, setFromDate] = useState(() => moment().format('YYYY-MM-01'))
  const [toDate, setToDate] = useState(() => moment().format('YYYY-MM-DD'))

  const [show, setShow] = useState(false)
  const toggleShow = () => setShow((show) => !show)

  const [applicableCategories, setApplicableCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const [applicablePurchases, setApplicablePurchases] = useState([])
  const [finalPurchases, setFinalPurchases] = useState([])
  const [purchasesToShow, setPurchasesToShow] = useState([])

  const [sum, setSum] = useState(0)
  const [count, setCount] = useState(0)

  const [pieChartData, setPieChartData] = useState([])

  const dispatch = useDispatch()

  const { loading, error, purchases } = useSelector(
    (state) => state.purchaseList
  )

  const purchaseToEdit = useSelector((state) => state.purchaseDetails.purchase)

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.purchaseUpdate)

  const { deleted } = useSelector((state) => state.purchaseDelete)

  const editHandler = useCallback(
    async (id) => {
      await dispatch(getPurchaseDetails(id))
      toggleShow()
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(getPurchases())
  }, [dispatch, successUpdate])

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
        purchases.filter((purchase) => {
          let date = moment(purchase.timestamp).format('YYYY-MM-DD')
          return (
            !deleted.includes(purchase._id) &&
            date >= fromDate &&
            date <= toDate
          )
        })
    )
  }, [purchases, deleted, fromDate, toDate])

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
    setPurchasesToShow(
      finalPurchases.map((purchase) => {
        return (
          <Col key={purchase._id} md={6} xl={4}>
            <Purchase
              id={purchase._id}
              editHandler={editHandler}
              {...purchase}
            />
          </Col>
        )
      })
    )

    var categoryValues = {}

    finalPurchases.forEach(({ category, amount }) =>
      categoryValues[category]
        ? (categoryValues[category] = categoryValues[category] + amount)
        : (categoryValues[category] = amount)
    )

    var finalChartArray = []

    for (const [key, value] of Object.entries(categoryValues)) {
      finalChartArray.push({ name: key, value: parseFloat(value.toFixed(2)) })
    }
    // console.log(finalChartArray)
    setPieChartData(finalChartArray)
  }, [finalPurchases, editHandler])

  useEffect(() => {
    setSum(
      finalPurchases
        .reduce((a, b) => a + b['amount'], 0)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    )
    setCount(finalPurchases.length)
  }, [finalPurchases])

  return (
    <>
      {/* {console.log(purchases)} */}
      <h1 className='text-center'>Purchases</h1>
      <br />

      {loading || loadingUpdate ? (
        <Loader />
      ) : error || errorUpdate ? (
        <Message variant='secondary'>{error || errorUpdate}</Message>
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
                      // console.log(selectedCategories)
                    }}
                  >
                    {name}
                  </button>
                </Col>
              ))}
            </Row>
          </Container>

          <hr />
          <Row style={{ height: '250px' }} className='mb-4'>
            <Col>
              <PurchaseCategoryPieChart data={pieChartData} />
            </Col>
          </Row>
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
          <Row>{purchasesToShow}</Row>
        </>
      )}

      <Modal show={show} onHide={toggleShow}>
        <Modal.Header style={{ backgroundColor: '#F0F0F0' }} closeButton>
          <Modal.Title>Edit Purchase!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PurchaseForm toggleShow={toggleShow} purchase={purchaseToEdit} />
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#F5F5F5' }}>
          <Button variant='secondary' onClick={toggleShow}>
            Cancel
          </Button>
          <Button type='submit' form='purchase-form' variant='primary'>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PurchaseListScreen
