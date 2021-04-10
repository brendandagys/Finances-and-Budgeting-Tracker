import React from 'react'
import { useField } from 'formik'

export const MyInput = React.forwardRef(({ label, ...props }, ref) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <div className='form-group'>
      {props.hidelabel === 'true' || (
        <label htmlFor={props.id || props.name}>{label}</label>
      )}
      <input
        {...field}
        {...props}
        ref={ref}
        className={`form-control ${
          meta.touched && meta.error ? 'is-invalid' : ''
        } ${props.centertext ? 'text-center' : ''}`}
      />
      {meta.touched && meta.error ? (
        <small style={{ color: 'red' }} className='error'>
          {meta.error}
        </small>
      ) : null}
    </div>
  )
})

export const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select
        {...field}
        {...props}
        className={`form-control ${
          meta.touched && meta.error ? 'is-invalid' : ''
        }`}
      />
      {meta.touched && meta.error ? (
        <small style={{ color: 'red' }} className='error'>
          {meta.error}
        </small>
      ) : null}
    </div>
  )
}

export const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className='form-group'>
      {props.hidelabel === 'true' || (
        <label htmlFor={props.id || props.name}>{label}</label>
      )}
      <textarea
        {...field}
        {...props}
        className={`form-control ${
          meta.touched && meta.error ? 'is-invalid' : ''
        }`}
      />
      {meta.touched && meta.error ? (
        <small style={{ color: 'red' }} className='error'>
          {meta.error}
        </small>
      ) : null}
    </div>
  )
}

export const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <div className='d-flex justify-content-center mt-4'>
      <label className='checkbox-input'>
        <input
          type='checkbox'
          {...field}
          {...props}
          className={`form-control mb-1 ${
            meta.touched && meta.error ? 'is-invalid' : ''
          }`}
        />
        <small>{children}</small>
      </label>
      {meta.touched && meta.error ? (
        <small style={{ color: 'red' }} className='error'>
          {meta.error}
        </small>
      ) : null}
    </div>
  )
}
