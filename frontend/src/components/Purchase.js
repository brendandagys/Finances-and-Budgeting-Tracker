import React from 'react'
import axios from '../axios'
import { Card, Button } from 'react-bootstrap'
import Message from './Message'
import { deletePurchase } from '../actions/purchaseActions'
import { useDispatch, useSelector } from 'react-redux'

const getProperDateAndTime = (timestamp) => {
  let date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')

  const time = `${hour}:${minute}`

  date = `${year}-${month}-${day}`

  return [date, time]
}

const Purchase = ({
  id,
  timestamp,
  category,
  item,
  amount,
  description,
  account,
  editHandler,
  receiptUrl,
}) => {
  const dispatch = useDispatch()

  const { error } = useSelector((state) => state.purchaseDelete)

  return (
    <>
      {error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <Card className='my-3'>
          <Card.Header as='h6'>
            {category} | $
            {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {amount.toString().split('.')[1] &&
              amount.toString().split('.')[1].length === 1 &&
              '0'}
          </Card.Header>
          <Card.Body>
            <Card.Title>{item}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Button
              className='mt-2'
              variant='primary'
              disabled={receiptUrl ? false : true}
              href={receiptUrl ? receiptUrl : ''}
              target='_blank'
            >
              View Receipt
            </Button>
            <Button
              className='mx-2 mt-2'
              variant='info'
              onClick={() => editHandler(id)}
            >
              Edit
            </Button>
            <Button
              className='mt-2'
              variant='secondary'
              onClick={async (e) => {
                if (e.target.innerText === 'Delete') {
                  e.target.innerText = 'Confirm Delete'
                  return
                }
                dispatch(deletePurchase(id))

                if (receiptUrl) {
                  await axios.delete('/api/s3', {
                    data: {
                      key: receiptUrl.split('s3.amazonaws.com/')[1],
                    },
                  })
                }
              }}
            >
              Delete
            </Button>
          </Card.Body>
          <Card.Footer className='py-1'>
            <small className='text-muted'>
              {getProperDateAndTime(timestamp)[0] +
                ' | ' +
                getProperDateAndTime(timestamp)[1]}{' '}
              {account && '| ' + account}
            </small>
          </Card.Footer>
        </Card>
      )}
    </>
  )
}

export default Purchase
