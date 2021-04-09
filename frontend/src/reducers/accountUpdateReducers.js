import {
  ACCOUNTUPDATE_LIST_REQUEST,
  ACCOUNTUPDATE_LIST_SUCCESS,
  ACCOUNTUPDATE_LIST_FAIL,
  ACCOUNTUPDATE_CREATE_REQUEST,
  ACCOUNTUPDATE_CREATE_SUCCESS,
  ACCOUNTUPDATE_CREATE_FAIL,
  ACCOUNTUPDATE_CREATE_RESET,
  ACCOUNTUPDATE_DELETE_REQUEST,
  ACCOUNTUPDATE_DELETE_SUCCESS,
  ACCOUNTUPDATE_DELETE_FAIL,
  ACCOUNTUPDATE_DELETE_RESET,
  ACCOUNTUPDATE_UPDATE_REQUEST,
  ACCOUNTUPDATE_UPDATE_SUCCESS,
  ACCOUNTUPDATE_UPDATE_FAIL,
  ACCOUNTUPDATE_UPDATE_RESET,
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

export const accountUpdateUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNTUPDATE_UPDATE_REQUEST:
      return { loading: true }
    case ACCOUNTUPDATE_UPDATE_SUCCESS:
      return { loading: false, success: true, accountUpdate: action.payload }
    case ACCOUNTUPDATE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNTUPDATE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const accountUpdateDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNTUPDATE_DELETE_REQUEST:
      return { loading: true }
    case ACCOUNTUPDATE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ACCOUNTUPDATE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNTUPDATE_DELETE_RESET:
      return {}
    default:
      return state
  }
}
