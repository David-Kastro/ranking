import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducers from './_Authentication';
import loadingReducers from './_Loading';
import msgReducers from './_Menssage';

export default ( history ) => combineReducers({
  
  authReducers,
  loadingReducers,
  msgReducers,

  router: connectRouter( history ),
});