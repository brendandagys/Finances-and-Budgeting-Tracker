import React from 'react'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <div class='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='text-input form-control' {...field} {...props} />
      {meta.touched && meta.error ? (
        <small className='error'>{meta.error}</small>
      ) : null}
    </div>
  )
}

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <div class='form-group'>
      <label className='checkbox-input form-control'>
        <input type='checkbox' {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <small className='error'>{meta.error}</small>
      ) : null}
    </div>
  )
}

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div class='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} className='form-control' />
      {meta.touched && meta.error ? (
        <small className='error'>{meta.error}</small>
      ) : null}
    </div>
  )
}

// And now we can use these
const SignupForm = () => {
  return (
    <>
      <h1>Enter a Purchase!</h1>
      <Formik
        initialValues={{
          date: Date().toString(),
          time: '',
          category: 'groceries',
          item: '', // added for our checkbox
          amount: '', // added for our select
        }}
        // validationSchema={Yup.object({
        //   date: Yup.string()
        //     .max(15, 'Must be 15 characters or less')
        //     .required('Required'),
        //   time: Yup.string()
        //     .max(20, 'Must be 20 characters or less')
        //     .required('Required'),
        //   category: Yup.string()
        //     .email('Invalid email address')
        //     .required('Required'),
        //   item: Yup.boolean()
        //     .required('Required')
        //     .oneOf([true], 'You must accept the terms and conditions.'),
        //   amount: Yup.string()
        //     .oneOf(
        //       ['designer', 'development', 'product', 'other'],
        //       'Invalid Job Type'
        //     )
        //     .required('Required'),
        // })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        <Form>
          <MyTextInput
            label='Date'
            name='date'
            type='date'
            placeholder='Date...'
          />

          <MyTextInput
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

          <MyTextInput
            label='Item(s)'
            name='item'
            type='text'
            placeholder='Item(s)...'
          />

          <MyTextInput
            label='Amount'
            name='amount'
            type='number'
            placeholder='Amount...'
          />

          <button className='form-control btn-primary' type='submit'>
            Submit
          </button>
        </Form>
      </Formik>
    </>
  )
}

export default SignupForm
