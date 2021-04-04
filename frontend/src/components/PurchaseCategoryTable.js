import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { MyInput } from '../fields'
import { Table, Button, Modal } from 'react-bootstrap'
import {
  getPurchaseCategories,
  createPurchaseCategory,
  deletePurchaseCategory,
} from '../actions/purchaseCategoryActions.js'
import {
  PURCHASE_CATEGORY_CREATE_RESET,
  PURCHASE_CATEGORY_DELETE_RESET,
} from '../actions/types'

const PurchaseCategoryTable = () => {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow((show) => !show)

  const deleteHandler = (id) => {
    dispatch(deletePurchaseCategory(id))
  }

  const resetHandler = () => {
    dispatch({ type: PURCHASE_CATEGORY_CREATE_RESET })
    dispatch({ type: PURCHASE_CATEGORY_DELETE_RESET })
  }

  const dispatch = useDispatch()

  const { loading, error, purchaseCategories } = useSelector(
    (state) => state.purchaseCategoryList
  )

  const { success: successCreate, error: errorCreate } = useSelector(
    (state) => state.purchaseCategoryCreate
  )

  const { success: successDelete, error: errorDelete } = useSelector(
    (state) => state.purchaseCategoryDelete
  )

  useEffect(() => {
    dispatch(getPurchaseCategories())
    // console.log(purchaseCategories)
  }, [dispatch, successCreate, successDelete])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error || errorCreate || errorDelete ? (
        <>
          <Message variant='secondary'>
            {error || errorCreate || errorDelete}
          </Message>
          <Button
            variant='info'
            className='btn-sm'
            onClick={() => resetHandler()}
          >
            <i className='fas fa-redo-alt'></i> Try again
          </Button>
        </>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm mx-auto'
            style={{ maxWidth: '500px' }}
          >
            <thead>
              <tr>
                <th>Purchase Categories</th>
              </tr>
            </thead>
            <tbody>
              {purchaseCategories.map((purchaseCategory) => (
                <tr key={purchaseCategory._id}>
                  <td style={{ verticalAlign: 'middle', paddingLeft: '15px' }}>
                    {purchaseCategory.name}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span>
                      <Button
                        id={purchaseCategory._id}
                        variant='secondary'
                        className='btn-sm'
                        onClick={deleteHandler.bind(this, purchaseCategory._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='mx-auto' style={{ maxWidth: '500px' }}>
            <Button variant='light' className='btn-sm' onClick={toggleShow}>
              <i className='fas fa-plus'></i>
            </Button>
          </div>
        </>
      )}

      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Purchase Category!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
              // console.log(values)
              dispatch(createPurchaseCategory(values))
              toggleShow()
            }}
          >
            <Form id='purchase-category-form'>
              <MyInput
                label=''
                name='name'
                type='text'
                placeholder='Purchase Category...'
              />
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={toggleShow}>
            Cancel
          </Button>
          <Button type='submit' form='purchase-category-form' variant='primary'>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PurchaseCategoryTable
