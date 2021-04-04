import { useField } from 'formik'

export const MyInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <div className='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        {...field}
        {...props}
        className={`form-control ${
          meta.touched && meta.error ? 'is-invalid' : ''
        }`}
      />
      {meta.touched && meta.error ? (
        <small className='error'>{meta.error}</small>
      ) : null}
    </div>
  )
}

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
        <small className='error'>{meta.error}</small>
      ) : null}
    </div>
  )
}

export const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        {...field}
        {...props}
        className={`form-control ${
          meta.touched && meta.error ? 'is-invalid' : ''
        }`}
      />
      {meta.touched && meta.error ? (
        <small className='error'>{meta.error}</small>
      ) : null}
    </div>
  )
}
