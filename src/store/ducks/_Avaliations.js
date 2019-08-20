import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  LoadAvaliations        : [],
  SetAvaliations         : ["avaliations"],
  UnsetAvaliations       : [],
})

const INITIAL_STATE = { avaliations: [], empty: true, loading: false };

const LoadAvaliations = ( state = INITIAL_STATE, action ) => {
    return { 
      ...state,
      loading   : true,
    }
}

const SetAvaliations = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    avaliations : action.avaliations,
    empty       : action.avaliations.length === 0,
    loading     : false,
  }
}

const UnsetAvaliations = ( state = INITIAL_STATE, action ) => {

    return { 
      ...state,
      avaliations  : [],
      empty        : true,
      loading      : false, 
    }
}

export default createReducer( INITIAL_STATE, {
  [Types.LOAD_AVALIATIONS]  : LoadAvaliations,
  [Types.SET_AVALIATIONS]   : SetAvaliations,
  [Types.UNSET_AVALIATIONS] : UnsetAvaliations,
})