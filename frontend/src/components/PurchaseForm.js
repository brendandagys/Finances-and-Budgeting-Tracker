import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Loader from './Loader'
import Message from './Message'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { MyInput, MySelect, MyTextArea } from '../fields'
import * as Yup from 'yup'
import { createPurchase, updatePurchase } from '../actions/purchaseActions'
import { getPurchaseCategories } from '../actions/purchaseCategoryActions'
import { getAccounts } from '../actions/accountActions'
import moment from 'moment'
// import { PURCHASE_CREATE_RESET, PURCHASE_UPDATE_RESET } from '../actions/types'

export const getCurrentDate = () => moment().format('YYYY-MM-DD')

const getCurrentTime = () => moment().format('HH:mm')

const PurchaseForm = ({ purchase, toggleShow }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileRef = useRef(null)

  const handleUpload = async () => {
    const file = fileRef.current.files[0]

    const {
      data: {
        data: { returnData },
      },
    } = await axios.post('/api/s3', {
      fileName: `receipts/${auth.email}/${file.name.split('.')[0]}`,
      fileType: file.name.split('.')[1],
    })

    console.log('Signed request for file upload: ' + returnData.signedRequest)

    const options = {
      headers: { 'Content-Type': file.name.split('.')[1] },
    }

    await axios.put(returnData.signedRequest, file, options)

    return returnData.receiptUrl
  }

  const dispatch = useDispatch()

  const { loadingCreate, errorCreate } = useSelector(
    (state) => state.purchaseCreate
  )

  const { loadingUpdate, errorUpdate } = useSelector(
    (state) => state.purchaseUpdate
  )

  const { purchaseCategories, error: purchaseCategoryError } = useSelector(
    (state) => state.purchaseCategoryList
  )

  const { accounts, error: accountError } = useSelector(
    (state) => state.accountList
  )

  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getPurchaseCategories())
    dispatch(getAccounts())
  }, [dispatch])

  return (
    <>
      {!purchase && <h1 className='text-center'>Enter a Purchase!</h1>}
      <br />
      <Formik
        initialValues={{
          date: getCurrentDate(),
          time: getCurrentTime(),
          category: (purchase && purchase.category_id) || '',
          item: (purchase && purchase.item) || '',
          amount: (purchase && purchase.amount) || '',
          description: (purchase && purchase.description) || '',
          account: (purchase && purchase.account_id) || '',
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
        onSubmit={async (values, { resetForm }) => {
          setIsSubmitting(true)

          // console.log(values)
          if (purchase) {
            dispatch(updatePurchase({ _id: purchase._id, ...values }))
            toggleShow()
          } else {
            if (fileRef.current.files.length > 0) {
              var receiptUrl = await handleUpload()
            }

            dispatch(createPurchase({ receiptUrl, ...values }))
            resetForm()
            fileRef.current.value = null
          }
          setIsSubmitting(false)
        }}
      >
        {loadingCreate || loadingUpdate ? (
          <Loader />
        ) : errorCreate ||
          errorUpdate ||
          purchaseCategoryError ||
          accountError ? (
          <>
            <Message variant='secondary'>
              {errorCreate ||
                errorUpdate ||
                purchaseCategoryError ||
                accountError}
            </Message>
            {/* <Button
              variant='info'
              className='btn-sm'
              onClick={() => {
                dispatch({ type: PURCHASE_CREATE_RESET })
                dispatch({ type: PURCHASE_UPDATE_RESET })
              }}
            >
              <i className='fas fa-redo-alt'></i> Try again
            </Button> */}
          </>
        ) : (
          ({ setFieldValue }) => {
            return (
              <Form id='purchase-form'>
                <MyInput
                  label='Date'
                  name='date'
                  type='date'
                  placeholder='Date...'
                  hidelabel='true'
                  centertext='true'
                />

                <MyInput
                  label='Time'
                  name='time'
                  type='time'
                  placeholder='Time...'
                  hidelabel='true'
                  centertext='true'
                />

                <MySelect
                  label='Category'
                  name='category'
                  onChange={(e) => setFieldValue('category', e.target.value)}
                >
                  <option value=''></option>
                  {purchaseCategories
                    .filter((category) => category.active)
                    .map((category) => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      )
                    })}
                </MySelect>

                <MyInput
                  label='Item(s)'
                  name='item'
                  type='text'
                  placeholder='Item(s)...'
                  hidelabel='true'
                />

                <MyInput
                  label='Amount'
                  name='amount'
                  type='number'
                  step='0.01'
                  placeholder='Amount...'
                  inputMode='decimal'
                  hidelabel='true'
                  onFocus={(e) => setFieldValue('amount', '')}
                  onKeyUp={(e) => {
                    if (
                      e.target.value.split('.')[1] &&
                      e.target.value.split('.')[1].length === 2
                    ) {
                      e.target.blur()
                    } else if (
                      e.target.value.split('.')[1] &&
                      e.target.value.split('.')[1].length > 2
                    ) {
                      setFieldValue('amount', e.target.value.slice(0, -1))
                      e.target.blur()
                    }
                  }}
                />

                <MyTextArea
                  label='Description'
                  name='description'
                  placeholder='Description...'
                  rows='3'
                  hidelabel='true'
                />

                <MySelect
                  label='Account'
                  name='account'
                  onChange={(e) => setFieldValue('account', e.target.value)}
                >
                  <option value=''></option>
                  {accounts
                    .filter((account) => account.allowPurchases)
                    .map((account) => {
                      return (
                        <option key={account._id} value={account._id}>
                          {account.name}
                        </option>
                      )
                    })}
                </MySelect>

                {!purchase && (
                  <div className='form-group'>
                    <label htmlFor='receipt'>Receipt</label>
                    <input
                      ref={fileRef}
                      type='file'
                      name='receipt'
                      className='form-control'
                      style={{ height: '44px' }}
                      accept='image/png, image/jpeg'
                    />
                  </div>
                )}
                {isSubmitting && (
                  <Spinner
                    animation='border'
                    variant='primary'
                    role='status'
                    style={{
                      width: '50px',
                      height: '50px',
                      margin: '10px auto 19px auto',
                      display: 'block',
                    }}
                  >
                    <span className='sr-only'>Loading...</span>
                  </Spinner>
                )}
                {!purchase && (
                  <button className='form-control btn-primary' type='submit'>
                    Submit
                  </button>
                )}
              </Form>
            )
          }
        )}
      </Formik>
    </>
  )
}

export default PurchaseForm
