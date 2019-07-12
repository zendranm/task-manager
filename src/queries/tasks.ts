import { db } from '../firebase';

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
