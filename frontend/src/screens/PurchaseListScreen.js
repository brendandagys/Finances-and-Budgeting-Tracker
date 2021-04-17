import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { getPurchases, getPurchaseDetails } from '../actions/purchaseActions'
import Purchase from '../components/Purchase'
import Loader from '../components/Loader'
import Message from '../components/Message'
import PurchaseForm from '../components/PurchaseForm'
import PurchaseCategoryPieChart from '../components/PurchaseCategoryPieChart'

const PurchaseListScreen = () => {
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

  const [show, setShow] = useState(false)
  const toggleShow = () => setShow((show) => !show)

  const [applicableCategories, setApplicableCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const [applicablePurchases, setApplicablePurchases] = useState([])
  const [finalPurchases, setFinalPurchases] = useState([])
  const [purchasesToShow, setPurchasesToShow] = useState([])

  const [sum, setSum] = useState(0)
  const [count, setCount] = useState(0)

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

  const editHandler = async (id) => {
    await dispatch(getPurchaseDetails(id))
    toggleShow()
  }

  useEffect(() => {
    dispatch(getPurchases())
  }, [dispatch, successUpdate])

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
  }, [applicablePurchases])

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
  }, [finalPurchases])

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
              <Col className='text-center'>
                <label>
                  <b>From</b>
                </label>
                <input
                  type='date'
                  className='form-control mb-4 text-center'
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  // onBlur={() => setDateUpdated(true)}
                />
              </Col>
              <Col className='text-center'>
                <label>
                  <b>To</b>
                </label>
                <input
                  type='date'
                  className='form-control mb-4 text-center'
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  // onBlur={() => setDateUpdated(true)}
                />
              </Col>
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
              <PurchaseCategoryPieChart />
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
