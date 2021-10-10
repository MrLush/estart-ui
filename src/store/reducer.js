import { ActionType } from './action';
import { AuthorizationStatus } from '../utils/const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {}
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
