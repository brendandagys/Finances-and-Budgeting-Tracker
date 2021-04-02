import {
  PURCHASE_LIST_REQUEST,
  PURCHASE_LIST_SUCCESS,
  PURCHASE_LIST_FAIL,
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
