import { listModel } from '../models/listModel';
import { signOut } from '../queries/auth';
import { Dispatch } from 'redux';

export const changeName = (username: string) => ({
  type: 'CHANGE_USERNAME',
  username,
});

export const changeAge = (email: string) => ({
  type: 'CHANGE_EMAIL',
  email,
});

export const addNewList = (newList: Array<listModel>) => ({
  type: 'ADD_NEW_LIST',
  newList,
});

export const changeLastListId = (newId: Number) => ({
  type: 'CHANGE_LAST_LIST_ID',
  newId,
});

export const changeIsLogged = (isLogged: boolean) => ({
  type: 'CHANGE_IS_LOGGED',
  isLogged,
});

export function logOut() {
  return (dispatch: Dispatch) => {
    signOut();
    dispatch(changeIsLogged(false));
  };
}
