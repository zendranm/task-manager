import { listModel } from './listModel';

export interface userModel {
  id: string;
  username: String;
  email: String;
  isLogged: boolean;
  lists: Array<listModel>;
  lastListId: number;
}
