import { combineReducers } from 'redux';
import notes from './notes';
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
  router: connectRouter(history),
  notes
})
