import React from 'react'
import { MyInput } from '../fields'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const AccountUpdateForm = ({ accountId, name, value }) => {
  return (
    <Formik
      initialValues={{ amount: '' }}
      validationSchema={Yup.object({
        amount: Yup.number().positive('Must be positive').required('Required'),
      })}
      onSubmit={(values) => console.log('Submitting')}
    >
      {({ setFieldValue }) => {
        return (
          <Form id='account-update-form'>
            <MyInput
              id={accountId}
              name={accountId}
              label={name}
              type='number'
              step='0.01'
              placeholder='0.00'
              inputMode='decimal'
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
          </Form>
        )
      }}
    </Formik>
  )
}

export default AccountUpdateForm
