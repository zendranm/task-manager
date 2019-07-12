import { db } from '../firebase';

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
          .orderBy('id', 'desc')
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

export function addList(email: string, newListId: number, newListName: string) {
  db.collection('Users')
    .where('email', '==', email)
    .get()
    .then((querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        item.ref.collection('Lists').add({
          id: newListId,
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
