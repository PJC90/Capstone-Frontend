import { combineReducers, configureStore } from '@reduxjs/toolkit'

const bigReducer = combineReducers({})

const store = configureStore({
  reducer: bigReducer,
})

export default store
