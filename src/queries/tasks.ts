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

export async function addTask(userId: string, listFirestoreId: string, newTask: any) {
  await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .doc(listFirestoreId)
    .collection('Tasks')
    .add({
      id: newTask.id,
      name: newTask.name,
    })
    .then((response: any) => {
      console.log(response);
      return response.id;
    });
}
