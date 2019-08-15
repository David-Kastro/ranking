import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  LoadProfessors        : [],
  SetProfessors         : ["professors"],
  SetCurrentProfessor   : ["professor"],
  UnsetCurrentProfessor : [],
})

const INITIAL_STATE = { professors: [], currentProfessor: null, loading: false };

const LoadProfessors = ( state = INITIAL_STATE, action ) => {
    return { 
      ...state,
      loading   : true,
    }
}

const SetProfessors = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    professors  : action.professors,
    loading     : false,
  }
}

const SetCurrentProfessor = ( state = INITIAL_STATE, action ) => {

  return { 
    ...state,
    currentProfessor : action.professors,
    loading          : false, 
  }

}

const UnsetCurrentProfessor = ( state = INITIAL_STATE, action ) => {

    return { 
      ...state,
      professors       : [],
      currentProfessor : null,
      loading          : false, 
    }
}

export default createReducer( INITIAL_STATE, {
  [Types.LOAD_PROFESSORS]          : LoadProfessors,
  [Types.SET_PROFESSORS]           : SetProfessors,
  [Types.SET_CURRENT_PROFESSOR]    : SetCurrentProfessor,
  [Types.UNSET_CURRENT_PROFESSOR]  : UnsetCurrentProfessor,
})