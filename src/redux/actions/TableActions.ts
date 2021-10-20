import { SET_ROLE } from '../StateTypes';
import { ActionTblType } from '../../types/DatabaseTypes';

export function setRoleSelected(data) {
  return { type: SET_ROLE, payload: data };
}

