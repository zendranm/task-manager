import { db } from '../firebase';

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
  let newList: any = new Array();

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
          firebaseId: item.id,
          taskId: item.data().id,
          name: item.data().name,
          status: item.data().status,
        });
      }
    });
  return newList;
}

export async function getTodoTasksOrder(userId: string, listFirestoreId: string) {
  let order: Array<any> = [];

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
  let order: Array<any> = [];

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
  todoTasksOrder?: Array<any>,
  doneTasksOrder?: Array<any>
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

export async function updateTask(userId: string, listFirestoreId: string, taskFirestoreId: string, newStatus: string) {
  await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .doc(listFirestoreId)
    .collection('Tasks')
    .doc(taskFirestoreId)
    .update({
      status: newStatus,
    });
}

export function addTask(newTask: any, ListName: string) {
  // let db = fire.firestore();
  db.collection('Lists')
    .where('Name', '==', ListName)
    .get()
    .then(async (querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        await item.ref.collection('Tasks').add({
          ID: newTask.ID,
          Name: newTask.Name,
          Priority: newTask.Priority,
          Status: newTask.Status,
        });
      }
    });
}
