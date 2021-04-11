import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Message from './Message'
import { deletePurchase } from '../actions/purchaseActions'
import { useDispatch, useSelector } from 'react-redux'

const Purchase = ({
  id,
  timestamp,
  category,
  item,
  amount,
  description,
  account,
  editHandler,
}) => {
  const dispatch = useDispatch()

  const { error } = useSelector((state) => state.purchaseDelete)

  var date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')

  const time = `${hour}:${minute}`

  date = `${year}-${month}-${day}`

  return (
    <>
      {error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <Card className='my-3'>
          <Card.Header as='h6'>
            {category} | ${amount}
            {amount.toString().split('.')[1] &&
              amount.toString().split('.')[1].length === 1 &&
              '0'}
          </Card.Header>
          <Card.Body>
            <Card.Title>{item}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Button variant='primary'>View Receipt</Button>
            <Button
              className='mx-2'
              variant='info'
              onClick={() => editHandler(id)}
            >
              Edit
            </Button>
            <Button
              variant='secondary'
              onClick={() => dispatch(deletePurchase(id))}
            >
              Delete
            </Button>
          </Card.Body>
          <Card.Footer className='py-1'>
            <small className='text-muted'>
              {date + ' | ' + time} {account && '| ' + account}
            </small>
          </Card.Footer>
        </Card>
      )}
    </>
  )
}

export default Purchase
