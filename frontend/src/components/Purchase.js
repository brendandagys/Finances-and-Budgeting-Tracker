import React from 'react'
import { Card, Button } from 'react-bootstrap'

const Purchase = ({
  timestamp,
  category,
  item,
  amount,
  description,
  account,
}) => {
  var date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString()
  const day = date.getDate().toString()

  const hour = date.getHours().toString()
  const minute = date.getMinutes().toString()

  const time = `${hour.length === 1 ? '0' + hour : hour}:${
    minute.length === 1 ? '0' + minute : minute
  }`

  date = `${year}-${month.length === 1 ? '0' + month : month}-${
    day.length === 1 ? '0' + day : day
  }`

  return (
    <Card className='my-3'>
      <Card.Header as='h6'>
        {category} | ${amount}
      </Card.Header>
      <Card.Body>
        <Card.Title>{item}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant='primary'>View Receipt</Button>
        <Button className='ml-1' variant='secondary'>
          Delete
        </Button>
      </Card.Body>
      <Card.Footer className='py-1'>
        <small className='text-muted'>
          {date + ' | ' + time} {account && '| ' + account}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default Purchase
