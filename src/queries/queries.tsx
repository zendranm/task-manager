import fire from '../../firebase';

export async function getAllLists() {
  let newList: any = new Array();
  let db = fire.firestore();

  await db
    .collection('Lists')
    .get()
    .then((querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        newList.push({ id: item.data().ID, name: item.data().Name });
      }
    });
  return newList;
}

export async function getLastId(onChangeLastListId: any) {
  let db = fire.firestore();

  await db
    .collection('Lists')
    .orderBy('ID', 'desc')
    .limit(1)
    .get()
    .then((querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        onChangeLastListId(item.data().ID);
      }
    });
}

export function addList(lastListId: number, newListName: string) {
  let db = fire.firestore();

  db.collection('Lists').add({
    ID: lastListId + 1,
    Name: newListName,
  });
}

export function deleteList(listId: number) {
  let db = fire.firestore();
  let item = db.collection('Lists').where('ID', '==', listId);

  item.get().then(function(querySnapshot: any) {
    querySnapshot.forEach(function(doc: any) {
      doc.ref.delete();
    });
  });
}

export async function getAllTasks(name: string) {
  let newList: any = new Array();
  let db = fire.firestore();

  await db
    .collection('Lists')
    .where('Name', '==', name)
    .get()
    .then(async (querySnapshot: any) => {
      for (const item of querySnapshot.docs) {
        await item.ref
          .collection('Tasks')
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
