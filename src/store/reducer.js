import { ActionType } from './action';
import { AuthorizationStatus } from '../utils/const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {}
};

const reducer = (state = initialState, action) => {
  if (action.type === ActionType.REQUIRED_AUTHORIZATION) {
    return {
      ...state,
      authorizationStatus: action.payload
    };
  } 
  return state;
};

export { reducer };
