import { userModel } from './userModel';
import { listModel } from './listModel';

export const initialUser: userModel = {
  id: 0,
  firstName: 'Tom',
  secondName: 'Hollow',
  lists: [{ id: 0, authorId: 0, name: 'lala' }],
};

export const initialList: listModel = {
  id: 0,
  authorId: 0,
  name: 'New List',
};
