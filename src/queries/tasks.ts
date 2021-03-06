import { db } from '../firebase';
import { taskModel } from '../models/MyTypes';

export async function getListFirestoreId(userId: string, listName: string) {
  let firestoreId: string = '';

  await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .where('name', '==', listName)
    .get()
    .then((querySnapshot: any) => {
      firestoreId = querySnapshot.docs[0].id;
    });
  return firestoreId;
}

export async function getAllTasks(userId: string, listFirestoreId: string) {
  let newList: Array<taskModel> = new Array();

  await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .doc(listFirestoreId)
    .collection('Tasks')
    .get()
    .then((querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        newList.push({
          firestoreId: item.id,
          taskId: item.data().id,
          name: item.data().name,
        });
      }
    });
  return newList;
}

export async function getTodoTasksOrder(userId: string, listFirestoreId: string) {
  let order: Array<number> = [];

  await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .doc(listFirestoreId)
    .get()
    .then((querySnapshot: any) => {
      order = querySnapshot.data().todoTasksOrder;
    });
  return order;
}

export async function getDoneTasksOrder(userId: string, listFirestoreId: string) {
  let order: Array<number> = [];

  await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .doc(listFirestoreId)
    .get()
    .then((querySnapshot: any) => {
      order = querySnapshot.data().doneTasksOrder;
    });
  return order;
}

export async function saveNewOrders(
  userId: string,
  listFirestoreId: string,
  todoTasksOrder?: Array<number>,
  doneTasksOrder?: Array<number>
) {
  if (todoTasksOrder != undefined && doneTasksOrder != undefined) {
    await db
      .collection('Users')
      .doc(userId)
      .collection('Lists')
      .doc(listFirestoreId)
      .update({
        todoTasksOrder: todoTasksOrder,
        doneTasksOrder: doneTasksOrder,
      });
  } else if (todoTasksOrder == undefined && doneTasksOrder != undefined) {
    await db
      .collection('Users')
      .doc(userId)
      .collection('Lists')
      .doc(listFirestoreId)
      .update({
        doneTasksOrder: doneTasksOrder,
      });
  } else if (todoTasksOrder != undefined && doneTasksOrder == undefined) {
    await db
      .collection('Users')
      .doc(userId)
      .collection('Lists')
      .doc(listFirestoreId)
      .update({
        todoTasksOrder: todoTasksOrder,
      });
  } else {
    console.log('impossible');
  }
}

export async function addTask(userId: string, listFirestoreId: string, newTask: taskModel) {
  const response = await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .doc(listFirestoreId)
    .collection('Tasks')
    .add({
      id: newTask.taskId,
      name: newTask.name,
    });
  return response.id;
}

export function deleteTask(userId: string, listFirestoreId: string, taskFirestoreId: string) {
  db.collection('Users')
    .doc(userId)
    .collection('Lists')
    .doc(listFirestoreId)
    .collection('Tasks')
    .doc(taskFirestoreId)
    .delete();
}
