import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './modules/root';
const epicMiddleware = createEpicMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();
export default createStore(
  createRootReducer(history),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      epicMiddleware
    ),
  )
);
epicMiddleware.run(rootEpic);
