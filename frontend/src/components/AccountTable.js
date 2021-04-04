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
  createAccount,
  deleteAccount,
} from '../actions/accountActions.js'
import { ACCOUNT_CREATE_RESET, ACCOUNT_DELETE_RESET } from '../actions/types'

const AccountTable = () => {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow((show) => !show)

  const deleteHandler = (id) => {
    dispatch(deleteAccount(id))
  }

  const resetHandler = () => {
    dispatch({ type: ACCOUNT_CREATE_RESET })
    dispatch({ type: ACCOUNT_DELETE_RESET })
  }

  const dispatch = useDispatch()

  const { loading, error, accounts } = useSelector((state) => state.accountList)

  const { success: successCreate, error: errorCreate } = useSelector(
    (state) => state.accountCreate
  )

  const { success: successDelete, error: errorDelete } = useSelector(
    (state) => state.accountDelete
  )

  useEffect(() => {
    dispatch(getAccounts())
    // console.log(accounts)
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
            style={{ maxWidth: '500px', textAlign: 'center' }}
          >
            <thead>
              <h2>Accounts</h2>

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
                        // onClick={editHandler.bind(this, account._id)}
                      >
                        <i className='fas fa-user-edit'></i>
                      </Button>
                      <Button
                        id={account._id}
                        variant='secondary'
                        className='btn-sm m-1'
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
          <div className='mx-auto' style={{ maxWidth: '500px' }}>
            <Button variant='light' className='btn-sm' onClick={toggleShow}>
              <i className='fas fa-plus'></i>
            </Button>
          </div>
        </>
      )}

      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Account!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
              credit: false,
              allowPurchases: true,
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
              // console.log(values)
              dispatch(createAccount(values))
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
        <Modal.Footer>
          <Button variant='secondary' onClick={toggleShow}>
            Cancel
          </Button>
          <Button type='submit' form='account-form' variant='primary'>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AccountTable
