import { db } from '../firebase';

export async function createNewUser(username: string, email: string) {
  db.collection('Users').add({
    username: username,
    email: email,
  });
}

export async function getAllLists(email: string) {
  let newList: any = new Array();

  await db
    .collection('Users')
    .where('email', '==', email)
    .get()
    .then(async (querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        await item.ref
          .collection('Lists')
          .orderBy('id', 'asc')
          .get()
          .then((querySnapshot: any) => {
            for (const item of querySnapshot.docs) {
              newList.push({ id: item.data().id, name: item.data().name });
            }
          });
      }
    });
  return newList;
}

export async function getLastId(email: string, onChangeLastListId: any) {
  await db
    .collection('Users')
    .where('email', '==', email)
    .get()
    .then(async (querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        await item.ref
          .collection('Lists')
          .orderBy('id', 'desc')
          .limit(1)
          .get()
          .then((querySnapshot: any) => {
            for (const item of querySnapshot.docs) {
              onChangeLastListId(item.data().id);
            }
          });
      }
    });
}

export function addList(email: string, lastListId: number, newListName: string) {
  db.collection('Users')
    .where('email', '==', email)
    .get()
    .then((querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        item.ref.collection('Lists').add({
          id: lastListId + 1,
          name: newListName,
        });
      }
    });
}

export function deleteList(email: string, listId: number) {
  db.collection('Users')
    .where('email', '==', email)
    .get()
    .then((querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        item.ref
          .collection('Lists')
          .where('id', '==', listId)
          .get()
          .then(function(querySnapshot: any) {
            querySnapshot.forEach(function(doc: any) {
              doc.ref.delete();
            });
          });
      }
    });
}

export async function getAllTasks(name: string) {
  let newList: any = new Array();
  // let db = fire.firestore();

  await db
    .collection('Lists')
    .where('Name', '==', name)
    .get()
    .then(async (querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        await item.ref
          .collection('Tasks')
          .orderBy('ID', 'desc')
          .get()
          .then((querySnapshot: any) => {
            for (const item of querySnapshot.docs) {
              newList.push({ id: item.data().ID, name: item.data().Name });
            }
          });
      }
    });
  return newList;
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
