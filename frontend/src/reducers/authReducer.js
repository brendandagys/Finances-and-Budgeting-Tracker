import { FETCH_USER } from '../actions/types'

const authReducer = (state = null, action) => {
  // console.log(action)

  switch (action.type) {
    case FETCH_USER:
      return action.payload || false // '' == false
    default:
      return state
  }
}

export default authReducer
