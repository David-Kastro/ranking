import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  ShowMsg      : [],
  HideMsg      : [],
  SetMsg       : ["data"],
  UnsetMsg     : [],
})

const INITIAL_STATE = { show: false, color: 'primary', title: '', msg: '', closeText: '', actionText: '', actionHandler: () => {} };

const ShowMsg = ( state = INITIAL_STATE, action ) => {
    return { 
        ...state,
        show: true,
    }
}

const HideMsg = ( state = INITIAL_STATE, action ) => {
    return { 
        ...state,
        show: false,
    }
}

const SetMsg = ( state = INITIAL_STATE, action ) => {
    const {
        color,
        title,
        msg,
        closeText,
        actionText,
        actionHandler
    } = action.data;

    return { 
        ...state,
        show: true,
        color,
        title,
        msg,
        closeText,
        actionText,
        actionHandler
    }
}

const UnsetMsg = ( state = INITIAL_STATE, action ) => {
    return { 
        ...state,
        show: false,
        color: 'primary.main',
        title: '', 
        msg: '', 
        closeText: '', 
        actionText: '',
        actionHandler: () => {},
    }
}


export default createReducer( INITIAL_STATE, {
  [Types.SHOW_MSG]   : ShowMsg,
  [Types.HIDE_MSG]   : HideMsg,
  [Types.SET_MSG]    : SetMsg,
  [Types.UNSET_MSG]  : UnsetMsg,
})