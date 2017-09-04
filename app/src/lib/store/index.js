import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { thunk as thunkMiddleware } from 'redux-thunk';


const reducer = combineReducers({});

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
  );

  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export default store;
