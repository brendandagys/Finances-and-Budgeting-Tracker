import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { authReducer } from './authReducers'
import { purchaseCreateReducer, purchaseListReducer } from './purchaseReducers'
import {
  purchaseCategoryCreateReducer,
  purchaseCategoryDeleteReducer,
  purchaseCategoryListReducer,
} from './purchaseCategoryReducers'

const reducers = combineReducers({
  auth: authReducer,
  purchaseList: purchaseListReducer,
  purchaseCreate: purchaseCreateReducer,
  purchaseCategoryList: purchaseCategoryListReducer,
  purchaseCategoryCreate: purchaseCategoryCreateReducer,
  purchaseCategoryDelete: purchaseCategoryDeleteReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
