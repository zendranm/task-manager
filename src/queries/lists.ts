import { db } from '../firebase';

export async function getAllLists(userId: string) {
  let newList: any = new Array();
  let percentage: number;
  await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .orderBy('id', 'desc')
    .get()
    .then((querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        if (item.data().todoTasksOrder.length == 0 && item.data().doneTasksOrder.length == 0) {
          percentage = 0;
        } else {
          percentage =
            (item.data().doneTasksOrder.length /
              (item.data().todoTasksOrder.length + item.data().doneTasksOrder.length)) *
            100;
        }
        newList.push({ id: item.data().id, firestoreId: item.id, name: item.data().name, percentage: percentage });
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

export async function addList(userId: string, newListId: number, newListName: string) {
  const response = await db
    .collection('Users')
    .doc(userId)
    .collection('Lists')
    .add({
      id: newListId,
      name: newListName,
      todoTasksOrder: [],
      doneTasksOrder: [],
    });
  return response.id;
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
