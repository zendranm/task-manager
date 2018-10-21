import { initialUser } from '../models/initialState';

const userReducer = (state = initialUser, action: any) => {
  switch (action.type) {
    case 'INPUT__FIRST_NAME':
      return Object.assign({}, state, { firstName: action.firstName });
    case 'INPUT_SECOND_NAME':
      return Object.assign({}, state, { secondName: action.secondName });
    default:
      return state;
  }
};

export default userReducer;
