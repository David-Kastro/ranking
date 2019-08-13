import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  SigninSuccess     : ["user"],
  SigninError       : [],
  SigninLoading     : [],
  SignoutSuccess    : [],
  SignoutError      : [],
  SignoutLoading    : [],
})

const INITIAL_STATE = { loading: false, isAuthenticated: false, user: null };

const SigninSuccess = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    loading         : false,
    isAuthenticated : true, 
    user            : action.user,  
  }
}

const SigninError = ( state = INITIAL_STATE, action ) => {

  return { 
    ...state,
    loading         : false, 
  }

}

const SigninLoading = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    loading         : true,      
  }
}

const SignoutSuccess = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    loading         : false,
    isAuthenticated : false, 
    user            : null,  
  }
}

const SignoutError = ( state = INITIAL_STATE, action ) => {

  return { 
    ...state,
    loading         : false, 
  }
}

const SignoutLoading = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    loading         : true,
  }
}

export default createReducer( INITIAL_STATE, {
  [Types.SIGNIN_SUCCESS]  : SigninSuccess,
  [Types.SIGNIN_ERROR]    : SigninError,
  [Types.SIGNIN_LOADING]  : SigninLoading,
  [Types.SIGNOUT_SUCCESS] : SignoutSuccess,
  [Types.SIGNOUT_ERROR]   : SignoutError,
  [Types.SIGNOUT_LOADING] : SignoutLoading,
})