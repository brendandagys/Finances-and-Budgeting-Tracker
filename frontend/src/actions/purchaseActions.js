import axios from 'axios'

import {
  PURCHASE_LIST_REQUEST,
  PURCHASE_LIST_SUCCESS,
  PURCHASE_LIST_FAIL,
} from './types'

export const listPurchases = () => async (dispatch) => {
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
