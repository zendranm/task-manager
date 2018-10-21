import { listModel } from './listModel';

export interface userModel {
  id: number;
  firstName: String;
  secondName: String;
  lists: Array<listModel>;
}
