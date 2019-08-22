import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  LoadAvaliations        : [],
  SetAvaliations         : ["avaliations", "uid"],
  UnsetAvaliations       : [],
})

const INITIAL_STATE = { avaliations: [], empty: true, loading: false, yourAvaliation: null };

const LoadAvaliations = ( state = INITIAL_STATE, action ) => {
    return { 
      ...state,
      loading   : true,
    }
}

const SetAvaliations = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    avaliations    : action.avaliations,
    yourAvaliation : action.avaliations.filter(avaliation => avaliation.de === action.uid)[0],
    empty          : action.avaliations.length === 0,
    loading        : false,
  }
}

const UnsetAvaliations = ( state = INITIAL_STATE, action ) => {

    return { 
      ...state,
      avaliations    : [],
      yourAvaliation : null,
      empty          : true,
      loading        : false, 
    }
}

export default createReducer( INITIAL_STATE, {
  [Types.LOAD_AVALIATIONS]  : LoadAvaliations,
  [Types.SET_AVALIATIONS]   : SetAvaliations,
  [Types.UNSET_AVALIATIONS] : UnsetAvaliations,
})