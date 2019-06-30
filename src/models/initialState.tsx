import { userModel } from './userModel';
import { listModel } from './listModel';

export const initialUser: userModel = {
  username: 'Tom',
  email: 'Hollow',
  lists: [],
  lastListId: 0,
  isLogged: false,
};

export const initialList: listModel = {
  id: 0,
  name: 'New List',
};
