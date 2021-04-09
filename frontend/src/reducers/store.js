import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { authReducer } from './authReducers'
import {
  purchaseCreateReducer,
  purchaseDeleteReducer,
  purchaseDetailsReducer,
  purchaseListReducer,
  purchaseUpdateReducer,
} from './purchaseReducers'
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
import {
  accountUpdateListReducer,
  accountUpdateCreateReducer,
  accountUpdateUpdateReducer,
  accountUpdateDeleteReducer,
} from './accountUpdateReducers'

const reducers = combineReducers({
  auth: authReducer,
  purchaseList: purchaseListReducer,
  purchaseDetails: purchaseDetailsReducer,
  purchaseCreate: purchaseCreateReducer,
  purchaseUpdate: purchaseUpdateReducer,
  purchaseDelete: purchaseDeleteReducer,
  purchaseCategoryList: purchaseCategoryListReducer,
  purchaseCategoryCreate: purchaseCategoryCreateReducer,
  purchaseCategoryDelete: purchaseCategoryDeleteReducer,
  accountList: accountListReducer,
  accountDetails: accountDetailsReducer,
  accountCreate: accountCreateReducer,
  accountUpdate: accountUpdateReducer,
  accountDelete: accountDeleteReducer,
  accountUpdateList: accountUpdateListReducer,
  accountUpdateCreate: accountUpdateCreateReducer,
  accountUpdateUpdate: accountUpdateUpdateReducer,
  accountUpdateDelete: accountUpdateDeleteReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
