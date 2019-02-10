import { userModel } from './userModel';
import { listModel } from './listModel';

export const initialUser: userModel = {
  id: 99,
  firstName: 'Tom',
  secondName: 'Hollow',
  lists: [],
  lastListId: 0,
};

export const initialList: listModel = {
  id: 0,
  authorId: 0,
  name: 'New List',
};
