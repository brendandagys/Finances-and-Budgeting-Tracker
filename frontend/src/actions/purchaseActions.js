import axios from 'axios'

import {
  PURCHASE_LIST_REQUEST,
  PURCHASE_LIST_SUCCESS,
  PURCHASE_LIST_FAIL,
  PURCHASE_CREATE_REQUEST,
  PURCHASE_CREATE_SUCCESS,
  PURCHASE_CREATE_FAIL,
  PURCHASE_DELETE_REQUEST,
  PURCHASE_DELETE_SUCCESS,
  PURCHASE_DELETE_FAIL,
} from './types'

export const getPurchases = () => async (dispatch) => {
  try {
    dispatch({ type: PURCHASE_LIST_REQUEST })

    const { data } = await axios.get('/api/purchases')

    dispatch({ type: PURCHASE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PURCHASE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPurchase = (purchase) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PURCHASE_CREATE_REQUEST,
    })

    const { data } = await axios.post('/api/purchases', purchase)

    dispatch({ type: PURCHASE_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PURCHASE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePurchase = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PURCHASE_DELETE_REQUEST,
    })

    await axios.delete(`/api/purchases/${id}`)

    dispatch({ type: PURCHASE_DELETE_SUCCESS, payload: id })
  } catch (error) {
    dispatch({
      type: PURCHASE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
