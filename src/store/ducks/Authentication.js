import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  SigninSuccess     : ["user"],
  SigninError       : ["error"],
  SigninLoading     : ["loading"],
  SignoutSuccess    : [],
  SignoutError      : ["error"],
  SignoutLoading    : ["loading"],
  SetLoading        : [],
  UnsetLoading      : [],
})

const INITIAL_STATE = { loading: true, isAuthenticated: false, user: null, error: null };

const SigninSuccess = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    loading         : false,
    isAuthenticated : true, 
    error           : null,
    user            : action.user,  
  }
}

const SigninError = ( state = INITIAL_STATE, action ) => {

  console.log( action.error );
  return { 
    ...state,
    loading         : false, 
    error           : "Signin Error!",
  }

}

const SigninLoading = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    loading         : true, 
    error           : "Signing In!",
      
  }
}

const SignoutSuccess = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    loading         : false,
    isAuthenticated : false, 
    error           : null,
    user            : null,  
  }
}

const SignoutError = ( state = INITIAL_STATE, action ) => {

  console.log( action.error );
  return { 
    ...state,
    loading         : false, 
    error           : "Signout Error!",
  }
}

const SignoutLoading = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    loading         : true, 
    error           : "Signing Out!", 
  }
}

const SetLoading = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    loading         : true,
  }
}

const UnsetLoading = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    loading         : false,
  }
}

export default createReducer( INITIAL_STATE, {
  [Types.SIGNIN_SUCCESS]  : SigninSuccess,
  [Types.SIGNIN_ERROR]    : SigninError,
  [Types.SIGNIN_LOADING]  : SigninLoading,
  [Types.SIGNOUT_SUCCESS] : SignoutSuccess,
  [Types.SIGNOUT_ERROR]   : SignoutError,
  [Types.SIGNOUT_LOADING] : SignoutLoading,
  [Types.SET_LOADING]     : SetLoading,
  [Types.UNSET_LOADING]   : UnsetLoading,
})