import { initialUser } from '../models/initialState';

const userReducer = (state = initialUser, action: any) => {
  switch (action.type) {
    case 'INPUT_FIRST_NAME':
      return { ...state, firstName: action.firstName };
    case 'INPUT_SECOND_NAME':
      return { ...state, secondName: action.secondName };
    case 'ADD_NEW_LIST':
      return { ...state, lists: action.newList };
    case 'CHANGE_LAST_LIST_ID':
      return { ...state, lastListId: action.newId };
    default:
      return state;
  }
};

export default userReducer;
