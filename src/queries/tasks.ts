import { db } from '../firebase';

export async function getAllTasks(userId: string, listName: string) {
  let newList: any = new Array();

  await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .where('name', '==', listName)
    .get()
    .then(async (querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        await item.ref
          .collection('Tasks')
          .get()
          .then((querySnapshot: any) => {
            for (const item of querySnapshot.docs) {
              newList.push({ id: item.id, name: item.data().name });
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
