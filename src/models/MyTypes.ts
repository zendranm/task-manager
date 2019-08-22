export interface taskModel {
  firestoreId: string;
  taskId: number;
  name: string;
}

export interface listModel {
  id: number;
  firestoreId: string;
  name: string;
  percentage: number;
  todoTaskOrder: Array<number>;
  doneTaskOrder: Array<number>;
}
