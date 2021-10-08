import { ActionType } from './action';
import { AuthorizationStatus } from '../utils/const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {
    email: "test@email.com",
    userName: "Harry Potter",
    avatar: ""
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        test: action.payload
      };
  }

  return state;
};

export { reducer };
