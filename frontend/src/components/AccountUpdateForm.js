import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { MyInput } from '../fields'
import { Formik } from 'formik'
import { createAccountUpdate } from '../actions/accountUpdateActions'

const AccountUpdateForm = React.forwardRef(
  ({ accountId, name, value, dateFilter, updateTotal, credit }, ref) => {
    const [updated, setUpdated] = useState('false')

    const dispatch = useDispatch()

    return (
      <Formik initialValues={{ value: value || '' }}>
        {({ setFieldValue }) => {
          return (
            <MyInput
              ref={ref}
              name='value'
              label={name}
              credit={credit}
              type='number'
              step='0.01'
              placeholder=''
              inputMode='decimal'
              updated={updated}
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
                updateTotal()
              }}
              onBlur={(e) => {
                if (
                  e.target.value.trim() !== '' &&
                  !e.target.value.includes('-')
                ) {
                  updateTotal()
                  setUpdated('true')
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
          )
        }}
      </Formik>
    )
  }
)

export default AccountUpdateForm
