import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import authReducers from './Authentication'

export default ( history ) => combineReducers({
  
  authReducers,

  router: connectRouter( history ),
});