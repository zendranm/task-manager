import { listModel } from './listModel';

export interface userModel {
  firstName: String;
  secondName: String;
  lastListId: number;
  lists: Array<listModel>;
}
