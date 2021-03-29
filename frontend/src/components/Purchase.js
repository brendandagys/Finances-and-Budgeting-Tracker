import React from 'react'
import { Card, Button } from 'react-bootstrap'

const Purchase = () => {
  return (
    <Card className='my-3'>
      <Card.Header as='h6'>Groceries | $15.43</Card.Header>
      <Card.Body>
        <Card.Title>Groceries at Metro</Card.Title>
        <Card.Text>Chicken legs, corn, oregano, cookies.</Card.Text>
        <Button variant='primary'>View Receipt</Button>
        <Button className='ml-1' variant='secondary'>
          Delete
        </Button>
      </Card.Body>
      <Card.Footer className='py-1'>
        <small className='text-muted'>2021-03-30 | 09:45</small>
      </Card.Footer>
    </Card>
  )
}

export default Purchase
