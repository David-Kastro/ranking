import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  StartLoading      : [],
  UnsetLoadingOnly  : [],
  FinishLoading     : [],
})

const INITIAL_STATE = { isLoading: false, isLoadingFinished: true };

const StartLoading = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    isLoading         : true,
    isLoadingFinished : false,
  }
}

const UnsetLoadingOnly = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    isLoading         : false,
  }
}

const FinishLoading = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    isLoading         : false,
    isLoadingFinished : true,
  }
}

export default createReducer( INITIAL_STATE, {
  [Types.START_LOADING]      : StartLoading,
  [Types.UNSET_LOADING_ONLY] : UnsetLoadingOnly,
  [Types.FINISH_LOADING]     : FinishLoading,
})