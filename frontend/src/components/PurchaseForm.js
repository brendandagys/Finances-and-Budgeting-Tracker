import React from 'react'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

const MyInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <div className='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} className='form-control' />
      {meta.touched && meta.error ? (
        <small className='error'>{meta.error}</small>
      ) : null}
    </div>
  )
}

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} className='form-control' />
      {meta.touched && meta.error ? (
        <small className='error'>{meta.error}</small>
      ) : null}
    </div>
  )
}

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} className='form-control' />
      {meta.touched && meta.error ? (
        <small className='error'>{meta.error}</small>
      ) : null}
    </div>
  )
}

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
          description: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        <Form>
          <MyInput label='Date' name='date' type='date' placeholder='Date...' />

          <MyInput label='Time' name='time' type='time' placeholder='Time...' />

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
            accept='image/png, image/jpeg'
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
