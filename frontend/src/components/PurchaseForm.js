import React, { useEffect } from 'react'
import Loader from './Loader'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { MyInput, MySelect, MyTextArea } from '../fields'
import * as Yup from 'yup'
import { createPurchase } from '../actions/purchaseActions'
import { PURCHASE_CREATE_RESET } from '../actions/types'

const getCurrentDate = () => {
  let today = new Date()
  let date = today.getDate()
  let month = today.getMonth() + 1
  let year = today.getFullYear()
  if (date < 10) date = `0${date}`
  if (month < 10) month = `0${month}`

  return `${year}-${month}-${date}`
}

const getCurrentTime = () =>
  new Date().toTimeString().split(' ')[0].substring(0, 5)

const SignupForm = () => {
  const dispatch = useDispatch()
  const purchaseCreate = useSelector((state) => state.purchaseCreate)
  const { loading, error, success } = purchaseCreate

  useEffect(() => {
    if (success) {
      dispatch({ type: PURCHASE_CREATE_RESET })
    }
  }, [dispatch, success])

  return (
    <>
      <h1>Enter a Purchase!</h1>

      <Formik
        initialValues={{
          date: getCurrentDate(),
          time: getCurrentTime(),
          category: '',
          item: '',
          amount: '',
          description: '',
        }}
        validationSchema={Yup.object({
          date: Yup.string().required('Required'),
          time: Yup.string().required('Required'),
          category: Yup.string().required('Required'),
          item: Yup.string().required('Required'),
          amount: Yup.number()
            .positive('Must be positive')
            .required('Required'),
          description: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          dispatch(createPurchase(values))
        }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='secondary'>{error}</Message>
        ) : (
          <Form>
            <MyInput
              label='Date'
              name='date'
              type='date'
              placeholder='Date...'
            />

            <MyInput
              label='Time'
              name='time'
              type='time'
              placeholder='Time...'
            />

            <MySelect label='Category' name='category'>
              <option value=''>Select a category</option>
              <option value='coffee'>Coffee</option>
              <option value='fooddrinks'>Food/Drinks</option>
              <option value='groceries'>Groceries</option>
              <option value='householditems'>Household Items</option>
              <option value='clothes'>Clothes</option>
            </MySelect>

            <MyInput
              label='Item(s)'
              name='item'
              autoFocus
              type='text'
              placeholder='Item(s)...'
            />

            <MyInput
              label='Amount'
              name='amount'
              type='number'
              placeholder='Amount...'
            />

            <MyTextArea
              label='Description'
              name='description'
              placeholder='Description...'
              rows='3'
            />

            <MyInput
              label='Receipt'
              name='receipt'
              type='file'
              style={{ height: '44px' }}
              accept='image/png, image/jpeg'
            />

            <button
              className='form-control btn-primary'
              type='submit'
              disabled={Formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SignupForm
