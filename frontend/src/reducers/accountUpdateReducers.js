import {
  ACCOUNTUPDATE_LIST_REQUEST,
  ACCOUNTUPDATE_LIST_SUCCESS,
  ACCOUNTUPDATE_LIST_FAIL,
  ACCOUNTUPDATE_CREATE_REQUEST,
  ACCOUNTUPDATE_CREATE_SUCCESS,
  ACCOUNTUPDATE_CREATE_FAIL,
  ACCOUNTUPDATE_CREATE_RESET,
} from '../actions/types'

export const accountUpdateListReducer = (
  state = { accountUpdates: [] },
  action
) => {
  switch (action.type) {
    case ACCOUNTUPDATE_LIST_REQUEST:
      return { loading: true, accountUpdates: [] }
    case ACCOUNTUPDATE_LIST_SUCCESS:
      return { loading: false, accountUpdates: action.payload }
    case ACCOUNTUPDATE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const accountUpdateCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNTUPDATE_CREATE_REQUEST:
      return { loading: true }
    case ACCOUNTUPDATE_CREATE_SUCCESS:
      return { loading: false, success: true, accountUpdate: action.payload }
    case ACCOUNTUPDATE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNTUPDATE_CREATE_RESET:
      return {}
    default:
      return state
  }
}
