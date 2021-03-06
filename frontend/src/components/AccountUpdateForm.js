import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { MyInput } from '../fields'
import { Formik } from 'formik'
import { createAccountUpdate } from '../actions/accountUpdateActions'

const AccountUpdateForm = React.forwardRef(
  (
    {
      accountId,
      name,
      value,
      dateFilter,
      updateTotal,
      credit,
      currency,
      updateChart,
    },
    ref
  ) => {
    const [updated, setUpdated] = useState('false')

    const dispatch = useDispatch()

    return (
      <Formik initialValues={{ value: value || '' }}>
        {({ setFieldValue }) => {
          return (
            <MyInput
              ref={ref}
              style={{ textAlign: 'center' }}
              centerlabel='true'
              name='value'
              label={name}
              credit={credit}
              currency={currency}
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
                // updateTotal()
              }}
              onBlur={async (e) => {
                if (
                  e.target.value.trim() !== '' &&
                  !e.target.value.includes('-')
                ) {
                  updateTotal()
                  setUpdated('true')
                  await dispatch(
                    createAccountUpdate(
                      dateFilter,
                      accountId,
                      name,
                      e.target.value
                    )
                  )
                  dispatch(updateChart())
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
