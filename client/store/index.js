
import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import matchdocs from './matchdocs'
import matches from './matches'
import currentLocation from './currentLocation'


const reducer = combineReducers({user, currentLocation, matches, matchdocs})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './matchdocs'
export * from './matches'
export * from './currentLocation'


