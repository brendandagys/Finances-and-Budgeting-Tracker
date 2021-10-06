import axios from '../axios'

import {
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_LIST_FAIL,
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_CREATE_FAIL,
  ACCOUNT_DELETE_REQUEST,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
} from './types'

export const getAccounts = () => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNT_LIST_REQUEST })

    const { data } = await axios.get('/accounts')

    dispatch({ type: ACCOUNT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCOUNT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAccountDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNT_DETAILS_REQUEST })

    const { data } = await axios.get(`/accounts/${id}`)

    dispatch({ type: ACCOUNT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCOUNT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createAccount = (account) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_CREATE_REQUEST,
    })

    const { data } = await axios.post('/accounts', account)

    dispatch({ type: ACCOUNT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCOUNT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateAccount = (account) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_UPDATE_REQUEST,
    })

    const { data } = await axios.patch(`/accounts/${account._id}`, account)

    dispatch({ type: ACCOUNT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCOUNT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAccount = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ACCOUNT_DELETE_REQUEST,
    })

    await axios.delete(`/accounts/${id}`)

    dispatch({ type: ACCOUNT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ACCOUNT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
