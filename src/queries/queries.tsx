import fire from '../../firebase';

export async function getAllLists(newList: any) {
  let db = fire.firestore();
  await db
    .collection('Lists')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        newList.push({ id: doc.data().ID, name: doc.data().Name });
      });
    });
}

export async function getLastId(onChangeLastListId: any, tmp: boolean) {
  let db = fire.firestore();
  await db
    .collection('Lists')
    .orderBy('ID', 'desc')
    .limit(1)
    .get()
    .then(async (querySnapshot: any) => {
      await querySnapshot.forEach((doc: any) => {
        onChangeLastListId(doc.data().ID);
        tmp = true;
      });
    });
  return tmp;
}

export async function addList(lastListId: number, newListName: string) {
  let db = fire.firestore();
  db.collection('Lists').add({
    ID: lastListId + 1,
    Name: newListName,
  });
}

export async function deleteList(listId: number) {
  let db = fire.firestore();
  let item = db.collection('Lists').where('ID', '==', listId);

  item.get().then(function(querySnapshot: any) {
    querySnapshot.forEach(function(doc: any) {
      doc.ref.delete();
    });
  });
}

export async function getAllTasks(name: number) {
  let db = fire.firestore();
  await db
    .collection('Lists')
    .where('Name', '==', name)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        doc.ref
          .collection('Tasks')
          .get()
          .then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
              console.log(doc.data());
            });
          });
      });
    });
}
