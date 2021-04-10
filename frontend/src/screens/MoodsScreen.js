import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import Calendar from '../components/calendar/Calendar'

const MoodsScreen = () => {
  const [show, setShow] = useState(true)
  const toggleShow = () => setShow((show) => !show)

  const [rangeValue, setRangeValue] = useState(5)

  const submitHandler = () => {
    console.log('Submitting...')
    toggleShow()
  }

  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1

  return (
    <>
      <h1 className='text-center'>Moods</h1>
      <br />
      <Calendar year={year} month={month} />

      <Modal show={show} onHide={toggleShow}>
        <Modal.Header style={{ backgroundColor: '#F0F0F0' }} closeButton>
          <Modal.Title>Set the mood...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} style={{ margin: 'auto' }}>
              <Col xs='9'>
                <Form.Control
                  type='range'
                  style={{ marginTop: '11px' }}
                  min={1}
                  max={10}
                  value={rangeValue}
                  onChange={(e) => setRangeValue(e.target.value)}
                />
              </Col>
              <Col xs='3'>
                <Form.Control value={rangeValue} />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#F5F5F5' }}>
          <Button variant='secondary' onClick={toggleShow}>
            Cancel
          </Button>
          <Button variant='primary' onClick={submitHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MoodsScreen
