import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { MyInput, MyCheckbox } from '../fields'
import { Table, Button, Modal } from 'react-bootstrap'
import {
  getAccounts,
  getAccountDetails,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../actions/accountActions.js'
import {
  // ACCOUNT_CREATE_RESET,
  // ACCOUNT_DELETE_RESET,
  ACCOUNT_DETAILS_RESET,
} from '../actions/types'

const AccountTable = () => {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow((show) => !show)

  const addHandler = () => {
    dispatch({ type: ACCOUNT_DETAILS_RESET })
    toggleShow()
  }

  const editHandler = async (id) => {
    await dispatch(getAccountDetails(id))
    toggleShow()
  }

  const deleteHandler = (id) => {
    dispatch(deleteAccount(id))
  }

  // const resetHandler = () => {
  //   dispatch({ type: ACCOUNT_CREATE_RESET })
  //   dispatch({ type: ACCOUNT_DELETE_RESET })
  //   dispatch({ type: ACCOUNT_DETAILS_RESET })
  // }

  const dispatch = useDispatch()

  const { loading, error, accounts } = useSelector((state) => state.accountList)

  const {
    error: errorDetails,
    account: { _id, name, credit, allowPurchases },
  } = useSelector((state) => state.accountDetails)

  const { success: successCreate, error: errorCreate } = useSelector(
    (state) => state.accountCreate
  )

  const { success: successUpdate, error: errorUpdate } = useSelector(
    (state) => state.accountUpdate
  )

  const { success: successDelete, error: errorDelete } = useSelector(
    (state) => state.accountDelete
  )

  useEffect(() => {
    dispatch(getAccounts())
    // console.log(accounts)
  }, [dispatch, successCreate, successUpdate, successDelete])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error || errorCreate || errorUpdate || errorDelete || errorDetails ? (
        <>
          <Message variant='secondary'>
            {error || errorCreate || errorUpdate || errorDelete || errorDetails}
          </Message>
          {/* <Button variant='info' className='btn-sm' onClick={resetHandler}>
            <i className='fas fa-redo-alt'></i> Try again
          </Button> */}
        </>
      ) : (
        <>
          <div className='mx-auto mb-4' style={{ maxWidth: '600px' }}>
            <h2 style={{ textAlign: 'center' }}>Accounts</h2>
          </div>
          <div className='alert alert-light text-center'>
            <small>
              Create accounts and track their value over time. Purchases can
              also be assigned to these.
            </small>
          </div>
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm mx-auto'
            style={{ maxWidth: '600px', textAlign: 'center' }}
          >
            <thead>
              <tr>
                <th style={{ verticalAlign: 'middle' }}>Name</th>
                <th style={{ verticalAlign: 'middle' }}>Credit?</th>
                <th style={{ verticalAlign: 'middle' }}>Allow Purchases?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account._id}>
                  <td style={{ verticalAlign: 'middle', paddingLeft: '15px' }}>
                    {account.name}
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>
                    {account.credit ? 'Yes' : 'No'}
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>
                    {account.allowPurchases ? 'Yes' : 'No'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span>
                      <Button
                        id={account._id}
                        variant='info'
                        className='btn-sm m-1'
                        onClick={editHandler.bind(this, account._id)}
                      >
                        <i className='fas fa-user-edit'></i>
                      </Button>
                      <Button
                        id={account._id}
                        variant='secondary'
                        className='btn-sm m-1'
                        style={{ width: '35.5px' }}
                        onClick={deleteHandler.bind(this, account._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='mx-auto' style={{ maxWidth: '600px' }}>
            <Button variant='light' className='btn-sm' onClick={addHandler}>
              <i className='fas fa-plus'></i>
            </Button>
          </div>
        </>
      )}

      <Modal show={show} onHide={toggleShow}>
        <Modal.Header style={{ backgroundColor: '#F0F0F0' }} closeButton>
          <Modal.Title>
            {name ? 'Update Account!' : 'Add a new Account!'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: name || '',
              credit: credit === undefined ? false : credit,
              allowPurchases:
                allowPurchases === undefined ? true : allowPurchases,
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
              // console.log(values)
              if (name) {
                dispatch(updateAccount({ _id, ...values }))
              } else {
                dispatch(createAccount(values))
              }
              toggleShow()
            }}
          >
            <Form id='account-form'>
              <MyInput
                label=''
                name='name'
                type='text'
                placeholder='Account...'
              />

              <MyCheckbox name='credit'>Credit?</MyCheckbox>

              <MyCheckbox name='allowPurchases'>Allow Purchases?</MyCheckbox>
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#F5F5F5' }}>
          <Button variant='secondary' onClick={toggleShow}>
            Cancel
          </Button>
          <Button type='submit' form='account-form' variant='primary'>
            {name ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AccountTable
