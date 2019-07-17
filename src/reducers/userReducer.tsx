import { initialUser } from '../models/initialState';

const userReducer = (state = initialUser, action: any) => {
  const { id, email, username, lists, newId, isLogged } = action;
  switch (action.type) {
    case 'CHANGE_ID':
      return { ...state, id: id };
    case 'CHANGE_USERNAME':
      return { ...state, username: username };
    case 'CHANGE_EMAIL':
      return { ...state, email: email };
    case 'CHANGE_LISTS':
      return { ...state, lists: lists };
    case 'CHANGE_LAST_LIST_ID':
      return { ...state, lastListId: newId };
    case 'CHANGE_IS_LOGGED':
      return { ...state, isLogged: isLogged };
    default:
      return state;
  }
};

export default userReducer;
