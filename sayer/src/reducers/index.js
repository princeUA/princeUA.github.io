import {combineReducers} from 'redux';
import windowReducer from './windowReducer';
import itemReducer from './itemReducer';

const allReducers = combineReducers({
  windowReducer: windowReducer,
  itemReducer: itemReducer
});

export default allReducers;
