import {
  MOOD_LIST_REQUEST,
  MOOD_LIST_SUCCESS,
  MOOD_LIST_FAIL,
  MOOD_CREATE_REQUEST,
  MOOD_CREATE_SUCCESS,
  MOOD_CREATE_FAIL,
} from '../actions/types'

export const moodListReducer = (state = { moods: [] }, action) => {
  switch (action.type) {
    case MOOD_LIST_REQUEST:
      return { loading: true, moods: [] }
    case MOOD_LIST_SUCCESS:
      return { moods: action.payload }
    case MOOD_LIST_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const moodCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MOOD_CREATE_REQUEST:
      return { loading: true }
    case MOOD_CREATE_SUCCESS:
      return { mood: action.payload }
    case MOOD_CREATE_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}
