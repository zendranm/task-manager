import { listModel } from './listModel';

export interface userModel {
  username: String;
  email: String;
  isLogged: boolean;
  lists: Array<listModel>;
  lastListId: number;
}
