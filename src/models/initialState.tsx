import { userModel } from './userModel';
import { listModel } from './listModel';

export const initialUser: userModel = {
  id: 99,
  firstName: 'Tom',
  secondName: 'Hollow',
  lists: [
    { id: 0, authorId: 0, name: 'Home' },
    { id: 1, authorId: 1, name: 'School' },
    { id: 2, authorId: 2, name: 'Schoping' },
  ],
};

export const initialList: listModel = {
  id: 0,
  authorId: 0,
  name: 'New List',
};
