import { listModel } from './listModel';

export interface userModel {
  id: number;
  firstName: String;
  secondName: String;
  lastListId: number;
  lists: Array<listModel>;
}
