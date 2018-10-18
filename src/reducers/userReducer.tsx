import { initialUser } from '../models/initialState';

const userReducer = (state = initialUser, action: any) => {
  switch (action.type) {
    case 'INPUT_NAME':
      return Object.assign({}, state, { name: action.name });
    case 'INPUT_AGE':
      return Object.assign({}, state, { age: action.age });
    default:
      return state;
  }
};

export default userReducer;
