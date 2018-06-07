import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import {
  createLogger
} from 'redux-logger';
import {
  default as thunkMiddleware
} from 'redux-thunk';
import {
  composeWithDevTools
} from 'redux-devtools-extension';
import user from './user'
import doctors from './doctors'
import matchdocs from './matchdocs'
import matches from './matches'


const reducer = combineReducers({user, doctors, matchdocs, matches})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))


const persistedState = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : {};

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined;
  }
  return reducer(state, action)
}

const store = createStore(rootReducer, persistedState, middleware);

store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())));

export default store
export * from './user'
export * from './doctors'
export * from './matchdocs'
export * from './matches'


