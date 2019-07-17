import { db } from '../firebase';

export async function getAllLists(userId: string) {
  let newList: any = new Array();

  await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .orderBy('id', 'desc')
    .get()
    .then((querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        newList.push({ id: item.data().id, firestoreId: item.id, name: item.data().name });
      }
    });

  return newList;
}

export async function getLastId(userId: string, onChangeLastListId: any) {
  try {
    await db
      .collection('Users')
      .doc(userId)
      .collection('Lists')
      .orderBy('id', 'desc')
      .limit(1)
      .get()
      .then((querySnapshot: any) => {
        if (querySnapshot.docs.length != 0) {
          onChangeLastListId(querySnapshot.docs[0].data().id);
        }
      })
      .catch((error: any) => console.log('getLastId error: ' + error));
  } finally {
    return null;
  }
}

export function addList(userId: string, newListId: number, newListName: string) {
  db.collection('Users')
    .doc(userId)
    .collection('Lists')
    .add({
      id: newListId,
      name: newListName,
    });
}

export function updateList(userId: string, listFirestoreId: string, newName: string) {
  db.collection('Users')
    .doc(userId)
    .collection('Lists')
    .doc(listFirestoreId)
    .update({
      name: newName,
    });
}

export function deleteList(userId: string, listFirestoreId: string) {
  db.collection('Users')
    .doc(userId)
    .collection('Lists')
    .doc(listFirestoreId)
    .delete();
}
