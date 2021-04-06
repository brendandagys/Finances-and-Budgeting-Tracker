import {
  PURCHASE_LIST_REQUEST,
  PURCHASE_LIST_SUCCESS,
  PURCHASE_LIST_FAIL,
  PURCHASE_CREATE_REQUEST,
  PURCHASE_CREATE_SUCCESS,
  PURCHASE_CREATE_FAIL,
  PURCHASE_CREATE_RESET,
  PURCHASE_DELETE_REQUEST,
  PURCHASE_DELETE_SUCCESS,
  PURCHASE_DELETE_FAIL,
  PURCHASE_DELETE_RESET,
} from '../actions/types'

export const purchaseListReducer = (state = { purchases: [] }, action) => {
  switch (action.type) {
    case PURCHASE_LIST_REQUEST:
      return { loading: true, purchases: [] }
    case PURCHASE_LIST_SUCCESS:
      return { loading: false, purchases: action.payload }
    case PURCHASE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const purchaseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_CREATE_REQUEST:
      return { loading: true }
    case PURCHASE_CREATE_SUCCESS:
      return { loading: false, success: true, purchase: action.payload }
    case PURCHASE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PURCHASE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const purchaseDeleteReducer = (state = { deleted: [] }, action) => {
  switch (action.type) {
    case PURCHASE_DELETE_REQUEST:
      return { loading: true, deleted: [...state.deleted] }
    case PURCHASE_DELETE_SUCCESS:
      console.log(state)
      return { loading: false, deleted: [...state.deleted, action.payload] }
    case PURCHASE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case PURCHASE_DELETE_RESET:
      return {}
    default:
      return state
  }
}
