import {
  PURCHASE_CATEGORY_LIST_REQUEST,
  PURCHASE_CATEGORY_LIST_SUCCESS,
  PURCHASE_CATEGORY_LIST_FAIL,
  PURCHASE_CATEGORY_CREATE_REQUEST,
  PURCHASE_CATEGORY_CREATE_SUCCESS,
  PURCHASE_CATEGORY_CREATE_FAIL,
  PURCHASE_CATEGORY_CREATE_RESET,
  PURCHASE_CATEGORY_DELETE_REQUEST,
  PURCHASE_CATEGORY_DELETE_SUCCESS,
  PURCHASE_CATEGORY_DELETE_FAIL,
  PURCHASE_CATEGORY_DELETE_RESET,
} from '../actions/types'

export const purchaseCategoryListReducer = (
  state = { purchaseCategories: [] },
  action
) => {
  switch (action.type) {
    case PURCHASE_CATEGORY_LIST_REQUEST:
      return { loading: true, purchaseCategories: [] }
    case PURCHASE_CATEGORY_LIST_SUCCESS:
      return { loading: false, purchaseCategories: action.payload }
    case PURCHASE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const purchaseCategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_CATEGORY_CREATE_REQUEST:
      return { loading: true }
    case PURCHASE_CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, purchaseCategory: action.payload }
    case PURCHASE_CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PURCHASE_CATEGORY_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const purchaseCategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_CATEGORY_DELETE_REQUEST:
      return { loading: true }
    case PURCHASE_CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PURCHASE_CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case PURCHASE_CATEGORY_DELETE_RESET:
      return {}
    default:
      return state
  }
}
