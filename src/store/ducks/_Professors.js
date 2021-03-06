import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  LoadProfessors        : [],
  SetProfessors         : ["professors"],
  SetCurrentProfessor   : ["uid", "professor"],
  UnsetCurrentProfessor : [],
})

const INITIAL_STATE = { professors: [], currentProfessor: null, isSetted: false, loading: false };

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
    isSetted    : true,
    loading     : false,
  }
}

const SetCurrentProfessor = ( state = INITIAL_STATE, action ) => {

  const professorData = action.professor
    ? action.professor
    : state.professors.filter( professor => professor.uid === action.uid )[0];

  return { 
    ...state,
    currentProfessor : professorData,
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