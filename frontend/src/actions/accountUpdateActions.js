import axios from 'axios'

import {
  ACCOUNTUPDATE_LIST_REQUEST,
  ACCOUNTUPDATE_LIST_SUCCESS,
  ACCOUNTUPDATE_LIST_FAIL,
  ACCOUNTUPDATE_CREATE_REQUEST,
  ACCOUNTUPDATE_CREATE_SUCCESS,
  ACCOUNTUPDATE_CREATE_FAIL,
  ACCOUNTUPDATE_DELETE_REQUEST,
  ACCOUNTUPDATE_DELETE_SUCCESS,
  ACCOUNTUPDATE_DELETE_FAIL,
  ACCOUNTUPDATE_UPDATE_REQUEST,
  ACCOUNTUPDATE_UPDATE_SUCCESS,
  ACCOUNTUPDATE_UPDATE_FAIL,
} from './types'

export const getAccountUpdates = () => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNTUPDATE_LIST_REQUEST })

    const { data } = await axios.get('/api/account-updates')

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

export const createAccountUpdate = (accountUpdate) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ACCOUNTUPDATE_CREATE_REQUEST,
    })

    const { data } = await axios.post('/api/account-updates', accountUpdate)

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

export const updateAccountUpdate = (accountUpdate) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ACCOUNTUPDATE_UPDATE_REQUEST,
    })

    const { data } = await axios.patch(
      `/api/account-updates/${accountUpdate._id}`,
      accountUpdate
    )

    dispatch({ type: ACCOUNTUPDATE_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCOUNTUPDATE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAccountUpdate = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ACCOUNTUPDATE_DELETE_REQUEST,
    })

    await axios.delete(`/api/account-updates/${id}`)

    dispatch({ type: ACCOUNTUPDATE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ACCOUNTUPDATE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
