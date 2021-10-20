export enum USER_ACTIONS_TYPES {
  ADD_USER = 0,
  UPDATE_USER = 1
}
import {
  USER_ID
} from '../StateTypes';

export function setUserId(data) {
  return { type: USER_ID, payload: data };
}

