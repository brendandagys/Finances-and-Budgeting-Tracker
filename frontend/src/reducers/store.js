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
import {
  accountCreateReducer,
  accountDeleteReducer,
  accountDetailsReducer,
  accountListReducer,
  accountUpdateReducer,
} from './accountReducers'

const reducers = combineReducers({
  auth: authReducer,
  purchaseList: purchaseListReducer,
  purchaseCreate: purchaseCreateReducer,
  purchaseCategoryList: purchaseCategoryListReducer,
  purchaseCategoryCreate: purchaseCategoryCreateReducer,
  purchaseCategoryDelete: purchaseCategoryDeleteReducer,
  accountList: accountListReducer,
  accountDetails: accountDetailsReducer,
  accountCreate: accountCreateReducer,
  accountUpdate: accountUpdateReducer,
  accountDelete: accountDeleteReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
