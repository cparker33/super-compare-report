//  STACK
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

// REDUCERS
import { app_reducer } from '../reducers/app'

// MIDDLEWARE
const enhancer = compose(
  applyMiddleware(thunkMiddleware)
)


export const reducers = combineReducers (
  {
    app_state: app_reducer   
  }
)

const store = createStore(reducers, enhancer)

export default store