import { listModel } from '../models/listModel';

export const changeName = (firstName: string) => ({
  type: 'INPUT_FIRST_NAME',
  firstName,
});

export const changeAge = (secondName: number) => ({
  type: 'INPUT_SECOND_NAME',
  secondName,
});

export const addNewList = (newList: Array<listModel>) => ({
  type: 'ADD_NEW_LIST',
  newList,
});
