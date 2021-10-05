import axios from '../axios'

import {
  MOOD_LIST_REQUEST,
  MOOD_LIST_SUCCESS,
  MOOD_LIST_FAIL,
  MOOD_CREATE_REQUEST,
  MOOD_CREATE_SUCCESS,
  MOOD_CREATE_FAIL,
} from './types'

export const getMoods = (date) => async (dispatch) => {
  try {
    dispatch({ type: MOOD_LIST_REQUEST })

    const { data } = await axios.get(`/api/moods/${date}`)

    dispatch({ type: MOOD_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MOOD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMood = (date, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOOD_CREATE_REQUEST,
    })

    const { data } = await axios.post('/api/moods', {
      date,
      value,
    })

    dispatch({ type: MOOD_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MOOD_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
