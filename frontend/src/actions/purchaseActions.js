import axios from 'axios'

import {
  PURCHASE_LIST_REQUEST,
  PURCHASE_LIST_SUCCESS,
  PURCHASE_LIST_FAIL,
  PURCHASE_CREATE_REQUEST,
  PURCHASE_CREATE_SUCCESS,
  PURCHASE_CREATE_FAIL,
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
