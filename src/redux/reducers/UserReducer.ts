import {
  USER_ID
} from '../StateTypes';
const initialState = {userId: 'dummy' };

export function UserReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
}