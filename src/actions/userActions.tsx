import { listModel } from '../models/listModel';

export const changeUsername = (username: string) => ({
  type: 'CHANGE_USERNAME',
  username,
});

export const changeEmail = (email: string) => ({
  type: 'CHANGE_EMAIL',
  email,
});

export const changeLists = (lists: Array<listModel>) => ({
  type: 'CHANGE_LISTS',
  lists,
});

export const changeLastListId = (newId: Number) => ({
  type: 'CHANGE_LAST_LIST_ID',
  newId,
});

export const changeIsLogged = (isLogged: boolean) => ({
  type: 'CHANGE_IS_LOGGED',
  isLogged,
});
