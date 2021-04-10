import React from 'react'
import { useDispatch } from 'react-redux'
import { MyInput } from '../fields'
import { Formik, Form } from 'formik'
import { createAccountUpdate } from '../actions/accountUpdateActions'
import * as Yup from 'yup'

const AccountUpdateForm = React.forwardRef(
  ({ accountId, name, value, dateFilter, updateTotal }, ref) => {
    const dispatch = useDispatch()

    return (
      <Formik
        initialValues={{ value: value || '' }}
        validationSchema={Yup.object({
          amount: Yup.number()
            .positive('Must be positive')
            .required('Required'),
        })}
        onSubmit={(values) => console.log('Submitting')}
      >
        {({ setFieldValue }) => {
          return (
            <Form id='account-update-form'>
              <MyInput
                ref={ref}
                name='value'
                label={name}
                type='number'
                step='0.01'
                placeholder=''
                inputMode='decimal'
                onFocus={(e) => setFieldValue('value', '')}
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
                    setFieldValue('value', e.target.value.slice(0, -1))
                    e.target.blur()
                  }
                }}
                onBlur={(e) => {
                  if (
                    e.target.value.trim() !== '' &&
                    !e.target.value.includes('-')
                  ) {
                    updateTotal()
                    dispatch(
                      createAccountUpdate(
                        dateFilter,
                        accountId,
                        name,
                        e.target.value
                      )
                    )
                  }
                }}
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
)

export default AccountUpdateForm
