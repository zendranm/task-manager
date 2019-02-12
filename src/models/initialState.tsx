import { userModel } from './userModel';
import { listModel } from './listModel';

export const initialUser: userModel = {
  firstName: 'Tom',
  secondName: 'Hollow',
  lists: [],
  lastListId: 0,
};

export const initialList: listModel = {
  id: 0,
  name: 'New List',
};
