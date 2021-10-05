import axios from '../axios'

import {
  ACCOUNTUPDATE_LIST_REQUEST,
  ACCOUNTUPDATE_LIST_SUCCESS,
  ACCOUNTUPDATE_LIST_FAIL,
  ACCOUNTUPDATE_CREATE_REQUEST,
  ACCOUNTUPDATE_CREATE_SUCCESS,
  ACCOUNTUPDATE_CREATE_FAIL,
  ACCOUNTUPDATE_LIST_ALL_REQUEST,
  ACCOUNTUPDATE_LIST_ALL_SUCCESS,
  ACCOUNTUPDATE_LIST_ALL_FAIL,
} from './types'

export const getAccountUpdates = (date) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNTUPDATE_LIST_REQUEST })

    const { data } = await axios.get(`/api/account-updates/${date}`)

    dispatch({ type: ACCOUNTUPDATE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCOUNTUPDATE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAllAccountUpdates = () => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNTUPDATE_LIST_ALL_REQUEST })

    const { data } = await axios.get('/api/account-updates')

    dispatch({ type: ACCOUNTUPDATE_LIST_ALL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCOUNTUPDATE_LIST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createAccountUpdate =
  (date, account_id, name, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ACCOUNTUPDATE_CREATE_REQUEST,
      })

      const { data } = await axios.post('/api/account-updates', {
        date,
        account_id,
        name,
        value,
      })

      dispatch({ type: ACCOUNTUPDATE_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ACCOUNTUPDATE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
