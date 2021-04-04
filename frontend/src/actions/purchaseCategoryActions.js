import axios from 'axios'

import {
  PURCHASE_CATEGORY_LIST_REQUEST,
  PURCHASE_CATEGORY_LIST_SUCCESS,
  PURCHASE_CATEGORY_LIST_FAIL,
  PURCHASE_CATEGORY_CREATE_REQUEST,
  PURCHASE_CATEGORY_CREATE_SUCCESS,
  PURCHASE_CATEGORY_CREATE_FAIL,
  PURCHASE_CATEGORY_DELETE_REQUEST,
  PURCHASE_CATEGORY_DELETE_SUCCESS,
  PURCHASE_CATEGORY_DELETE_FAIL,
} from './types'

export const getPurchaseCategories = () => async (dispatch) => {
  try {
    dispatch({ type: PURCHASE_CATEGORY_LIST_REQUEST })

    const { data } = await axios.get('/api/purchase-categories')

    dispatch({ type: PURCHASE_CATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PURCHASE_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPurchaseCategory = (purchaseCategory) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PURCHASE_CATEGORY_CREATE_REQUEST,
    })

    const { data } = await axios.post(
      '/api/purchase-categories',
      purchaseCategory
    )

    dispatch({ type: PURCHASE_CATEGORY_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PURCHASE_CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePurchaseCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PURCHASE_CATEGORY_DELETE_REQUEST,
    })

    await axios.delete(`/api/purchase-categories/${id}`)

    dispatch({ type: PURCHASE_CATEGORY_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PURCHASE_CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
