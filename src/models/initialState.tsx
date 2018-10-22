import { userModel } from './userModel';
import { listModel } from './listModel';

export const initialUser: userModel = {
  id: 0,
  firstName: 'Tom',
  secondName: 'Hollow',
  lists: [
    { id: 0, authorId: 0, name: 'aaa' },
    { id: 1, authorId: 1, name: 'bbb' },
    { id: 2, authorId: 2, name: 'ccc' },
  ],
};

export const initialList: listModel = {
  id: 0,
  authorId: 0,
  name: 'New List',
};
