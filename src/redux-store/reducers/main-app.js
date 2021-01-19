import {produce} from 'immer';
import {LOG_USER} from '../actions/actionTypes';

const initialState = {
  logged_user: {
    token: '',
    email: '',
    id: '',
  },
};

const main_app = (state = initialState, action) => {
  switch (action.type) {
    case LOG_USER:
      return produce(state, (newState) => {
        // console.log('LOGGED USER Payload:', action.payload);
        newState.logged_user.token = action.payload.token;
        newState.logged_user.email = action.payload.email;
        newState.logged_user.id = action.payload.id;
        // console.log(newState);
      });

    default:
      return state;
  }
};

export default main_app;
