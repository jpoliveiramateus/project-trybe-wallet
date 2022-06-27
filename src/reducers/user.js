// Esse reducer será responsável por tratar as informações da pessoa usuária

import { SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const emailReducer = (state = INITIAL_STATE, action) => {
  switch (action?.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default emailReducer;
