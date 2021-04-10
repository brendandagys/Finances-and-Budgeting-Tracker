import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { getPurchases, getPurchaseDetails } from '../actions/purchaseActions'
import Purchase from '../components/Purchase'
import Loader from '../components/Loader'
import Message from '../components/Message'
import PurchaseForm from '../components/PurchaseForm'

const PurchaseListScreen = () => {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow((show) => !show)

  const dispatch = useDispatch()

  const { loading, error, purchases } = useSelector(
    (state) => state.purchaseList
  )

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.purchaseUpdate)

  const { deleted } = useSelector((state) => state.purchaseDelete)

  const purchaseToEdit = useSelector((state) => state.purchaseDetails.purchase)

  const editHandler = async (id) => {
    await dispatch(getPurchaseDetails(id))
    toggleShow()
  }

  useEffect(() => {
    dispatch(getPurchases())
  }, [dispatch, successUpdate])

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
        purchases
          .filter((purchase) => !deleted.includes(purchase._id))
          .map((purchase) => {
            return (
              <Purchase
                editHandler={editHandler}
                id={purchase._id}
                key={purchase._id}
                {...purchase}
              />
            )
          })
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
