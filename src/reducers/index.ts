import { combineReducers } from 'redux';
import tournaments from './tournaments';
import errors from './errors';
import loading from './loading';

const rootReducer = combineReducers({
  tournaments,
  errors,
  loading,
});

export default rootReducer;
