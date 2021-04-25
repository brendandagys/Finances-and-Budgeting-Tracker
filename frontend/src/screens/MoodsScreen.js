import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap'
import { getMoods, createMood } from '../actions/moodActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Calendar from '../components/calendar/Calendar'

const MoodsScreen = () => {
  const [show, setShow] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedValue, setSelectedValue] = useState('')
  const [calendarList, setCalendarList] = useState({})

  const dispatch = useDispatch()

  const { loading, error, moods } = useSelector((state) => state.moodList)

  const toggleShow = () => {
    setShow((show) => !show)
  }

  const submitHandler = () => {
    const createAndFetchMoods = async () => {
      await dispatch(createMood(selectedDate, selectedValue))
      await dispatch(getMoods())
    }
    createAndFetchMoods()
    toggleShow()
  }

  useEffect(() => {
    dispatch(getMoods())
  }, [dispatch])

  useEffect(() => {
    if (moods && moods.length > 0) {
      var dateArray = []
      const startYear = new Date(moods[0].timestamp).getFullYear()
      const startMonth = new Date(moods[0].timestamp).getMonth()
      let startDate = new Date(startYear, startMonth, 1)
      dateArray.push(startDate.toISOString().replace('T04', 'T00').slice(0, 7))

      while (
        startDate <
        new Date(new Date().getFullYear(), new Date().getMonth(), 0, 20)
      ) {
        startDate = new Date(startDate.setMonth(startDate.getMonth() + 1))
        dateArray.push(
          startDate.toISOString().replace('T04', 'T00').slice(0, 7)
        )
      }

      var valuesObject = {}

      for (let i = 0; i < dateArray.length; i++) {
        let tempObject = {}

        let applicableMoods = moods.filter(
          (mood) => mood.timestamp.slice(0, 7) === dateArray[i]
        )

        applicableMoods.forEach((mood) => {
          tempObject[parseInt(mood.timestamp.slice(8, 10))] = mood.value
        })

        // console.log(applicableMoods)
        valuesObject[dateArray[i]] = tempObject
      }

      setCalendarList(valuesObject)
      // console.log(valuesObject)
    } else {
      var emptyValuesObject = {}
      emptyValuesObject[new Date().toISOString().slice(0, 7)] = {}
      setCalendarList(emptyValuesObject)
    }
  }, [moods])

  return (
    <>
      <h1 className='text-center'>Moods</h1>
      <br />

      <div className='alert alert-info text-center mx-auto'>
        <small>
          Click on a calendar date to set a mood based on how you felt that day.
          See patterns in your mood over time!
        </small>
      </div>

      <Table striped bordered hover size='sm'>
        <thead>
          <tr className='text-center'>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-center'>
            <td>
              <i className='fa-2x fas fa-tired'></i>
            </td>
            <td>
              <i className='fa-2x fas fa-dizzy'></i>
            </td>
            <td>
              <i className='fa-2x fas fa-grimace'></i>
            </td>
            <td>
              <i className='fa-2x fas fa-frown'></i>
            </td>
            <td>
              <i className='fa-2x fas fa-meh'></i>
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: '#811701' }}></td>
            <td style={{ backgroundColor: '#893101' }}></td>
            <td style={{ backgroundColor: '#904F02' }}></td>
            <td style={{ backgroundColor: '#986F02' }}></td>
            <td style={{ backgroundColor: '#A09102' }}></td>
          </tr>
        </tbody>
      </Table>

      <Table striped bordered hover size='sm'>
        <thead>
          <tr className='text-center'>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-center'>
            <td>
              <i className='fa-2x fas fa-smile'></i>
            </td>
            <td>
              <i className='fa-2x fas fa-grin-beam'></i>
            </td>
            <td>
              <i className='fa-2x fas fa-grin-squint'></i>
            </td>
            <td>
              <i className='fa-2x fas fa-laugh-beam'></i>
            </td>
            <td>
              <i className='fa-2x fas fa-grin-stars'></i>
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: '#98A703' }}></td>
            <td style={{ backgroundColor: '#398B34' }}></td>
            <td style={{ backgroundColor: '#2F9B3B' }}></td>
            <td style={{ backgroundColor: '#1BBC4A' }}></td>
            <td style={{ backgroundColor: '#06DD58' }}></td>
          </tr>
        </tbody>
      </Table>

      <br />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <Row>
          {Object.keys(calendarList).map((key) => (
            <Col key={key} sm={12} lg={6}>
              <Calendar
                year={key.split('-')[0]}
                month={key.split('-')[1]}
                setSelectedDate={setSelectedDate}
                setSelectedValue={setSelectedValue}
                toggleShow={toggleShow}
                values={calendarList[key]}
              />
            </Col>
          ))}
        </Row>
      )}
      <Modal show={show} onHide={toggleShow}>
        <Modal.Header style={{ backgroundColor: '#F0F0F0' }} closeButton>
          <Modal.Title>
            <small>
              It's <b>{new Date(selectedDate).toUTCString().split(' 00')[0]}</b>
              . How are you feeling?
            </small>
          </Modal.Title>
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
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
              </Col>
              <Col xs='3'>
                <Form.Control
                  className='text-center'
                  value={selectedValue}
                  disabled
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#F5F5F5' }}>
          <i
            className={`mr-auto fa-3x fas fa-${
              selectedValue === '1'
                ? 'tired'
                : selectedValue === '2'
                ? 'dizzy'
                : selectedValue === '3'
                ? 'grimace'
                : selectedValue === '4'
                ? 'frown'
                : selectedValue === '5'
                ? 'meh'
                : selectedValue === '6'
                ? 'smile'
                : selectedValue === '7'
                ? 'grin-beam'
                : selectedValue === '8'
                ? 'grin-squint'
                : selectedValue === '9'
                ? 'laugh-beam'
                : 'grin-stars'
            }`}
          ></i>
          <Button variant='secondary' onClick={toggleShow}>
            Cancel
          </Button>
          <Button
            variant='primary'
            // disabled={!selectedValue}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MoodsScreen
