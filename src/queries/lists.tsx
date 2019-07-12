import { db } from '../firebase';

export async function getAllLists(email: string) {
  let newList: any = new Array();

  await db
    .collection('Users')
    .where('email', '==', email)
    .get()
    .then(async (querySnapshot: any) => {
      await querySnapshot.docs[0].ref
        .collection('Lists')
        .orderBy('id', 'desc')
        .get()
        .then((querySnapshot: any) => {
          for (const item of querySnapshot.docs) {
            newList.push({ id: item.data().id, name: item.data().name });
          }
        });
    });
  return newList;
}

export async function getLastId(email: string, onChangeLastListId: any) {
  await db
    .collection('Users')
    .where('email', '==', email)
    .get()
    .then(async (querySnapshot: any) => {
      await querySnapshot.docs[0].ref
        .collection('Lists')
        .orderBy('id', 'desc')
        .limit(1)
        .get()
        .then((querySnapshot: any) => {
          onChangeLastListId(querySnapshot.docs[0].data().id);
        });
    });
}

export function addList(email: string, newListId: number, newListName: string) {
  db.collection('Users')
    .where('email', '==', email)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.docs[0].ref.collection('Lists').add({
        id: newListId,
        name: newListName,
      });
    });
}

export function updateList(email: string, listId: number, newName: string) {
  db.collection('Users')
    .where('email', '==', email)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.docs[0].ref
        .collection('Lists')
        .where('id', '==', listId)
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.docs[0].ref.update({
            name: newName,
          });
        });
    });
}

export function deleteList(email: string, listId: number) {
  db.collection('Users')
    .where('email', '==', email)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.docs[0].ref
        .collection('Lists')
        .where('id', '==', listId)
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.docs[0].ref.delete();
        });
    });
}
